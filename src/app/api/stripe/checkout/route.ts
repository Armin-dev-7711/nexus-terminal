// src/app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { OPERATIONAL_PLANS } from "@/features/landing/constants/pricing.data";

export async function POST(req: NextRequest) {
  try {
    // 🛡️ 1. Verify user authentication using Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to proceed." },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    const body = await req.json();
    const { planId, billingPeriod = "monthly" } = body as {
      planId: string;
      billingPeriod: "monthly" | "annual";
    };

    if (!planId) {
      return NextResponse.json(
        { error: "Selected plan is invalid." },
        { status: 400 },
      );
    }

    const selectedPlan = OPERATIONAL_PLANS.find((p) => p.id === planId);
    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Requested plan was not found." },
        { status: 404 },
      );
    }

    // If Enterprise / Custom plan
    if (selectedPlan.basePriceMonthly === 0) {
      return NextResponse.json({
        url: "mailto:support@nexus.io?subject=Enterprise%20Plan%20Inquiry",
      });
    }

    // Find user in database
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User was not found in the system." },
        { status: 404 },
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const priceInUSD =
      billingPeriod === "annual"
        ? selectedPlan.basePriceAnnual
        : selectedPlan.basePriceMonthly;
    const unitAmountInCents = Math.round(priceInUSD * 100);

    // 🚀 Real Stripe mode (if valid secret key exists)
    if (
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes("mock")
    ) {
      let stripeCustomerId = dbUser.stripeCustomerId;

      // If user does not have a Stripe customer ID, create one
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: dbUser.email,
          name: dbUser.name || undefined,
          metadata: { userId: dbUser.id },
        });
        stripeCustomerId = customer.id;

        await prisma.user.update({
          where: { id: dbUser.id },
          data: { stripeCustomerId },
        });
      }

      // Create Checkout session
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Nexus ${selectedPlan.name} Plan (${billingPeriod.toUpperCase()})`,
                description: selectedPlan.description,
              },
              unit_amount: unitAmountInCents,
              recurring: {
                interval: billingPeriod === "annual" ? "year" : "month",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/dashboard/billing?success=true&plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
        metadata: {
          userId: dbUser.id,
          planId: selectedPlan.id,
          billingPeriod,
        },
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // 🧪 Demo Fallback Mode for testing without live key
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        subscriptionPlan: selectedPlan.id,
        stripeCurrentPeriodEnd: new Date(
          Date.now() + (billingPeriod === "annual" ? 365 : 30) * 86400000,
        ),
      },
    });

    return NextResponse.json({
      url: `${appUrl}/dashboard/billing?success=true&plan=${planId}&demo=true`,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error creating Stripe checkout session.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}

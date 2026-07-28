// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !signature) {
    console.warn("⚠️ Webhook secret or signature missing.");
    return NextResponse.json({ received: true });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`❌ Webhook Error: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId || "explorer";
        const subscriptionId = session.subscription as string;

        if (userId) {
          let currentPeriodEnd: Date | null = null;
          if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            const periodEnd = sub.items.data[0]?.current_period_end;
            if (periodEnd) {
              currentPeriodEnd = new Date(periodEnd * 1000);
            }
          }

          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionPlan: planId,
              stripeSubscriptionId: subscriptionId,
              stripeCurrentPeriodEnd: currentPeriodEnd,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const dbUser = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (dbUser) {
          const isDeleted = subscription.status === "canceled";
          const periodEnd = subscription.items.data[0]?.current_period_end;
          await prisma.user.update({
            where: { id: dbUser.id },
            data: {
              subscriptionPlan: isDeleted ? "explorer" : dbUser.subscriptionPlan,
              stripeCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (dbError) {
    console.error("Database update error during webhook handling:", dbError);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 },
    );
  }
}

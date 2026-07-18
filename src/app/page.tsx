//src/app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/features/landing/components/hero/HeroSection";
import { FeaturesSection } from "@/features/landing/components/feature/FeaturesSection";
import { DashboardPreviewSection } from "@/features/landing/components/preview/DashboardPreviewSection";
import { PricingSection } from "@/features/landing/components/pricing/PricingSection";
import { TestimonialsSection } from "@/features/landing/components/testimonials/TestimonialsSection";
import { FAQSection } from "@/features/landing/components/faq/FAQSection";
import { FinalCTASection } from "@/features/landing/components/cta/FinalCTASection";
import { FloatingNav } from "@/components/shared/FloatingNav";

// 🚀 Fixed: The ssr: false option is not allowed in a server component.
// By removing it, Next.js will still code-split the footer and keep the initial page load super lightweight.
const DynamicFooterSection = dynamic(() =>
  import("@/features/landing/components/footer/FooterSection").then(
    (mod) => mod.FooterSection,
  ),
);

export const metadata: Metadata = {
  title: "NEXUS | Next-Gen Digital Asset Terminal",
  description:
    "Track your cryptocurrency portfolio, audit live network pipelines, and manage nodes with cryptographic speed.",
};

export default function Home() {
  return (
    <main className='bg-[#050507]'>
      <FloatingNav />

      <div id='hero'>
        <HeroSection />
      </div>
      <div id='features'>
        <FeaturesSection />
      </div>
      <div id='dashboard'>
        <DashboardPreviewSection />
      </div>
      <div id='pricing'>
        <PricingSection />
      </div>
      <TestimonialsSection />
      <div id='faq'>
        <FAQSection />
      </div>
      <FinalCTASection />

      {/* 🚀 Calling the standard code-split footer */}
      <DynamicFooterSection />
    </main>
  );
}

import ServicesSection from "@/components/sections/ServicesSection";
import BookingCTA from "@/components/sections/BookingCTA";
import FAQSection from "@/components/sections/FAQSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import StatsBand from "@/components/sections/StatsBand";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data";

export const metadata = buildMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe">
          <p className="h-eyebrow">Services</p>
          <h1 className="h-display mt-3 max-w-4xl text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
            Outcome-driven engineering, dressed in <em className="accent-text not-italic">premium</em> motion.
          </h1>
          <p className="mt-6 max-w-2xl text-ink-soft md:text-lg">
            Every offering below maps to a measurable result. Faster pages, higher conversion, smoother dashboards, fewer 3am pages. Pick the one that fits — or message me and we'll bend it.
          </p>
        </div>
      </section>
      <ServicesSection withProcess />
      <StatsBand />
      <TestimonialsSection />
      <FAQSection />
      <BookingCTA />
    </>
  );
}

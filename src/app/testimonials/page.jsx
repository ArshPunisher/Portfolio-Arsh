import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingCTA from "@/components/sections/BookingCTA";
import StatsBand from "@/components/sections/StatsBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("testimonials");

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe">
          <p className="h-eyebrow">Social proof</p>
          <h1 className="h-display mt-3 max-w-4xl text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
            The kindest reviews aren't the loudest — but they last.
          </h1>
          <p className="mt-6 max-w-2xl text-ink-soft md:text-lg">
            A small anthology of words from the founders, leads, and creative directors I've shipped with. Each one is real, recent, and on the record.
          </p>
        </div>
      </section>
      <TestimonialsSection />
      <StatsBand />
      <BookingCTA />
    </>
  );
}

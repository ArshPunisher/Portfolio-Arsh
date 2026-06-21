import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import BookingCTA from "@/components/sections/BookingCTA";
import StatsBand from "@/components/sections/StatsBand";
import SectionHeading from "@/components/ui/SectionHeading";
import { journey, achievements } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("journey");

export default function JourneyPage() {
  return (
    <>
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe">
          <p className="h-eyebrow">{journey.eyebrow}</p>
          <h1 className="h-display mt-3 max-w-4xl text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
            {journey.title}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-soft md:text-lg">{journey.subtitle}</p>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Milestones"
            title="The receipts."
            subtitle="A walkthrough of the years that turned 'curious kid' into 'engineer who ships'."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journey.milestones.map((m, i) => (
              <div
                key={m.year}
                data-cursor="hover"
                className="luxe-card relative p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
              >
                <span className="font-display font-semibold text-5xl accent-text">{m.year}</span>
                <h3 className="mt-2 font-display font-semibold text-2xl text-ink">{m.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{m.body}</p>
                <span className="absolute right-6 top-6 rounded-full bg-cream-200/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExperienceTimeline />

      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={achievements.eyebrow}
            title={achievements.title}
            subtitle={achievements.subtitle}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.items.map((a) => (
              <div
                key={a.id}
                data-cursor="hover"
                className="luxe-card p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
              >
                <span className="rounded-full bg-cream-200/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                  {a.category} · {a.year}
                </span>
                <h3 className="mt-4 font-display font-semibold text-2xl text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{a.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cream-200 bg-cream-50 px-3 py-1 text-[11px] text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />
      <BookingCTA />
    </>
  );
}

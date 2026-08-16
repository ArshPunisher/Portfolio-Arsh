import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import PrinciplesSection from "@/components/sections/PrinciplesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsBand from "@/components/sections/StatsBand";
import BookingCTA from "@/components/sections/BookingCTA";
import { personal, journey } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { buildGraph } from "@/lib/schema";

export const metadata = buildMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildGraph("about")} />
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="h-eyebrow">About</p>
            <h1 className="h-display mt-3 text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
              I build things <em className="accent-text not-italic">on purpose.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base text-ink-soft md:text-lg">{personal.longBio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-muted">
                <MapPin className="h-3.5 w-3.5 accent-text" /> {personal.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-muted">
                <Briefcase className="h-3.5 w-3.5 accent-text" /> {personal.availability}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-ink-muted">
                <Sparkles className="h-3.5 w-3.5 accent-text" /> {personal.yearsOfExperience}+ years
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                data-cursor="cta"
                data-cursor-label="Book"
                className="gold-button"
              >
                Work with me <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="ghost-button"
              >
                Read my résumé
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="luxe-card relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
              <p className="h-eyebrow">A working philosophy</p>
              <h2 className="h-display mt-3 text-3xl text-ink">
                Build like a craftsman. Ship like an engineer.
              </h2>
              <p className="mt-4 text-sm text-ink-soft">
                I treat every line of code like it'll be on a billboard, and every product launch like it'll be on the front page. So far, neither has happened — but the habit makes everything feel inevitable.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-cream-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">Currently</p>
                  <p className="mt-1 text-sm font-semibold text-ink">Going independent</p>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">Obsessing over</p>
                  <p className="mt-1 text-sm font-semibold text-ink">3D web performance</p>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">Next chapter</p>
                  <p className="mt-1 text-sm font-semibold text-ink">Premium product builds</p>
                </div>
                <div className="rounded-2xl bg-cream-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">Powered by</p>
                  <p className="mt-1 text-sm font-semibold text-ink">Coffee & curiosity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Values"
            title="What guides the day-to-day."
            subtitle="A short list of the values I'd bet a client relationship on. Because I have."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {journey.values.map((v, i) => (
              <div
                key={v.title}
                data-cursor="hover"
                className="luxe-card p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
              >
                <span className="font-display font-semibold text-3xl accent-text">0{i + 1}</span>
                <h3 className="mt-3 font-display font-semibold text-2xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrinciplesSection />
      <SkillsSection />
      <BookingCTA />
    </>
  );
}

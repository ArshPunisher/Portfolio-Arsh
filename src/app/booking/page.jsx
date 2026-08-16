import Link from "next/link";
import { Clock, Video, Globe, Calendar, ArrowRight, Check } from "lucide-react";
import { booking, personal } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import FAQSection from "@/components/sections/FAQSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import JsonLd from "@/components/JsonLd";
import { buildGraph } from "@/lib/schema";

export const metadata = buildMetadata("booking");

const iconMap = { Clock, Video, Globe };

export default function BookingPage() {
  return (
    <>
      <JsonLd data={buildGraph("booking", { faq: true })} />
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="h-eyebrow">{booking.eyebrow}</p>
            <h1 className="h-display mt-3 text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
              {booking.title}
            </h1>
            <p className="mt-6 max-w-2xl text-ink-soft md:text-lg">{booking.subtitle}</p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {booking.details.map((d) => {
                const Icon = iconMap[d.icon] ?? Clock;
                return (
                  <div
                    key={d.title}
                    data-cursor="hover"
                    className="luxe-card p-5 transition-shadow duration-300 hover:shadow-soft-lg"
                  >
                    <Icon className="h-5 w-5 accent-text" strokeWidth={1.5} />
                    <p className="mt-3 font-display font-semibold text-xl text-ink">{d.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">{d.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`mailto:${personal.email}?subject=Intro%20Call%20with%20Arsh`}
                data-cursor="cta"
                data-cursor-label="Book"
                className="gold-button"
              >
                <Calendar className="h-4 w-4" /> {booking.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" data-cursor="hover" className="ghost-button">
                {booking.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="luxe-card p-5 sm:p-7">
              <p className="h-eyebrow">What we'll cover</p>
              <h2 className="h-display mt-3 text-2xl text-ink md:text-3xl">A 30-minute agenda.</h2>
              <ul className="mt-5 space-y-3">
                {booking.agenda.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 accent-text" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container-luxe">
          <p className="h-eyebrow">Engagement options</p>
          <h2 className="h-display mt-3 max-w-3xl text-[2rem] text-ink sm:text-4xl md:text-5xl">
            Three ways we can work together.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Most engagements fall into one of these shapes. We'll fine-tune scope and price together on the call.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {booking.packages.map((pkg) => (
              <div
                key={pkg.name}
                data-cursor="hover"
                className={`relative flex flex-col rounded-3xl border p-5 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft-lg ${
                  pkg.highlight
                    ? "border-accent/40 bg-ink text-cream"
                    : "border-cream-200 bg-white"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Most picked
                  </span>
                )}
                <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${pkg.highlight ? "text-cream/60" : "text-ink-muted"}`}>
                  {pkg.duration}
                </p>
                <h3 className={`h-display mt-2 text-3xl ${pkg.highlight ? "text-cream" : "text-ink"}`}>
                  {pkg.name}
                </h3>
                <p className={`mt-1 font-display font-semibold text-2xl ${pkg.highlight ? "text-accent-200" : "accent-text"}`}>
                  {pkg.priceTag}
                </p>
                <p className={`mt-3 text-sm ${pkg.highlight ? "text-cream/70" : "text-ink-soft"}`}>
                  {pkg.ideal}
                </p>
                <ul className="mt-6 space-y-2">
                  {pkg.includes.map((i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm ${pkg.highlight ? "text-cream/85" : "text-ink-soft"}`}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 accent-text" />
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`mailto:${personal.email}?subject=Booking:%20${pkg.name}`}
                  data-cursor="hover"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
                    pkg.highlight
                      ? "bg-accent text-white"
                      : "border border-ink/20 bg-white text-ink"
                  }`}
                >
                  Pick {pkg.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

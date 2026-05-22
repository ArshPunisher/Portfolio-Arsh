"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Server,
  Box,
  Layers,
  Gauge,
  Compass,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import FloatingCard from "@/components/FloatingCard";
import { services } from "@/lib/data";

const iconMap = { Sparkles, Server, Box, Layers, Gauge, Compass };

export default function ServicesSection({ withProcess = true, limit }) {
  const items = limit ? services.items.slice(0, limit) : services.items;

  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <FloatingCard className="h-full" intensity={8}>
                  <div
                    data-cursor="hover"
                    className="luxe-card flex h-full flex-col p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-100 text-ink shadow-inner3d">
                        <Icon className="h-5 w-5 accent-text" strokeWidth={1.5} />
                      </div>
                      <span className="rounded-full bg-cream-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="h-display mt-7 text-2xl text-ink md:text-[28px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm italic text-ink-muted">{item.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {item.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-sm text-ink-soft"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-cream-200 bg-cream-50 px-3 py-1 text-[11px] text-ink-soft"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center justify-between border-t border-cream-200 pt-5">
                      <Link
                        href="/booking"
                        data-cursor="hover"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink hover:accent-text"
                      >
                        Discuss this service
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            );
          })}
        </div>

        {withProcess && (
          <div className="mt-24 rounded-3xl border border-cream-200 bg-white/70 p-6 sm:p-8 backdrop-blur-md md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="h-eyebrow">A 5-step process</p>
                <h3 className="h-display mt-3 text-3xl text-ink md:text-4xl">
                  How a great build actually happens.
                </h3>
                <p className="mt-4 text-ink-soft">
                  Same five steps, every time. The work changes — the rigour doesn't.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                  {services.process.map((p) => (
                    <li
                      key={p.step}
                      className="rounded-2xl border border-cream-200 bg-cream-50/80 p-5 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <span className="font-display font-semibold text-2xl accent-text">{p.step}</span>
                      <p className="mt-2 font-semibold text-ink">{p.title}</p>
                      <p className="mt-1 text-xs text-ink-soft">{p.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

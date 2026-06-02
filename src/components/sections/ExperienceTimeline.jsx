"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Boxes } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={experience.eyebrow}
          title={experience.title}
          subtitle={experience.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative space-y-6 border-l border-cream-200 pl-8">
              {experience.items.map((item, i) => (
                <motion.div
                  key={`${item.company}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[33px] top-2 grid h-5 w-5 place-items-center rounded-full bg-white shadow-soft">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <div
                    data-cursor="hover"
                    className="luxe-card p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 accent-text" />
                        <h3 className="font-display font-semibold text-2xl text-ink">{item.role}</h3>
                      </div>
                      <span className="rounded-full bg-cream-200/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                        {item.from} — {item.to}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-ink-muted">
                      {item.company} · {item.type} · {item.location}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {item.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {item.projects?.length > 0 && (
                      <div className="mt-6 space-y-3 border-t border-cream-200 pt-5">
                        <p className="h-eyebrow">Products shipped here</p>
                        {item.projects.map((pr) => (
                          <div
                            key={pr.name}
                            className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4 sm:p-5"
                          >
                            <div className="flex items-start gap-2">
                              <Boxes className="mt-0.5 h-4 w-4 shrink-0 accent-text" />
                              <h4 className="font-display text-lg font-semibold leading-tight text-ink sm:text-xl">
                                {pr.name}
                              </h4>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                              {pr.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-cream-200 bg-cream-50 px-3 py-1 text-[11px] text-ink-soft"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="luxe-card p-5 sm:p-7 lg:sticky lg:top-28">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 accent-text" />
                <p className="h-eyebrow">Education & extra credit</p>
              </div>
              <div className="mt-5 space-y-5">
                {experience.education.map((e) => (
                  <div key={e.title} className="border-b border-cream-200 pb-5 last:border-0 last:pb-0">
                    <h4 className="font-display font-semibold text-xl text-ink">{e.title}</h4>
                    <p className="text-xs text-ink-muted">{e.subtitle}</p>
                    <p className="mt-2 text-sm text-ink-soft">{e.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

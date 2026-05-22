"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/lib/data";

export default function SkillsSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={skills.eyebrow}
          title={skills.title}
          subtitle={skills.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skills.domains.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-cursor="hover"
              className="luxe-card flex flex-col p-6 transition-shadow duration-500 hover:shadow-soft-lg"
            >
              <p className="h-eyebrow">{d.id}</p>
              <h3 className="h-display mt-3 text-2xl text-ink">{d.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{d.description}</p>
              <ul className="mt-5 space-y-3">
                {d.tools.map((t) => (
                  <li key={t.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">{t.name}</span>
                      <span className="text-ink-muted">{t.level}%</span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-cream-200/80">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, #7C3AED 0%, #DC2626 60%, #A78BFA 100%)",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { personal } from "@/lib/data";

export default function StatsBand() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="container-luxe">
        <div className="grid grid-cols-2 gap-y-7 rounded-3xl border border-cream-200 bg-white/70 p-6 backdrop-blur-md sm:p-8 md:grid-cols-4 md:p-10">
          {personal.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="border-cream-200/70 px-2 text-center md:border-r md:last:border-r-0"
            >
              <p className="font-display font-semibold text-[2rem] text-ink sm:text-4xl md:text-5xl">{s.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase leading-snug tracking-[0.16em] text-ink-muted sm:tracking-[0.22em]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

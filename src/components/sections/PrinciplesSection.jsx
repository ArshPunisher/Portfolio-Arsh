"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { personal } from "@/lib/data";

export default function PrinciplesSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Principles"
            title="Four rules I refuse to cut corners on."
            subtitle="The non-negotiables that show up in every line of code I push to production."
          />
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {personal.principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                data-cursor="hover"
                className="luxe-card group p-6 transition-shadow duration-500 hover:shadow-soft-lg"
              >
                <span className="font-display font-semibold text-3xl accent-text">0{i + 1}</span>
                <h3 className="mt-3 font-display font-semibold text-xl text-ink md:text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

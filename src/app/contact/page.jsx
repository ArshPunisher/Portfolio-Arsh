import Link from "next/link";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import FAQSection from "@/components/sections/FAQSection";
import { contact } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("contact");

const iconMap = { Mail, Github, Linkedin, Twitter };

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="h-eyebrow">{contact.eyebrow}</p>
            <h1 className="h-display mt-3 text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
              {contact.title}
            </h1>
            <p className="mt-6 max-w-md text-ink-soft md:text-lg">{contact.subtitle}</p>

            <div className="mt-10 space-y-3">
              {contact.channels.map((c) => {
                const Icon = iconMap[c.icon] ?? Mail;
                return (
                  <Link
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="hover"
                    className="flex items-center justify-between rounded-2xl border border-cream-200 bg-white/80 px-5 py-4 transition-shadow duration-300 hover:shadow-soft"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-100">
                        <Icon className="h-4 w-4 accent-text" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">
                          {c.label}
                        </p>
                        <p className="text-sm font-semibold text-ink">{c.value}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.22em] accent-text">Open</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  );
}

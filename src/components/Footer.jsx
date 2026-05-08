"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { navigation, personal } from "@/lib/data";

const socialIcon = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Email: Mail,
};

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-cream-200/80 bg-white/60 backdrop-blur-md sm:mt-32">
      <div className="container-luxe py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="h-eyebrow">Let's build it</p>
            <h3 className="h-display mt-3 text-[2rem] text-ink sm:text-4xl md:text-5xl">
              Got an idea? <em className="accent-text not-italic font-normal">Let's draft it.</em>
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {personal.shortName} ships premium web and 3D experiences for ambitious teams. Pick a calendar slot or send a thoughtful email — both work.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/booking" data-cursor="cta" data-cursor-label="Book" className="gold-button">
                Book a call <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={`mailto:${personal.email}`} data-cursor="hover" className="ghost-button">
                {personal.email}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="h-eyebrow">Explore</p>
              <ul className="mt-2 sm:mt-4">
                {navigation.footer.explore.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-cursor="hover"
                      className="inline-flex min-h-[40px] items-center text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="h-eyebrow">More</p>
              <ul className="mt-2 sm:mt-4">
                {navigation.footer.more.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-cursor="hover"
                      className="inline-flex min-h-[40px] items-center text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="h-eyebrow">Elsewhere</p>
              <ul className="mt-2 sm:mt-4">
                {navigation.footer.social.map((l) => {
                  const Icon = socialIcon[l.label] ?? ArrowUpRight;
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                      >
                        <Icon className="h-4 w-4" />
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-cream-200/70 pt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted sm:mt-14 sm:gap-4 sm:text-xs sm:tracking-[0.22em] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {personal.name}. Hand-crafted with caffeine.</p>
          <p>{personal.location} · Open worldwide</p>
        </div>
      </div>
    </footer>
  );
}

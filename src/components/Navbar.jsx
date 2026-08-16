"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { navigation, personal } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-luxe ${
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="container-luxe">
        <div
          className={`flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 ease-luxe sm:px-5 sm:py-2.5 ${
            scrolled
              ? "border-cream-200 bg-white/90 shadow-soft backdrop-blur-xl"
              : "border-cream-200/60 bg-white/60 backdrop-blur-md"
          }`}
        >
          <Link
            href="/"
            data-cursor="hover"
            aria-label={`${personal.name} — home`}
            className="flex min-w-0 items-center gap-2.5 pl-0.5 pr-2"
          >
            <Image
              src="/logo/arsh-mark.svg"
              alt=""
              width={40}
              height={40}
              priority
              unoptimized
              className="h-9 w-9 shrink-0 rounded-full sm:h-10 sm:w-10"
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display font-semibold text-lg text-ink sm:text-xl">
                {personal.name}
              </span>
              <span className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-[0.18em] text-ink-muted sm:text-[10px] sm:tracking-[0.22em]">
                Full-Stack · 3D Web
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.primary.slice(0, 7).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-cream-200/80"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/booking"
            data-cursor="cta"
            data-cursor-label="Book"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-2.5 text-xs font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 sm:px-4"
          >
            <span className="hidden sm:inline">Start a project</span>
            <span className="sm:hidden">Hire me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

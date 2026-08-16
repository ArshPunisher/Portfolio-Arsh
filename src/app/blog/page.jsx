import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import BookingCTA from "@/components/sections/BookingCTA";
import { blog } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { buildGraph } from "@/lib/schema";

export const metadata = buildMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <JsonLd data={buildGraph("blog")} />
      <section className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="container-luxe">
          <p className="h-eyebrow">{blog.eyebrow}</p>
          <h1 className="h-display mt-3 max-w-4xl text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
            {blog.title}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-soft md:text-lg">{blog.subtitle}</p>

          <div className="mt-10 flex flex-wrap gap-2">
            {blog.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-cream-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-ink-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 md:py-24">
        <div className="container-luxe grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blog.posts.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target={p.url.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="luxe-card group flex flex-col p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">
                <span>{p.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 accent-text" /> {p.readTime}
                </span>
              </div>
              <h2 className="h-display mt-5 text-2xl text-ink md:text-3xl">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm text-ink-soft">{p.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-4">
                <span className="text-xs text-ink-muted">{p.date}</span>
                <span className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-ink group-hover:accent-text">
                  Read <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-cream-50 px-2.5 py-1 text-[10px] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}

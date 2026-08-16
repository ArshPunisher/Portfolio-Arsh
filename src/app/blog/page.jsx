import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CalendarDays } from "lucide-react";
import BookingCTA from "@/components/sections/BookingCTA";
import { blog, personal } from "@/lib/data";
import { publishedPosts, readingTime } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { buildGraph } from "@/lib/schema";
import seo from "@data/seo.json";

export const metadata = buildMetadata("blog");

export default function BlogPage() {
  // Newest first, so the top of the page is always the freshest thinking.
  const posts = [...publishedPosts()].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  const [lead, ...rest] = posts;

  // An ItemList tells Google this is a real index, not a nav page.
  const listSchema = {
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${seo.site.url}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <JsonLd data={buildGraph("blog", { extra: [listSchema] })} />

      <section className="relative page-top">
        <div className="container-luxe">
          <p className="h-eyebrow">{blog.eyebrow}</p>
          <h1 className="h-display mt-3 max-w-4xl text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
            {blog.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base md:text-lg">
            {blog.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {blog.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-cream-200 bg-white/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted sm:px-4 sm:text-xs sm:tracking-[0.2em]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post — full-width so the newest piece leads the page */}
      {lead && (
        <section className="relative pt-12 sm:pt-16">
          <div className="container-luxe">
            <Link
              href={`/blog/${lead.slug}`}
              data-cursor="project"
              data-cursor-label="Read"
              className="luxe-card group grid grid-cols-1 overflow-hidden transition-shadow duration-500 hover:shadow-soft-lg lg:grid-cols-2"
            >
              <div className="relative aspect-[1200/630] w-full overflow-hidden bg-cream-100">
                <Image
                  src={lead.cover}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                  <span className="rounded-full bg-cream-200/70 px-3 py-1 accent-text">
                    Latest
                  </span>
                  <span>{lead.category}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 accent-text" /> {readingTime(lead)}
                  </span>
                </div>
                <h2 className="h-display mt-4 text-[1.75rem] text-ink sm:text-4xl">
                  {lead.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  {lead.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                    <CalendarDays className="h-3.5 w-3.5 accent-text" />
                    <time dateTime={lead.date}>{lead.date}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:accent-text">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="relative py-12 sm:py-16 md:py-24">
        <div className="container-luxe grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              data-cursor="project"
              data-cursor-label="Read"
              className="luxe-card group flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[1200/630] w-full overflow-hidden bg-cream-100">
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                  <span>{p.category}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 accent-text" /> {readingTime(p)}
                  </span>
                </div>

                <h2 className="h-display mt-4 text-[1.4rem] leading-snug text-ink sm:text-2xl">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {p.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-4">
                  <time dateTime={p.date} className="text-xs font-semibold text-ink-muted">
                    {p.date}
                  </time>
                  <span className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink group-hover:accent-text">
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}

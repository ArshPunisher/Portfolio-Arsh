import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from "lucide-react";
import BookingCTA from "@/components/sections/BookingCTA";
import JsonLd from "@/components/JsonLd";
import { personal } from "@/lib/data";
import seo from "@data/seo.json";
import { getPost, publishedPosts, isPublished, readingTime } from "@/lib/blog";

// Only posts that actually have body content get a route.
export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post || !isPublished(post)) return {};

  const url = `${seo.site.url}/blog/${post.slug}`;
  const image = post.ogImage ?? post.cover ?? "/og-default.png";

  return {
    metadataBase: new URL(seo.site.url),
    title: `${post.title} | ${personal.shortName}`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: personal.name, url: seo.site.url }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: seo.site.name,
      locale: seo.site.locale,
      publishedTime: post.date,
      authors: [personal.name],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      site: seo.site.twitter,
      creator: seo.site.twitter,
      images: [image],
    },
  };
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="h-display mt-12 text-[1.75rem] text-ink sm:text-4xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-9 font-display text-2xl font-semibold text-ink">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-accent bg-white/70 py-4 pl-5 pr-4 font-display text-xl italic text-ink sm:text-2xl">
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <span className="mt-0.5 font-mono text-xs font-bold accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-cream-200 bg-white/85 p-4 sm:p-5">
          <code className="font-mono text-[13px] leading-relaxed text-ink-soft">
            {block.text}
          </code>
        </pre>
      );
    case "p":
    default:
      return (
        <p className="mt-5 text-[16px] leading-[1.75] text-ink-soft sm:text-[17px]">
          {block.text}
        </p>
      );
  }
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post || !isPublished(post)) notFound();

  const url = `${seo.site.url}/blog/${post.slug}`;
  const others = publishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: personal.name,
      url: seo.site.url,
    },
    publisher: {
      "@type": "Person",
      name: personal.name,
      url: seo.site.url,
    },
    image: `${seo.site.url}${post.ogImage ?? post.cover ?? "/og-default.png"}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="relative page-top">
        <div className="container-luxe">
          <Link
            href="/blog"
            data-cursor="hover"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All field notes
          </Link>

          <p className="h-eyebrow mt-6">{post.category}</p>
          <h1 className="h-display mt-3 max-w-4xl text-[2.4rem] text-ink sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 accent-text" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 accent-text" />
              {readingTime(post)}
            </span>
            <span>By {personal.name}</span>
          </div>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        </div>

        {post.cover && (
          <div className="container-luxe mt-9 sm:mt-12">
            <div className="relative aspect-[1200/630] w-full max-w-[860px] overflow-hidden rounded-[20px] border border-cream-200 bg-cream-100 sm:rounded-[28px]">
              <Image
                src={post.cover}
                alt=""
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="container-luxe mt-10 sm:mt-14">
          <div className="max-w-[720px]">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {post.tags?.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-cream-200 pt-7">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-cream-200 bg-cream-50 px-3 py-1 text-[11px] font-semibold text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {others.length > 0 && (
          <div className="container-luxe mt-16 sm:mt-24">
            <div className="max-w-[720px]">
              <h2 className="h-eyebrow">Keep reading</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    data-cursor="hover"
                    className="luxe-card group flex flex-col p-5 transition-shadow duration-500 hover:shadow-soft-lg"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                      {p.category}
                    </span>
                    <span className="h-display mt-3 text-xl text-ink">
                      {p.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:accent-text">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      <BookingCTA />
    </>
  );
}

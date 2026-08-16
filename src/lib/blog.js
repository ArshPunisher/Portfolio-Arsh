import { blog } from "@/lib/data";

/**
 * A post is "published" purely by having body content. Add blocks to `body` in
 * data/blog.json and the post goes live — route, sitemap, and card link all
 * follow automatically. Leave it empty and the card renders as "Coming soon"
 * with no link, so nothing can 404.
 *
 * Supported blocks:
 *   { "type": "p",     "text": "A paragraph." }
 *   { "type": "h2",    "text": "A section heading" }
 *   { "type": "h3",    "text": "A sub-heading" }
 *   { "type": "ul",    "items": ["First point", "Second point"] }
 *   { "type": "ol",    "items": ["Step one", "Step two"] }
 *   { "type": "quote", "text": "A pulled-out line." }
 *   { "type": "code",  "lang": "js", "text": "const x = 1;" }
 */
export function isPublished(post) {
  return Array.isArray(post?.body) && post.body.length > 0;
}

export function allPosts() {
  return blog.posts;
}

export function publishedPosts() {
  return blog.posts.filter(isPublished);
}

export function getPost(slug) {
  return blog.posts.find((p) => p.slug === slug) ?? null;
}

/** Rough word count across text-bearing blocks, used for the reading time. */
export function wordCount(post) {
  if (!isPublished(post)) return 0;
  return post.body.reduce((n, b) => {
    const text = b.text ?? (b.items ?? []).join(" ");
    return n + String(text).trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

export function readingTime(post) {
  const words = wordCount(post);
  if (!words) return post.readTime ?? null;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

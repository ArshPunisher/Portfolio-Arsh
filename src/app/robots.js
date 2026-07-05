import seo from "../../data/seo.json";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${seo.site.url}/sitemap.xml`,
  };
}

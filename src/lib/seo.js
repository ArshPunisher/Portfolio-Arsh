import seo from "@data/seo.json";

export function buildMetadata(pageKey) {
  const base = seo.default;
  const page = seo.pages[pageKey] ?? {};
  const title = page.title ?? base.title;
  const description = page.description ?? base.description;
  const url = pageKey === "home" ? seo.site.url : `${seo.site.url}/${pageKey}`;

  return {
    metadataBase: new URL(seo.site.url),
    title,
    description,
    keywords: base.keywords,
    authors: [{ name: seo.site.shortName, url: seo.site.url }],
    creator: seo.site.shortName,
    publisher: seo.site.shortName,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: seo.site.name,
      locale: seo.site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo.site.twitter,
      creator: seo.site.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

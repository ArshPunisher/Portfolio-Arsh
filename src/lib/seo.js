import seo from "@data/seo.json";

// Pages share a small set of purpose-built 1200x630 cards rather than one generic image.
const OG_BY_PAGE = {
  services: "/og-services.png",
  projects: "/og-projects.png",
  contact: "/og-contact.png",
  booking: "/og-contact.png",
};

export function pageUrl(pageKey) {
  return pageKey === "home" ? seo.site.url : `${seo.site.url}/${pageKey}`;
}

export function buildMetadata(pageKey) {
  const base = seo.default;
  const page = seo.pages[pageKey] ?? {};
  const title = page.title ?? base.title;
  const description = page.description ?? base.description;
  const url = pageUrl(pageKey);
  const image = OG_BY_PAGE[pageKey] ?? "/og-default.png";

  return {
    metadataBase: new URL(seo.site.url),
    title,
    description,
    keywords: base.keywords,
    applicationName: seo.site.name,
    authors: [{ name: seo.site.shortName, url: seo.site.url }],
    creator: seo.site.shortName,
    publisher: seo.site.shortName,
    category: "technology",
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: seo.site.name,
      locale: seo.site.locale,
      type: pageKey === "about" ? "profile" : "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${seo.site.shortName} — ${description.slice(0, 110)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo.site.twitter,
      creator: seo.site.twitter,
      images: [image],
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

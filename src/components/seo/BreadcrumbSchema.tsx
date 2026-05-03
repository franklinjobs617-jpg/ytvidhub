type BreadcrumbItem = {
  name: string;
  item: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const SITE = "https://ytvidhub.com";

export function toolBreadcrumbs(
  locale: string,
  pathname: string,
  pageName: string
): BreadcrumbItem[] {
  const prefix = locale && locale !== "en" ? `/${locale}` : "";
  return [
    { name: "Home", item: `${SITE}${prefix}/` },
    { name: "Tools", item: `${SITE}${prefix}/youtube-subtitle-downloader` },
    { name: pageName, item: `${SITE}${prefix}${pathname}` },
  ];
}

export function guideBreadcrumbs(
  locale: string,
  pathname: string,
  pageName: string
): BreadcrumbItem[] {
  const prefix = locale && locale !== "en" ? `/${locale}` : "";
  return [
    { name: "Home", item: `${SITE}${prefix}/` },
    { name: "Guides", item: `${SITE}${prefix}/guide` },
    { name: pageName, item: `${SITE}${prefix}${pathname}` },
  ];
}

export function blogBreadcrumbs(
  locale: string,
  pathname: string,
  pageName: string
): BreadcrumbItem[] {
  const prefix = locale && locale !== "en" ? `/${locale}` : "";
  return [
    { name: "Home", item: `${SITE}${prefix}/` },
    { name: "Blog", item: `${SITE}${prefix}/blog` },
    { name: pageName, item: `${SITE}${prefix}${pathname}` },
  ];
}

export function resourceBreadcrumbs(
  locale: string,
  pathname: string,
  pageName: string
): BreadcrumbItem[] {
  const prefix = locale && locale !== "en" ? `/${locale}` : "";
  return [
    { name: "Home", item: `${SITE}${prefix}/` },
    { name: "Resources", item: `${SITE}${prefix}/faq` },
    { name: pageName, item: `${SITE}${prefix}${pathname}` },
  ];
}

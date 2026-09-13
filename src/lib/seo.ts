import { site } from "./site";

export const origin = "https://matterhorn.construction";
export function seo(path: string, title: string, description: string) {
  const url = origin + path;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "matterhorn:seo", content: "route" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:image", content: origin + "/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Matterhorn Construction mountain and tools emblem beside Six Pines Ranch" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: origin + "/og.jpg" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

// Only confirmed business details. No invented address, reviews, or credentials.
export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": origin + "/#organization",
  name: site.legal,
  alternateName: site.name,
  url: origin + "/",
  logo: origin + "/brand/mark.png",
  image: origin + "/og.jpg",
  telephone: "+19709030122",
  email: site.email,
  description: "Custom home construction, design-build, and remodeling in Pagosa Springs, Colorado, led by Jody Ellis.",
  areaServed: { "@type": "City", name: "Pagosa Springs, Colorado" },
};

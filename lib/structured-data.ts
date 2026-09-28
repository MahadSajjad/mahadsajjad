import { siteConfig } from "@/lib/metadata";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Full-Stack Developer",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/mahad.webp`,
  email: "mailto:web.mahadsajjad787@gmail.com",
  sameAs: [
    "https://github.com/MahadSajjad",
    "https://www.linkedin.com/in/mahad-sajjad-b34826337/",
    "https://www.instagram.com/mahadvizz/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Metafessional",
    url: "https://metafessional.com/",
  },
} as const;

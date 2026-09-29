import type { Metadata } from "next";

export const siteConfig = {
  name: "Mahad Sajjad",
  description:
    "Mahad Sajjad is a full-stack developer building React and MERN web apps, SaaS dashboards, and Shopify stores for businesses. Explore projects and get in touch.",
  url: "https://mahad.sitehookz.com",
  ogImage: "/logo.png",
  authors: [
    {
      name: "Mahad Sajjad",
      url: "https://mahad.sitehookz.com",
    },
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Full-Stack Web Developer | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [...siteConfig.authors],
  publisher: siteConfig.name,
  verification: {
    google: "ODFo7HkeCMftaACVM-Gd7WLV5EREou7xe8J8oMZYjwM",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/`,
    title: `Full-Stack Web Developer | ${siteConfig.name}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 2000,
        height: 2000,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `Full-Stack Web Developer | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 2000,
          height: 2000,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

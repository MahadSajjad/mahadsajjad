import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

// Bump the relevant date below when that route's content actually changes
// (checked via `git log -1 -- <files for that route>`), not on every build.
const LAST_MODIFIED = {
  home: "2026-09-29",
  projects: "2026-09-29",
  about: "2026-09-28",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: LAST_MODIFIED.home,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: LAST_MODIFIED.projects,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_MODIFIED.about,
    },
  ];
}

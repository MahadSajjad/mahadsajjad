"use client";

import type { ComponentType, ReactNode } from "react";

import LogoLoopBase from "@/components/ui/logo-loop";

type TechLogo = {
  src: string;
  alt: string;
  title: string;
};

type LogoLoopProps = {
  logos: TechLogo[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
  renderItem?: (item: TechLogo, key: React.Key) => ReactNode;
};

const LogoLoop = LogoLoopBase as ComponentType<LogoLoopProps>;

// Simple Icons rendered in black + dark:invert so the strip stays monochrome
// in both themes, matching the site's minimal aesthetic.
const SLUGS: Array<{ slug: string; title: string }> = [
  { slug: "react", title: "React" },
  { slug: "nextdotjs", title: "Next.js" },
  { slug: "javascript", title: "JavaScript" },
  { slug: "nodedotjs", title: "Node.js" },
  { slug: "express", title: "Express" },
  { slug: "mongodb", title: "MongoDB" },
  { slug: "tailwindcss", title: "Tailwind CSS" },
  { slug: "vite", title: "Vite" },
  { slug: "supabase", title: "Supabase" },
  { slug: "firebase", title: "Firebase" },
  { slug: "vercel", title: "Vercel" },
  { slug: "netlify", title: "Netlify" },
  { slug: "git", title: "Git" },
  { slug: "github", title: "GitHub" },
];

const TECH_LOGOS: TechLogo[] = SLUGS.map(({ slug, title }) => ({
  src: `https://cdn.simpleicons.org/${slug}/000000`,
  alt: title,
  title,
}));

export function TechLoop(): ReactNode {
  return (
    <LogoLoop
      logos={TECH_LOGOS}
      speed={40}
      direction="left"
      logoHeight={36}
      gap={64}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      ariaLabel="Tech stack I work with"
      renderItem={(item: TechLogo) => (
        <img
          src={item.src}
          alt={item.alt}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-[var(--logoloop-logoHeight)] w-auto object-contain opacity-50 transition-[opacity,transform] duration-300 group-hover/item:scale-110 group-hover/item:opacity-100 dark:invert"
        />
      )}
    />
  );
}

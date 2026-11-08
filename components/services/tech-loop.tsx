"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";
import type { ComponentType, ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

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

// Do not mount the animation or start its frame loop on mobile devices.
const LogoLoop = lazy(() =>
  import("@/components/ui/logo-loop").then((module) => ({
    default: module.default as ComponentType<LogoLoopProps>,
  }))
);

const TOOLS_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

function subscribeToToolsViewport(callback: () => void): () => void {
  const query = window.matchMedia(TOOLS_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getToolsViewport(): boolean {
  return window.matchMedia(TOOLS_QUERY).matches;
}

function getServerToolsViewport(): boolean {
  return false;
}

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

const LOGO_HEIGHT = 44;

export function TechLoop(): ReactNode {
  const showTools = useSyncExternalStore(
    subscribeToToolsViewport,
    getToolsViewport,
    getServerToolsViewport
  );

  if (!showTools) return null;

  return (
    <FadeIn delay={0.1} className="mt-14 hidden md:block">
      <p className="text-foreground/40 mb-6 text-center text-[12px] font-medium tracking-wider uppercase">
        Tools I build with
      </p>
      <Suspense fallback={null}>
        <LogoLoop
          logos={TECH_LOGOS}
          speed={40}
          direction="left"
          logoHeight={LOGO_HEIGHT}
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
              width={LOGO_HEIGHT}
              height={LOGO_HEIGHT}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-[var(--logoloop-logoHeight)] w-[var(--logoloop-logoHeight)] object-contain opacity-50 transition-[opacity,transform] duration-300 group-hover/item:scale-110 group-hover/item:opacity-100 dark:invert"
            />
          )}
        />
      </Suspense>
    </FadeIn>
  );
}

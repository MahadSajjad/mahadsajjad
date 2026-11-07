"use client";

import { useEffect, type ReactNode } from "react";
import { features } from "@/lib/config";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";
import { setLenis } from "@/lib/smooth-scroll-store";

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  const enhanced = useEnhancedVisuals();

  useEffect(() => {
    if (!features.smoothScroll || !enhanced) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      const lenis = new Lenis(LENIS_OPTIONS);
      setLenis(lenis);
      let rafId = 0;

      function raf(time: number): void {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      function onVisibilityChange(): void {
        cancelAnimationFrame(rafId);
        if (document.visibilityState === "visible") {
          lenis.start();
          rafId = requestAnimationFrame(raf);
        } else {
          lenis.stop();
        }
      }

      function handleAnchorClick(e: MouseEvent): void {
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return;
        const target = e.target;
        if (!(target instanceof Element)) return;
        const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const element = document.getElementById(
          decodeURIComponent(href.slice(1))
        );
        if (!element) return;
        e.preventDefault();
        lenis.scrollTo(element, { offset: -100 });
      }

      onVisibilityChange();
      document.addEventListener("visibilitychange", onVisibilityChange);
      document.addEventListener("click", handleAnchorClick);

      cleanup = () => {
        document.removeEventListener("click", handleAnchorClick);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        cancelAnimationFrame(rafId);
        lenis.destroy();
        setLenis(null);
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [enhanced]);

  return <>{children}</>;
}

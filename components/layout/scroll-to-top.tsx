"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { getLenis } from "@/lib/smooth-scroll-store";

export function ScrollToTop(): ReactNode {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

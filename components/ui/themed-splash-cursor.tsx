"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SplashCursor from "./splash-cursor";

export function ThemedSplashCursor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = (): void => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  // Lighter fluid sim on phones/touch: smaller dye + sim textures, fewer
  // pressure iterations, no shading, and a hard DPR cap. Desktop keeps the
  // full-quality effect. Keyed so it cleanly re-inits when crossing the
  // breakpoint.
  return (
    <SplashCursor
      key={isMobile ? "mobile" : "desktop"}
      RAINBOW_MODE={false}
      COLOR="#ffffff"
      LIGHT_MODE={isLight}
      OPACITY={isLight ? 0.18 : 0.28}
      DENSITY_DISSIPATION={5}
      VELOCITY_DISSIPATION={2}
      SPLAT_RADIUS={0.3}
      SPLAT_FORCE={2500}
      CURL={0}
      PRESSURE={0.8}
      PRESSURE_ITERATIONS={isMobile ? 12 : 30}
      SIM_RESOLUTION={isMobile ? 96 : 128}
      DYE_RESOLUTION={isMobile ? 512 : 1440}
      CAPTURE_RESOLUTION={isMobile ? 256 : 512}
      SHADING={!isMobile}
      MAX_PIXEL_RATIO={isMobile ? 1.5 : 2}
    />
  );
}

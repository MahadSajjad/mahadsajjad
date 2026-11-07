"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";

const SplashCursor = dynamic(() => import("./splash-cursor"), { ssr: false });

export function ThemedSplashCursor() {
  const { resolvedTheme } = useTheme();
  const enhanced = useEnhancedVisuals();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enhanced) return;
    const activate = () => setActive(true);
    window.addEventListener("pointermove", activate, {
      once: true,
      passive: true,
    });
    return () => window.removeEventListener("pointermove", activate);
  }, [enhanced]);

  if (!enhanced || !active) return null;

  const isLight = resolvedTheme === "light";

  return (
    <SplashCursor
      RAINBOW_MODE={false}
      COLOR="#ffffff"
      LIGHT_MODE={isLight}
      OPACITY={isLight ? 0.18 : 0.28}
      DYE_RESOLUTION={512}
      SIM_RESOLUTION={96}
      DENSITY_DISSIPATION={5}
      VELOCITY_DISSIPATION={2}
      SPLAT_RADIUS={0.3}
      SPLAT_FORCE={2500}
      CURL={0}
      PRESSURE={0.8}
      PRESSURE_ITERATIONS={12}
    />
  );
}

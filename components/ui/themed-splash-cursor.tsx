"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SplashCursor from "./splash-cursor";

export function ThemedSplashCursor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <SplashCursor
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
      PRESSURE_ITERATIONS={30}
    />
  );
}

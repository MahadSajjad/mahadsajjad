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
      DENSITY_DISSIPATION={2}
      VELOCITY_DISSIPATION={0.4}
      SPLAT_RADIUS={0.35}
      SPLAT_FORCE={2000}
      CURL={0}
      PRESSURE={0.8}
      PRESSURE_ITERATIONS={30}
    />
  );
}

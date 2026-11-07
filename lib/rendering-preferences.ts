"use client";

import { useSyncExternalStore } from "react";

// Start with the lightweight, server-rendered version. Touch devices and
// reduced-motion users never download or initialize the decorative WebGL code.
const ENHANCED_VISUALS_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void): () => void {
  const query = window.matchMedia(ENHANCED_VISUALS_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(ENHANCED_VISUALS_QUERY).matches;
}

export function useEnhancedVisuals(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";
import type { ShaderFlowProps } from "./shader-flow";

const ShaderFlow = dynamic(
  () => import("./shader-flow").then((module) => module.ShaderFlow),
  { ssr: false }
);

export function AdaptiveShader(props: ShaderFlowProps) {
  const enhanced = useEnhancedVisuals();
  const ref = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enhanced || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "100px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [enhanced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="shader-backdrop absolute inset-0"
    >
      {enhanced && nearViewport ? <ShaderFlow {...props} /> : null}
    </div>
  );
}

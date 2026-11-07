"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  className,
  scale = false,
}: RevealProps & { scale?: boolean }): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const enhanced = useEnhancedVisuals();

  useEffect(() => {
    const element = ref.current;
    if (!element || !enhanced) return;
    let animation: Animation | undefined;
    element.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        animation = element.animate(
          [
            {
              opacity: 0,
              transform: scale ? "scale(0.97)" : "translateY(12px)",
            },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          }
        );
        element.classList.remove("reveal-pending");
      },
      { threshold: 0.05 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
      element.classList.remove("reveal-pending");
    };
  }, [enhanced, delay, duration, scale]);

  // Content is visible in the server HTML and on mobile, without waiting for JS.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeIn(props: RevealProps): ReactNode {
  return <Reveal {...props} />;
}

export function ScaleUnblur(props: RevealProps): ReactNode {
  return <Reveal {...props} scale />;
}

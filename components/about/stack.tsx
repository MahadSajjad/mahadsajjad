"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";

type Chip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

const CHIPS: Chip[] = [
  { label: "JavaScript", slug: "javascript", bg: "#F7DF1E", fg: "#0a0a0a" },
  { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
  { label: "Vite", slug: "vite", bg: "#646CFF", fg: "#ffffff" },
  { label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
  { label: "Express", slug: "express", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "MongoDB", slug: "mongodb", bg: "#47A248", fg: "#ffffff" },
  { label: "Supabase", slug: "supabase", bg: "#3FCF8E", fg: "#0a0a0a" },
  { label: "Firebase", slug: "firebase", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "Vercel", slug: "vercel", bg: "#0a0a0a", fg: "#ffffff" },
  { label: "Netlify", slug: "netlify", bg: "#00C7B7", fg: "#ffffff" },
  { label: "Git", slug: "git", bg: "#F05133", fg: "#ffffff" },
  { label: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
];

const CHIP_RADIUS = 14;
const ICON_RADIUS = 10;
const WALL_PAD = 16;

type ChipState = {
  chip: Chip;
  body: Matter.Body;
  width: number;
  height: number;
};

export function Stack(): ReactNode {
  const enhanced = useEnhancedVisuals();
  const visibilityRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const element = visibilityRef.current;
    if (!enhanced || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry?.isIntersecting ?? false);
      },
      { rootMargin: "100px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [enhanced]);

  useEffect(() => {
    if (!enhanced || !nearViewport) return;
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const Matter = await import("matter-js");
      if (cancelled) return;

      const {
        Engine,
        Runner,
        World,
        Bodies,
        Body,
        Mouse,
        MouseConstraint,
        Events,
      } = Matter;

      const measureChildren = Array.from(measure.children) as HTMLElement[];
      const dims = measureChildren.map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.max(80, r.width), h: Math.max(28, r.height) };
      });

      let width = container.clientWidth;
      let height = container.clientHeight;

      const engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 1;
      const world = engine.world;

      const wallThickness = 400;
      const floor = Bodies.rectangle(
        width / 2,
        height - WALL_PAD + wallThickness / 2,
        width * 3,
        wallThickness,
        { isStatic: true }
      );
      const leftWall = Bodies.rectangle(
        WALL_PAD - wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      const rightWall = Bodies.rectangle(
        width - WALL_PAD + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      World.add(world, [floor, leftWall, rightWall]);

      const states: ChipState[] = CHIPS.map((chip, i) => {
        const dim = dims[i] ?? { w: 120, h: 36 };
        const { w, h } = dim;
        const halfW = w / 2;
        const minX = WALL_PAD + halfW + 4;
        const maxX = width - WALL_PAD - halfW - 4;
        const x = minX + Math.random() * Math.max(1, maxX - minX);
        const y = -80 - i * 60 - Math.random() * 120;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: CHIP_RADIUS },
          restitution: 0.35,
          friction: 0.5,
          frictionAir: 0.025,
          density: 0.0018,
          angle: (Math.random() - 0.5) * 0.4,
        });
        World.add(world, body);
        return { chip, body, width: w, height: h };
      });

      const mouse = Mouse.create(container);

      const mouseHandlers = mouse as typeof mouse &
        Record<
          "mousemove" | "mousedown" | "mouseup" | "mousewheel",
          EventListener
        >;
      // Keep page scrolling native, including on laptops with touchscreens.
      container.removeEventListener("wheel", mouseHandlers.mousewheel);
      container.removeEventListener("touchmove", mouseHandlers.mousemove);
      container.removeEventListener("touchstart", mouseHandlers.mousedown);
      container.removeEventListener("touchend", mouseHandlers.mouseup);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          damping: 0.2,
          render: { visible: false },
        },
      });
      World.add(world, mouseConstraint);

      Events.on(mouseConstraint, "startdrag", () => {
        container.style.cursor = "grabbing";
      });
      Events.on(mouseConstraint, "enddrag", () => {
        container.style.cursor = "grab";
      });

      const runner = Runner.create();

      let raf = 0;
      function onVisibilityChange(): void {
        Runner.stop(runner);
        cancelAnimationFrame(raf);
        if (!document.hidden) {
          Runner.run(runner, engine);
          raf = requestAnimationFrame(tick);
        }
      }
      const tick = (): void => {
        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          const el = chipRefs.current[i];
          if (!s || !el) continue;
          const { x, y } = s.body.position;
          el.style.transform = `translate3d(${x - s.width / 2}px, ${y - s.height / 2}px, 0) rotate(${s.body.angle}rad)`;
        }
        raf = requestAnimationFrame(tick);
      };
      onVisibilityChange();
      document.addEventListener("visibilitychange", onVisibilityChange);

      const onResize = (): void => {
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        if (newW === width && newH === height) return;
        Body.setPosition(floor, {
          x: newW / 2,
          y: newH - WALL_PAD + wallThickness / 2,
        });
        Body.setPosition(leftWall, {
          x: WALL_PAD - wallThickness / 2,
          y: newH / 2,
        });
        Body.setPosition(rightWall, {
          x: newW - WALL_PAD + wallThickness / 2,
          y: newH / 2,
        });
        width = newW;
        height = newH;
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        ro.disconnect();
        Runner.stop(runner);
        container.removeEventListener("mousemove", mouseHandlers.mousemove);
        container.removeEventListener("mousedown", mouseHandlers.mousedown);
        container.removeEventListener("mouseup", mouseHandlers.mouseup);
        Mouse.clearSourceEvents(mouse);
        Events.off(engine, "beforeUpdate");
        Events.off(mouseConstraint, "startdrag");
        Events.off(mouseConstraint, "enddrag");
        World.clear(world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enhanced, nearViewport, resetKey]);

  return (
    <div ref={visibilityRef} className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Stack
        </h3>
      </div>

      {enhanced ? (
        <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative h-40 overflow-hidden rounded-4xl border sm:h-64">
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            aria-label="Reset stack"
            className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
          >
            <RotateCcw
              className="h-4 w-4"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </button>

          <div
            ref={measureRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute top-0 left-0 flex flex-wrap gap-2"
          >
            {CHIPS.map((chip) => (
              <ChipPill key={`m-${chip.label}`} chip={chip} />
            ))}
          </div>

          <div
            ref={containerRef}
            className="absolute inset-0 cursor-grab select-none"
            style={{ touchAction: "none" }}
          >
            {CHIPS.map((chip, i) => (
              <div
                key={`${resetKey}-${chip.label}`}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                data-stack-chip
                className="pointer-events-none absolute top-0 left-0 will-change-transform"
                style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
              >
                <ChipPill chip={chip} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 flex flex-wrap gap-3 rounded-4xl border p-5">
          {CHIPS.map((chip) => (
            <ChipPill key={chip.label} chip={chip} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChipPill({ chip }: { chip: Chip }): ReactNode {
  return (
    <div
      className="inline-flex items-center gap-2 p-1 pr-2 text-[15px] font-medium tracking-tight sm:text-[16px] dark:ring-1 dark:ring-white/15"
      style={{
        backgroundColor: chip.bg,
        color: chip.fg,
        borderRadius: `${CHIP_RADIUS}px`,
      }}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center bg-white/95"
        style={{ borderRadius: `${ICON_RADIUS}px` }}
        aria-hidden="true"
      >
        <img
          src={chip.iconUrl ?? `https://cdn.simpleicons.org/${chip.slug}`}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          className="h-5 w-5"
          draggable={false}
        />
      </span>
      <span>{chip.label}</span>
    </div>
  );
}

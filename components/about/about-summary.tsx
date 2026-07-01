import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "10+", label: "Projects built" },
  { value: "MERN", label: "Full-stack" },
  { value: "Always", label: "Learning" },
];

export function AboutSummary(): ReactNode {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-275 px-6 sm:px-10"
      aria-labelledby="about-heading"
    >
      <FadeIn>
        <div className="rounded-3xl border border-foreground/5 bg-foreground/2 p-6 sm:rounded-4xl sm:p-10 lg:p-12 dark:bg-foreground/4">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
            <div className="flex flex-col">
              <p className="text-[12px] font-medium uppercase tracking-wider text-foreground/40">
                About Me
              </p>
              <h2
                id="about-heading"
                className="mt-3 font-serif text-[1.6rem] font-medium leading-[1.15] tracking-tight text-balance text-foreground sm:mt-4 sm:text-[2rem] sm:leading-[1.12] lg:text-[2.4rem]"
              >
                I build because I love making ideas actually work.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.6] tracking-tight text-foreground/70 sm:mt-6 sm:space-y-5 sm:text-[17px] sm:leading-[1.65]">
                <p>
                  I got into development because I wanted to build things
                  that{" "}
                  <strong className="font-semibold text-foreground">
                    actually work
                  </strong>
                  , not just look good in a demo. That curiosity is what
                  pushed me to learn the full stack, end to end.
                </p>
                <p>
                  These days I mostly work in the{" "}
                  <strong className="font-semibold text-foreground">
                    MERN stack
                  </strong>
                  , turning ideas into products people can actually use. And
                  honestly, I&rsquo;m always chasing the next thing to learn.
                </p>
              </div>
              <Link
                href="/about"
                className="focus-ring group/cta mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[15px] font-medium tracking-tight text-background shadow-sm transition-all hover:gap-2.5 hover:opacity-90 sm:mt-8 sm:w-fit sm:justify-start"
              >
                More about me
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:content-center md:gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-row items-baseline gap-3 rounded-2xl border border-foreground/5 bg-background p-4 sm:rounded-3xl sm:p-5"
                >
                  <span className="font-serif text-[1.5rem] font-medium leading-none tracking-tight text-foreground sm:text-[1.75rem] lg:text-[2rem]">
                    {stat.value}
                  </span>
                  <span className="text-[13px] leading-tight tracking-tight text-foreground/55 sm:text-[14px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
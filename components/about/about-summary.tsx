import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

export function AboutSummary(): ReactNode {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-160 px-6 sm:px-10"
      aria-labelledby="about-heading"
    >
      <FadeIn>
        <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
          <h2
            id="about-heading"
            className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]"
          >
            I&rsquo;m{" "}
            <span className="border-b border-foreground/30 pb-0.5">
              Mahad Sajjad
            </span>
          </h2>
          <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
            <p>
              A{" "}
              <strong className="font-semibold text-foreground">
                full-stack developer
              </strong>{" "}
              who builds products end-to-end, from database to deployment. Most
              of my work has been{" "}
              <strong className="font-semibold text-foreground">solo</strong> —
              so I own every decision, tradeoff, and deadline: product thinking,
              technical execution, and client communication.
            </p>
            <p>
              I specialize in the{" "}
              <strong className="font-semibold text-foreground">
                MERN stack
              </strong>{" "}
              and have shipped{" "}
              <strong className="font-semibold text-foreground">
                SaaS platforms, POS systems, and dashboards
              </strong>{" "}
              for real businesses with real users.
            </p>
          </div>
          <Link
            href="/about"
            className="focus-ring mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium tracking-tight text-foreground/70 transition-colors hover:text-foreground"
          >
            More about me
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

import { Certifications } from "@/components/about/certifications";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-160 px-6 pt-40 pb-16 sm:px-10 sm:pt-56 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              I&rsquo;m{" "}
              <span className="border-b border-foreground/30 pb-0.5">
                Mahad Sajjad
              </span>
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                A{" "}
                <strong className="font-semibold text-foreground">
                  full-stack developer
                </strong>{" "}
                who builds products end-to-end, from database to deployment. I
                got into development because I wanted to build things that
                actually work — not just look good in a demo. That meant
                learning the full stack: not just the frontend layer everyone
                sees, but the architecture, the APIs, the edge cases, and the
                decisions that make a product hold up under real use.
              </p>
              <p>
                Most of my work has been{" "}
                <strong className="font-semibold text-foreground">solo</strong>{" "}
                — which means I own every decision, every tradeoff, every
                deadline. Product thinking, technical execution, client
                communication — all of it. That's made me a better developer
                than any tutorial could.
              </p>
              <p>
                I specialize in{" "}
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
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Certifications />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
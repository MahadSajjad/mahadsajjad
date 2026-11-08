import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import TiltedCard from "./TiltedCard";

const PORTRAIT_SRC = "/mahad.webp";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full" aria-labelledby="hero-heading">
      <div className="hero-layout mx-auto grid w-full max-w-275 items-center gap-x-4 gap-y-6 px-6 sm:px-10 md:gap-8">
        <div className="hero-copy">
          <FadeIn className="hero-intro flex min-w-0 flex-col gap-3 md:gap-4">
            <p className="text-foreground text-[clamp(0.9375rem,4vw,1.625rem)] leading-tight font-medium tracking-tight md:text-[26px] lg:text-[30px]">
              I&rsquo;m Mahad Sajjad
            </p>

            <h1
              id="hero-heading"
              className="text-foreground flex flex-col text-[clamp(1.25rem,5.7vw,2.5rem)] leading-[1.1] font-medium tracking-tight md:text-[clamp(2rem,4.2vw,3.65rem)] md:leading-[1.05]"
            >
              <span>Full-Stack Web</span>
              <span>&amp; App Developer</span>
            </h1>
          </FadeIn>

          <FadeIn className="hero-details flex min-w-0 flex-col gap-4">
            <p className="text-foreground/65 max-w-[34ch] text-[18px] leading-[1.4] tracking-tight sm:text-[20px] lg:text-[22px]">
              A full-stack developer who builds products end-to-end, from
              database to deployment.
            </p>

            <HeroCtas />
          </FadeIn>
        </div>

        <ScaleUnblur className="hero-visual flex min-w-0 justify-end">
          <div className="hero-portrait relative aspect-square">
            <TiltedCard
              imageSrc={PORTRAIT_SRC}
              altText="Portrait of Mahad Sajjad, full-stack web developer"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={5}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              imageClassName="grayscale contrast-110 brightness-90 sepia-[0.15] dark:brightness-75 dark:contrast-125"
            />
          </div>
        </ScaleUnblur>
      </div>
    </section>
  );
}

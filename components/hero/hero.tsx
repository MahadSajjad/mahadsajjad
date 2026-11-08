import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import TiltedCard from "./TiltedCard";

const PORTRAIT_SRC = "/mahad.webp";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full" aria-labelledby="hero-heading">
      <div className="hero-layout mx-auto grid w-full max-w-275 grid-cols-1 content-center items-center gap-6 px-6 sm:px-10 md:grid-cols-2 md:gap-8">
        <FadeIn className="order-2 flex flex-col gap-4 md:order-none">
          <p className="text-foreground text-[22px] leading-tight font-medium tracking-tight sm:text-[26px] lg:text-[30px]">
            I&rsquo;m Mahad Sajjad
          </p>

          <h1
            id="hero-heading"
            className="text-foreground flex flex-col text-[clamp(1.75rem,8.5vw,2.75rem)] leading-[1.05] font-medium tracking-tight md:text-[clamp(2rem,4.2vw,3.65rem)]"
          >
            <span>Full-Stack Web</span>
            <span>&amp; App Developer</span>
          </h1>

          <p className="text-foreground/65 max-w-[34ch] text-[18px] leading-[1.4] tracking-tight sm:text-[20px] lg:text-[22px]">
            A full-stack developer who builds products end-to-end, from database
            to deployment.
          </p>

          <HeroCtas />
        </FadeIn>

        <ScaleUnblur className="order-1 flex justify-start md:order-none md:justify-end">
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

import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { RotatingText } from "@/components/ui/rotating-text";
import TiltedCard from "./TiltedCard";

const PORTRAIT_SRC = "/josh.webp";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[30px] leading-tight tracking-tight font-medium text-foreground">
              I&rsquo;m Mahad Sajjad
            </p>

            <h1 className="flex flex-col text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="whitespace-nowrap">Web & App</span>
              <RotatingText
                texts={["Developer", "Designer", "Engineer" ]}
                mainClassName="w-fit justify-center overflow-hidden rounded-lg py-0.5 text-foreground md:py-1"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1.5 sm:pb-2 md:pb-2.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
                splitBy="characters"
                auto
                loop
              />
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
            I've shipped SaaS platforms, POS systems, and client products end-to-end — solo.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105">
              <TiltedCard
                imageSrc={PORTRAIT_SRC}
                altText="mahad portrait"
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
      </div>
    </section>
  );
}

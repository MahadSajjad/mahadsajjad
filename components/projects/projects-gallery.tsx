"use client";

import dynamic from "next/dynamic";
import Image, { getImageProps, type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";

const CircularGallery = dynamic(() => import("./CircularGallery"), {
  ssr: false,
});

import alFajr from "./images/al-fajr.png";
import aureolea from "./images/aureolea.png";
import eleganceUK from "./images/EleganceUK.webp";
import emiratesFront from "./images/emiratesfront.png";
import fashionThread from "./images/fashionthread.png";
import footLandShoes from "./images/FootLandShoes.png";
import getSetProperties from "./images/getsetproperties.png";
import metafessional from "./images/Metafessional.png";
import metroMetal from "./images/metro-metal.webp";
import nutrista from "./images/nutrista.png";
import pos from "./images/pos.png";
import transiqi from "./images/transiqi.png";
import zenvix from "./images/Zenvix.png";

function galleryImage(image: StaticImageData): string {
  return getImageProps({
    src: image,
    alt: "",
    width: 540,
    height: Math.round((540 * image.height) / image.width),
  }).props.src;
}

const GALLERY_ITEMS = [
  { image: metroMetal, text: "Metro Metal" },
  { image: emiratesFront, text: "Emirates Front" },
  { image: zenvix, text: "Zenvix" },
  { image: footLandShoes, text: "Foot Land Shoes" },
  { image: eleganceUK, text: "The Elegance Bed Company" },
  { image: pos, text: "POS System" },
  { image: getSetProperties, text: "Get Set Properties" },
  { image: fashionThread, text: "Fashion Thread" },
  { image: aureolea, text: "Aureolea" },
  { image: nutrista, text: "Nutrista" },
  { image: transiqi, text: "Transiqi" },
  { image: alFajr, text: "Al Fajr" },
  { image: metafessional, text: "Metafessional" },
];

const WEBGL_ITEMS = GALLERY_ITEMS.map((item) => ({
  image: galleryImage(item.image),
  text: item.text,
}));

export function ProjectsGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const enhanced = useEnhancedVisuals();
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = galleryRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { rootMargin: "150px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full pb-24 sm:pb-32">
      <div ref={galleryRef} className="relative h-[360px] sm:h-[500px]">
        {enhanced ? (
          isVisible ? (
            <CircularGallery
              items={WEBGL_ITEMS}
              bend={3}
              textColor={resolvedTheme === "light" ? "#0a0a0a" : "#ffffff"}
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.02}
              imageScale={1}
            />
          ) : null
        ) : (
          <div
            className="flex h-full snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4"
            role="region"
            aria-label="Project gallery. Swipe or scroll horizontally to browse."
            tabIndex={0}
          >
            {GALLERY_ITEMS.map((item) => (
              <figure
                key={item.text}
                className="w-[min(78vw,360px)] shrink-0 snap-center"
              >
                <div className="bg-foreground/5 relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={`${item.text} project preview`}
                    fill
                    sizes="(min-width: 480px) 360px, 78vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-foreground mt-3 text-center text-sm font-medium">
                  {item.text}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

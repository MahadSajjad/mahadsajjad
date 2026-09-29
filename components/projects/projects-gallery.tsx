'use client';

import dynamic from 'next/dynamic';
import { getImageProps, type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CircularGallery = dynamic(() => import('./CircularGallery'), { ssr: false });

import alFajr from './images/al-fajr.png';
import aureolea from './images/aureolea.png';
import eleganceUK from './images/EleganceUK.webp';
import emiratesFront from './images/emiratesfront.png';
import fashionThread from './images/fashionthread.png';
import footLandShoes from './images/FootLandShoes.png';
import getSetProperties from './images/getsetproperties.png';
import metafessional from './images/Metafessional.png';
import nutrista from './images/nutrista.png';
import pos from './images/pos.png';
import transiqi from './images/transiqi.png';
import zenvix from './images/Zenvix.png';

function galleryImage(image: StaticImageData): string {
  return getImageProps({
    src: image,
    alt: '',
    width: 540,
    height: Math.round((540 * image.height) / image.width),
  }).props.src;
}

const GALLERY_ITEMS = [
  { image: galleryImage(emiratesFront), text: 'Emirates Front' },
  { image: galleryImage(zenvix), text: 'Zenvix' },
  { image: galleryImage(footLandShoes), text: 'Foot Land Shoes' },
  { image: galleryImage(eleganceUK), text: 'The Elegance Bed Company' },
  { image: galleryImage(pos), text: 'POS System' },
  { image: galleryImage(getSetProperties), text: 'Get Set Properties' },
  { image: galleryImage(fashionThread), text: 'Fashion Thread' },
  { image: galleryImage(aureolea), text: 'Aureolea' },
  { image: galleryImage(nutrista), text: 'Nutrista' },
  { image: galleryImage(transiqi), text: 'Transiqi' },
  { image: galleryImage(alFajr), text: 'Al Fajr' },
  { image: galleryImage(metafessional), text: 'Metafessional' },
];

export function ProjectsGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textColor, setTextColor] = useState('#ffffff');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const element = galleryRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { rootMargin: '150px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTextColor(isDark ? '#ffffff' : '#0a0a0a');
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative w-full pb-24 sm:pb-32">
      <div ref={galleryRef} className="relative h-[360px] sm:h-[500px]">
        {isVisible ? (
          <CircularGallery
            items={GALLERY_ITEMS}
            // Flat on mobile: a narrow viewport makes any bend rotate off-center
            // images heavily. Keep the curved look on larger screens.
            bend={isMobile ? 0 : 3}
            textColor={textColor}
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.02}
            imageScale={1}
          />
        ) : null}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery';

import alFajr from './images/al-fajr.png';
import aureolea from './images/aureolea.png';
import emiratesFront from './images/emiratesfront.png';
import fashionThread from './images/fashionthread.png';
import footLandShoes from './images/FootLandShoes.png';
import getSetProperties from './images/getsetproperties.png';
import metafessional from './images/Metafessional.png';
import nutrista from './images/nutrista.png';
import pos from './images/pos.png';
import transiqi from './images/transiqi.png';
import zenvix from './images/Zenvix.png';

const GALLERY_ITEMS = [
  { image: emiratesFront.src, text: 'Emirates Front' },
  { image: emiratesFrontSecondary.src, text: 'Emirates Front Services' },
  { image: zenvix.src, text: 'Zenvix' },
  { image: footLandShoes.src, text: 'Foot Land Shoes' },
  { image: pos.src, text: 'POS System' },
  { image: getSetProperties.src, text: 'Get Set Properties' },
  { image: fashionThread.src, text: 'Fashion Thread' },
  { image: aureolea.src, text: 'Aureolea' },
  { image: nutrista.src, text: 'Nutrista' },
  { image: transiqi.src, text: 'Transiqi' },
  { image: alFajr.src, text: 'Al Fajr' },
  { image: metafessional.src, text: 'Metafessional' },
];

export function ProjectsGallery() {
  const [textColor, setTextColor] = useState('#ffffff');
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="relative h-[360px] sm:h-[500px]">
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
      </div>
    </section>
  );
}

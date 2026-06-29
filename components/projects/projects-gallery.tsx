'use client';

import { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery';

import alFajr from './images/al-fajr.png';
import aureolea from './images/aureolea.png';
import fashionThread from './images/fashionthread.png';
import getSetProperties from './images/getsetproperties.png';
import metafessional from './images/Metafessional.png';
import nutrista from './images/nutrista.png';
import pos from './images/pos.png';
import transiqi from './images/transiqi.png';

const GALLERY_ITEMS = [
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

  return (
    <section className="relative w-full pb-24 sm:pb-32">
      <div style={{ height: '500px', position: 'relative' }}>
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={3}
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

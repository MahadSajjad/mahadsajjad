"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEnhancedVisuals } from "@/lib/rendering-preferences";

const springValues = {
  damping: 60,
  stiffness: 40,
  mass: 4,
};

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  imageClassName?: string;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  imageClassName = "",
}: TiltedCardProps) {
  const enhanced = useEnhancedVisuals();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const lastYRef = useRef(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!enhanced || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = Math.max(
      -rotateAmplitude,
      Math.min(
        rotateAmplitude,
        (offsetY / (rect.height / 2)) * -rotateAmplitude
      )
    );
    const rotationY = Math.max(
      -rotateAmplitude,
      Math.min(rotateAmplitude, (offsetX / (rect.width / 2)) * rotateAmplitude)
    );

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastYRef.current;
    rotateFigcaption.set(-velocityY * 0.2);
    lastYRef.current = offsetY;
  }

  function handleMouseEnter() {
    if (!enhanced) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative flex h-full w-full flex-col items-center justify-center lg:[perspective:800px]"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 block text-center text-sm sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative lg:[transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(min-width: 768px) 420px, (min-width: 400px) 288px, 72vw"
          preload
          className={`absolute top-0 left-0 rounded-[15px] object-cover ${imageClassName}`}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] [transform:translateZ(30px)] will-change-transform">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute top-0 left-0 z-[3] hidden rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

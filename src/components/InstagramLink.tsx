"use client";

import Image from "next/image";
import { useState } from "react";
import * as gtag from "@/lib/gtag";

interface InstagramLinkProps {
  showUnderlines?: boolean;
}

export function InstagramLink({ showUnderlines = true }: InstagramLinkProps) {
  const [showStrich, setShowStrich] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isNavigating) return;
    
    setShowStrich(true);
    setIsNavigating(true);
    
    // Track event
    gtag.event({
      action: 'click',
      category: 'Social',
      label: 'Instagram Footer Link',
    });
    
    // Delay navigation to show underlines
    setTimeout(() => {
      window.open('https://www.instagram.com/phil.in.wien/', '_blank');
      setTimeout(() => {
        setShowStrich(false);
        setIsNavigating(false);
      }, 100);
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    // On desktop, just track the event
    gtag.event({
      action: 'click',
      category: 'Social',
      label: 'Instagram Footer Link',
    });
  };

  return (
    <a
      href="https://www.instagram.com/phil.in.wien/"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram: phil.in.wien"
      className="block w-[300px] h-[120px] relative active:scale-95 transition-transform duration-150"
      onMouseEnter={() => showUnderlines && setShowStrich(true)}
      onMouseLeave={() => setShowStrich(false)}
      onTouchStart={showUnderlines ? handleTouch : undefined}
      onClick={handleClick}
    >
      <Image
        src="/images/assets/instagram-optimized.webp"
        alt="Folge uns auf Instagram"
        fill
        className="object-contain"
      />
      {showUnderlines && showStrich && (
        <>
          <Image
            src="/images/assets/unterstreichung-beige.png"
            alt=""
            width={180}
            height={22}
            className="absolute bottom-[50px] left-[24%] object-contain pointer-events-none"
            style={{ zIndex: 10, transform: 'rotate(-3deg) scaleY(1.4)' }}
            unoptimized
          />
          <Image
            src="/images/assets/unterstreichung-beige.png"
            alt=""
            width={130}
            height={22}
            className="absolute bottom-[8px] left-[40%] object-contain pointer-events-none"
            style={{ zIndex: 10, transform: 'rotate(-3deg) scaleY(1.4)' }}
            unoptimized
          />
        </>
      )}
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";

type Viewport = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
};

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isPortrait: false,
    isLandscape: false,
  });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const portrait = window.matchMedia("(orientation: portrait)");

    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: mobile.matches,
        isTablet: tablet.matches,
        isDesktop: desktop.matches,
        isPortrait: portrait.matches,
        isLandscape: !portrait.matches,
      });
    };

    update();

    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    desktop.addEventListener("change", update);
    portrait.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      portrait.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return viewport;
}

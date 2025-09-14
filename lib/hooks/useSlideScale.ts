"use client"
import { useEffect, useState } from "react";
import { SLIDE_CONFIG } from "@/lib/config/slide";


export function useSlideScale() {
  const [slideScale, setSlideScale] = useState(0.7);

  useEffect(() => {
    const updateScale = () => {
      const padding = 20;
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;

      const scaleX = availableWidth / SLIDE_CONFIG.width;
      const scaleY = availableHeight / SLIDE_CONFIG.height;

      setSlideScale(Math.min(scaleX, scaleY) * 0.95);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return slideScale;
}

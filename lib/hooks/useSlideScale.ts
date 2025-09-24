import { useEffect, useState } from "react";
import { SLIDE_CONFIG } from "../config/slide";

export function useSlideScale() {
  const [slideScale, setSlideScale] = useState(0.7);

  useEffect(() => {
    const updateScale = () => {
      const padding = 20;
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;

      const scaleX = availableWidth / SLIDE_CONFIG.width;
      const scaleY = availableHeight / SLIDE_CONFIG.height;
      const newScale = Math.min(scaleX, scaleY) * 0.95;

      setSlideScale((prev) => {
        if (Math.abs(prev - newScale) > 0.001) {
          return newScale;
        }
        return prev;
      });
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return slideScale;
}

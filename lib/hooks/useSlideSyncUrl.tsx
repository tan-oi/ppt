"use client";

import { useEffect, useRef } from "react";
import { useQueryState } from "nuqs";
import { usePresentationStore } from "../store/presentation-store";

export function useSlideUrlSync(slideIds: string[]) {
  const [currentSlide, setCurrentSlide] = useQueryState("slide");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setSlide = usePresentationStore((s) => s.setCurrentSlide);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  //not working rn, cause we're setting the index to 0 on first load.
  useEffect(() => {
    if (currentSlide) {
      document
        .getElementById(currentSlide)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (slideIds.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio
            ? current
            : prev;
        });

        if (
          mostVisible.intersectionRatio > 0.5 &&
          mostVisible.target.id !== currentSlide
        ) {
          if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
          }

          updateTimeoutRef.current = setTimeout(() => {
            setCurrentSlide(mostVisible.target.id);
            setSlide(mostVisible.target.id);
          }, 150);
        }
      },
      {
        threshold: [0.5, 0.75, 1.0],
        rootMargin: "0px 0px -20% 0px",
      }
    );

    slideIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [slideIds, currentSlide, setCurrentSlide, setSlide]);
}

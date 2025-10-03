"use client";

import { useEffect, useRef } from "react";
import { useQueryState } from "nuqs";
import { usePresentationStore } from "../store/presentation-store";

export function useSlideUrlSync(slideIds: string[]) {
  const [currentSlide, setCurrentSlide] = useQueryState("slide");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setSlide = usePresentationStore((s) => s.setCurrentSlide);

  useEffect(() => {
    if (slideIds.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio > 0.5 &&
            entry.target.id !== currentSlide
          ) {
            setCurrentSlide(entry.target.id);
            setSlide(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    slideIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [slideIds, currentSlide, setCurrentSlide]);
}

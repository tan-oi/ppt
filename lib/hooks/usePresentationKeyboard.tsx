import { useQueryState } from "nuqs";
import { useUIStore } from "../store/ui-store";
import { useEffect } from "react";
import { usePresentationStore } from "../store/presentation-store";

export function usePresentationKeyboard(
  presentationMode: boolean,
  slides: any[],
  currentSlideIndex: number
) {
  const setPresentationMode = useUIStore((s) => s.setPresentationMode);
  const nextSlide = useUIStore((s) => s.nextSlide);
  const prevSlide = useUIStore((s) => s.prevSlide);
  const [, setCurrentSlideParam] = useQueryState("slide");

  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const targetSlide = slides[currentSlideIndex];
        setPresentationMode(false);
        if (targetSlide) {
          setCurrentSlideParam(targetSlide.id);
          usePresentationStore.getState().setCurrentSlide(targetSlide.id);
        }
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    presentationMode,
    nextSlide,
    prevSlide,
    setPresentationMode,
    slides,
    currentSlideIndex,
  ]);
}

export function useSaveShortcut(saveNow: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveNow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveNow]);
}

"use client";

import { populateStores } from "@/lib/helper";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { Slide } from "./slide";
import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useUIStore } from "@/lib/store/ui-store";
import { PresentationModeView } from "./presentation-mode";
import { useSlideUrlSync } from "@/lib/hooks/useSlideSyncUrl";
import { useQueryState } from "nuqs";
import { Button } from "./ui/button";
import { usePresentationKeyboard } from "@/lib/hooks/usePresentationKeyboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function PresentationViewer({ viewData }: { viewData: any }) {
  const [currentSlideParam, setCurrentSlideParam] = useQueryState("slide");
  const currentSlideIndex = useUIStore((s) => s.currentSlideIndex);
  const slides = usePresentationStore((s) => s.slides);
  const nextSlide = useUIStore((s) => s.nextSlide);
  const prevSlide = useUIStore((s) => s.prevSlide);
  const clearPresentation = usePresentationStore((s) => s.clearPresentation);
  const presentationMode = useUIStore((s) => s.presentationMode);
  const setPresentationMode = useUIStore((s) => s.setPresentationMode);

  useEffect(() => {
    // viewData
    console.log(viewData);
    clearPresentation();

    viewData.slides.forEach((slide: any) => {
      populateStores(slide);
    });

    // useUIStore.getState().setPresentationMode(true);
  }, []);

  useEffect(() => {
    if (presentationMode && slides.length > 0) {
      const currentSlide = slides[currentSlideIndex];
      if (currentSlide) {
        setCurrentSlideParam(currentSlide.id);
      }
    }
  }, [presentationMode, currentSlideIndex, slides, setCurrentSlideParam]);

  const slideScale = useSlideScale();
  const slideIds = useMemo(() => slides?.map((s: any) => s.id) || [], [slides]);
  useSlideUrlSync(slideIds);
  usePresentationKeyboard(presentationMode, slides, currentSlideIndex);
  if (presentationMode) {
    return (
      <PresentationModeView
        currentSlide={slides[currentSlideIndex]}
        currentSlideIndex={currentSlideIndex}
        slides={slides}
        pptTheme={viewData.theme ?? "starter"}
        onExit={() => {
          console.log(currentSlideIndex);
          const targetSlide = slides[0];
          console.log(targetSlide);
          console.log(slides);
          setPresentationMode(false);
          useUIStore.getState().setPresentationMode(false);
          if (targetSlide) {
            setCurrentSlideParam(targetSlide.id);
            usePresentationStore.getState().setCurrentSlide(targetSlide.id);
            useUIStore.getState().setCurrentSlideIndex(0);
          }
        }}
        onNext={nextSlide}
        onPrev={prevSlide}
      />
    );
  }

  return (
    <>
      <div
        className={cn(
          "bg-container min-h-screen overflow-hidden flex flex-col items-center py-6 relative",
          viewData.theme
        )}
      >
        <div className="flex flex-col items-center gap-10">
          {slides.map((item: any, i: number) => (
            <Slide
              key={item.id}
              data={item}
              id={item.id}
              slideScale={slideScale}
              isPresenting={true}
            />
          ))}
        </div>

        <div className="hidden md:block">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  setPresentationMode(true);
                }}
                className="fixed top-4 right-4"
              >
                Full screen
              </Button>
            </TooltipTrigger>
            <TooltipContent>Go full screen</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

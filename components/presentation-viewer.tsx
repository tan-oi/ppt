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
import { toast } from "sonner";
import { SlideLoader } from "./base/loaders/slide-loader";
import { getPresentationFromLocal } from "@/lib/local-db";

export function PresentationViewer({
  viewData,
  id,
}: {
  viewData: any;
  id: string;
}) {
  const [currentSlideParam, setCurrentSlideParam] = useQueryState("slide");
  const currentSlideIndex = useUIStore((s) => s.currentSlideIndex);
  const slides = usePresentationStore((s) => s.slides);
  const nextSlide = useUIStore((s) => s.nextSlide);
  const prevSlide = useUIStore((s) => s.prevSlide);
  const clearPresentation = usePresentationStore((s) => s.clearPresentation);
  const presentationMode = useUIStore((s) => s.presentationMode);
  const setPresentationMode = useUIStore((s) => s.setPresentationMode);
  const [isLoadingGuest, setIsLoadingGuest] = useState(!viewData);
  const [pptTheme, setPptTheme] = useState<string>("starter");

  useEffect(() => {
    const loadPresentation = async () => {
      if (!viewData) {
        try {
          setIsLoadingGuest(true);
          const localData = await getPresentationFromLocal(id);

          if (!localData) {
            toast.error("Presentation not found in local storage");
            window.location.href = "/";
            return;
          }

          clearPresentation();
          usePresentationStore.setState({
            theme: localData.theme,
          });
          setPptTheme(localData.theme);

          localData.slides.forEach((slide: any) => {
            populateStores(slide);
          });

          setIsLoadingGuest(false);
        } catch (error) {
          console.error("Error loading guest presentation:", error);
          toast.error("Failed to load presentation");
          setIsLoadingGuest(false);
          window.location.href = "/?login=true";
        }
      } else if (viewData) {
        clearPresentation();
        usePresentationStore.setState({
          theme: viewData.theme,
        });
        setPptTheme(viewData.theme);

        viewData.slides.forEach((slide: any) => {
          populateStores(slide);
        });
      }
    };

    loadPresentation();
  }, [viewData, id]);

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

  if (isLoadingGuest) {
    return <SlideLoader type="finding" />;
  }

  if (presentationMode) {
    return (
      <PresentationModeView
        currentSlide={slides[currentSlideIndex]}
        currentSlideIndex={currentSlideIndex}
        slides={slides}
        pptTheme={pptTheme ?? "starter"}
        onExit={() => {
          const targetSlide = slides[0];
          setPresentationMode(false);
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
          pptTheme && pptTheme !== "starter" ? `${pptTheme}` : "font-sans"
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

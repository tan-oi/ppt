"use client";

import { populateStores } from "@/lib/helper";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Slide } from "./slide";
import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useUIStore } from "@/lib/store/ui-store";

export function PresentationViewer({ viewData }: { viewData: any }) {
  const slides = usePresentationStore((s) => s.slides);
  const clearPresentation = usePresentationStore((s) => s.clearPresentation);

  useEffect(() => {
    // viewData
    console.log(viewData);
    clearPresentation();

    viewData.slides.forEach((slide: any) => {
      populateStores(slide);
    });

    useUIStore.getState().setPresentationMode(true);
  }, []);

  const slideScale = useSlideScale();

  return (
    <>
      <div
        className={cn(
          "bg-container min-h-screen overflow-hidden flex flex-col items-center py-6",
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
      </div>
    </>
  );
}

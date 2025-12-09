"use client";
import React from "react";
import { WidgetWrapper } from "./widget-wrapper";
import { useDroppable } from "@dnd-kit/core";
import { SLIDE_CONFIG } from "@/lib/config/slide";

import { cn } from "@/lib/utils";
import { useThemeFonts } from "@/lib/config/theme-loader";
import * as motion from "motion/react-client";
import { usePresentationStore } from "@/lib/store/presentation-store";

const SlidePresentation = React.memo(
  ({
    data,
    slideScale,
    isPresenting,
    isGuestMode,
  }: {
    data: any;
    slideScale: number;
    isPresenting?: boolean;
    isGuestMode?: boolean;
  }) => {
    return (
      <div
        className="relative slide-presentation-content"
        style={{
          transform: `scale(${slideScale})`,
          transformOrigin: "top left",
          width: SLIDE_CONFIG.width,
          height: SLIDE_CONFIG.height,
          transition: "transform 0.5s ease-out",
          position: "relative",
        }}
      >
        {data &&
          Object.keys(data.widgets).map((widgetId) => (
            <WidgetWrapper
              key={widgetId}
              widgetId={widgetId}
              slideScale={slideScale}
              slideId={data.id}
              isPresenting={isPresenting ?? false}
              isGuestMode={isGuestMode}
            />
          ))}
      </div>
    );
  }
);

function SlideBase({
  id,
  slideScale,
  isPresenting,
  data,
  isGuestMode,
}: {
  data: any;
  id: string;
  slideScale: number;
  isPresenting?: boolean;
  isGuestMode?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "slide" },
  });

  // const slideData = usePresentationStore((s) =>
  //   s.slides.find((slide: any) => slide.id === id)
  // );
  //changed each. slideData below it to data.

  if (!data) return null;

  useThemeFonts(data.theme);

  return (
    <motion.div
      initial={{
        scale: 0.95,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: 0.1,
        duration: 0.5,
        ease: "easeInOut",
      }}
      viewport={{
        amount: 0.7,
      }}
      id={id}
      ref={setNodeRef}
      style={{
        width: SLIDE_CONFIG.width * slideScale,
        height: SLIDE_CONFIG.height * slideScale,
        overflow: "hidden",
      }}
      className={cn(
        "grid grid-cols-24 grid-rows-24 bg-background rounded-lg",
        data.theme && data.theme !== "starter" ? data.theme : ""
      )}
    >
      <SlidePresentation
        data={data}
        slideScale={slideScale}
        isPresenting={isPresenting}
        isGuestMode={isGuestMode}
      />
    </motion.div>
  );
}

export const Slide = SlideBase;

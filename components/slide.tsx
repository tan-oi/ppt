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
  }: {
    data: any;
    slideScale: number;
    isPresenting?: boolean;
  }) => {
    return (
      <div
        style={{
          transform: `scale(${slideScale})`,
          transformOrigin: "top left",
          width: SLIDE_CONFIG.width,
          height: SLIDE_CONFIG.height,
          transition: "transform 0.5s ease-out",
          position: "relative",
        }}
        className="relative"
      >
        <button
          onClick={() => {
            console.log(usePresentationStore.getState().slides);
          }}
        >
          holy shit
        </button>

        {data &&
          Object.keys(data.widgets).map((widgetId) => (
            <WidgetWrapper
              key={widgetId}
              widgetId={widgetId}
              slideScale={slideScale}
              slideId={data.id}
              isPresenting={isPresenting ?? false}
            />
          ))}
      </div>
    );
  }
);

function SlideBase({
  data,
  id,
  slideScale,
  isPresenting
}: {
  data: any;
  id: string;
  slideScale: number;
  isPresenting?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "slide" },
  });

  useThemeFonts(data.theme);

  return (
    <motion.div
      initial={{
        scale: 0.95,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      id={id}
      ref={setNodeRef}
      style={{
        width: SLIDE_CONFIG.width * slideScale,
        height: SLIDE_CONFIG.height * slideScale,

        overflow: "hidden",
      }}
      className={cn(
        "grid grid-cols-24 grid-rows-24 bg-background",
        data.theme && data.theme !== "starter" ? data.theme : ""
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: isOver ? "2px dashed #4ade80" : "",
          borderRadius: "10px",
        }}
      />

      <SlidePresentation
        data={data}
        slideScale={slideScale}
        isPresenting={isPresenting}
      />
    </motion.div>
  );
}

export const Slide = React.memo(SlideBase);

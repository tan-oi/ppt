import React from "react";
import { WidgetWrapper } from "./widget-wrapper";
import { useDroppable } from "@dnd-kit/core";
import { SLIDE_CONFIG } from "@/lib/config/slide";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { cn } from "@/lib/utils";

const SlidePresentation = React.memo(
  ({ data, slideScale }: { data: any; slideScale: number }) => {
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
}: {
  data: any;
  id: string;
  slideScale: number;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "slide" },
  });

  return (
    <div
      id={id}
      ref={setNodeRef}
      style={{
        width: SLIDE_CONFIG.width * slideScale,
        height: SLIDE_CONFIG.height * slideScale,
        borderRadius: "10px",
        // paddingInline: "14px",
        // paddingBlock: "10px",
        // background: "black",
        overflow: "hidden",
      }}
      className={cn(
        "grid grid-cols-24 bg-background",
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

      <SlidePresentation data={data} slideScale={slideScale} />
    </div>
  );
}

export const Slide = React.memo(SlideBase);

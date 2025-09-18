"use client";

import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
import { Slide } from "./slide";

export function Presentation({ presentationData }: { presentationData: any }) {
  const slideScale = useSlideScale();

  useWidgetDeselect();
  return (
    <>
      <div className="modern bg-primary min-h-screen overflow-hidden flex flex-col items-center py-6 font-sans">
        <div className="flex flex-col items-center gap-10">
          {presentationData.slides.map((item: any, i: number) => (
            <Slide
              key={item.id}
              data={item}
              id={item.id}
              slideScale={slideScale}
            />
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
import { Slide } from "./slide";
import { nanoid } from "nanoid";

export function Presentation({ presentationData }: { presentationData: any }) {
  const slideScale = useSlideScale();
  useWidgetDeselect();
  return (
    <>
      <div className="bg-gray-50 min-h-screen overflow-hidden flex flex-col items-center py-6 font-sans">
        <div className="flex flex-col items-center gap-10">
          {presentationData.slides.map((item: any, i: number) => (
            <Slide key={i} data={item} id={nanoid(7)} slideScale={slideScale}/>
          ))}
        </div>
      </div>
    </>
  );
}

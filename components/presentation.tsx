"use client";

import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
import { Slide } from "./slide";
import { useEffect } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  needsTransformation,
  populateStores,
  transformAndStorePresentation,
} from "@/lib/helper";

export function Presentation({
  llmToBeCalled,
  presentationData,
}: {
  presentationData: any;
  llmToBeCalled: boolean;
}) {
  const addSlides = usePresentationStore((s) => s.addSlide);
  const slides = usePresentationStore((s) => s.slides);
  const setType = usePresentationStore((s) => s.setType);
  console.log(llmToBeCalled);
  const { status, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/trail",
    }),
    onFinish: (options) => {
      console.log(options);
    },
  });

  useEffect(() => {
    if (llmToBeCalled) {
      setType("llm");
      console.log("heelo?");
      sendMessage({
        role: "user",
        parts: [
          {
            type: "text",
            text: "yo ssup mate",
          },
        ],
      });
    } else if (presentationData && !llmToBeCalled) {
      if (needsTransformation(presentationData)) {
        transformAndStorePresentation(presentationData);
      } else {
      
        presentationData.slides.forEach((slide: any) => {
          populateStores(slide);
        });
      }
    }
  }, [llmToBeCalled, presentationData]);
  
  const slideScale = useSlideScale();

  useWidgetDeselect();

  if (!slides) return <p>Loading....</p>;
  if (status === "submitted" || status === "streaming")
    return <p className="text-white text-center">LLm cooking</p>;
  return (
    <>
      <div className="modern bg-primary min-h-screen overflow-hidden flex flex-col items-center py-6 font-sans">
        <div className="flex flex-col items-center gap-10">
          {slides.map((item: any, i: number) => (
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

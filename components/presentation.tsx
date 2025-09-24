"use client";

import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
import { Slide } from "./slide";
import { useEffect } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { DndContext } from "@dnd-kit/core";
import {
  needsTransformation,
  populateStores,
  transformAndStorePresentation,
} from "@/lib/helper";
import { DraggableButton } from "./draggable-button";

export function Presentation({
  llmToBeCalled,
  presentationData,
}: {
  presentationData: any;
  llmToBeCalled: boolean;
}) {
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
    if (llmToBeCalled && !presentationData) {
      setType("llm");
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
      <DndContext
        onDragEnd={(event) => {
          console.log(event);

          const { active, over, delta, activatorEvent } = event;
          let finalX, finalY;
          if (activatorEvent) {
            finalX = activatorEvent.clientX + delta.x;
            finalY = activatorEvent.clientY + delta.y;
            console.log("Final mouse position:", { x: finalX, y: finalY });
          }

          const slug = active?.data?.current?.slug;
          const slideId = String(over?.id);
          const addWidget = usePresentationStore.getState().addWidget;

          addWidget(slideId, slug, { x: finalX, y: finalY });
        }}
      >
        <div className="modern bg-primary min-h-screen overflow-hidden flex flex-col items-center py-6 font-sans">
          <div className="fixed top-4 right-4 z-10">
            <DraggableButton />
          </div>

          <div className="fixed bg-gray-50/50 background-blur-2xl bottom-6 z-100 text-black">
            hello
          </div>
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
      </DndContext>
    </>
  );
}

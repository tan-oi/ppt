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
import { DockBase } from "./dock/base";

export function Presentation({
  llmToBeCalled,
  presentationData,
}: {
  presentationData: any;
  llmToBeCalled: boolean;
}) {
  const slides = usePresentationStore((s) => s.slides);
  const setType = usePresentationStore((s) => s.setType);
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
        // onDragEnd={(event) => {
        //   console.log(event);

        //   const { active, over, delta, activatorEvent } = event;
        //   let finalX, finalY;

        //   if (activatorEvent) {
        //     finalX = activatorEvent.clientX + delta.x;
        //     finalY = activatorEvent.clientY + delta.y;

        //     console.log("Final mouse position:", { x: finalX, y: finalY });
        //   }

        //   const slug = active?.data?.current?.slug;
        //   const slideId = String(over?.id);
        //   const addWidget = usePresentationStore.getState().addWidget;

        //   addWidget(slideId, slug, { x: finalX, y: finalY });
        // }}

        onDragEnd={(event) => {
          console.log("Full event:", event);

          const { active, over, delta, activatorEvent } = event;

          if (!over || !activatorEvent) {
            console.log("No drop target or activator event");
            return;
          }

          const slideContainer = document.getElementById(String(over.id));

          if (!slideContainer) {
            console.error("Could not find slide container with id:", over.id);
            return;
          }

          const containerRect = slideContainer.getBoundingClientRect();
          const finalScreenX = activatorEvent.clientX + delta.x;
          const finalScreenY = activatorEvent.clientY + delta.y;

          const relativeX = finalScreenX - containerRect.left;
          const relativeY = finalScreenY - containerRect.top;

          const actualX = relativeX / slideScale;
          const actualY = relativeY / slideScale;

          console.log("Debug info:", {
            activatorEvent: {
              x: activatorEvent.clientX,
              y: activatorEvent.clientY,
            },
            delta,
            finalScreen: { x: finalScreenX, y: finalScreenY },
            containerRect: {
              left: containerRect.left,
              top: containerRect.top,
              width: containerRect.width,
              height: containerRect.height,
            },
            relative: { x: relativeX, y: relativeY },
            scaled: { x: actualX, y: actualY },
            slideScale,
          });

          const slug = active?.data?.current?.slug;
          const slideId = String(over?.id);
          const addWidget = usePresentationStore.getState().addWidget;

          addWidget(slideId, slug, { x: actualX, y: actualY });
        }}
      >
        <div className="velvet-night font-heading bg-white min-h-screen overflow-hidden flex flex-col items-center py-6 font-sans">
          <div className="fixed top-4 right-4 z-10">
            <DraggableButton />
          </div>

          <div className="fixed background-blur-2xl bottom-6 z-100">
            <DockBase />
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

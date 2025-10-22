"use client";

import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
import { Slide } from "./slide";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  needsTransformation,
  populateStores,
  transformAndStorePresentation,
} from "@/lib/helper";

import { DockBase } from "./dock/base";
import { WidgetRegistry } from "@/lib/registry/widget";
import { DrawerEditing } from "./widgets/drawer";
import { cn } from "@/lib/utils";
import { useSlideUrlSync } from "@/lib/hooks/useSlideSyncUrl";
import { useUIStore } from "@/lib/store/ui-store";
import { WidgetWrapper } from "./widget-wrapper";
import { SLIDE_CONFIG } from "@/lib/config/slide";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { ShareOption } from "./share-option";
import { useGenerationStore } from "@/lib/store/generation-store";
import { z } from "zod";
export function Presentation({
  llmToBeCalled,
  presentationData,
}: {
  presentationData: any;
  llmToBeCalled: boolean;
}) {
  const slides = usePresentationStore((s) => s.slides);
  const [, setCurrentSlideParam] = useQueryState("slide");

  const drawerOpen = useUIStore((s) => s.drawerOpen);
  const presentationMode = useUIStore((s) => s.presentationMode);
  const setPresentationMode = useUIStore((s) => s.setPresentationMode);
  const currentSlideIndex = useUIStore((s) => s.currentSlideIndex);
  const nextSlide = useUIStore((s) => s.nextSlide);
  const prevSlide = useUIStore((s) => s.prevSlide);

  const pptTheme = usePresentationStore((s) => s.theme);
  const setType = usePresentationStore((s) => s.setType);
  const [activeElement, setActiveElement] = useState<any>(null);

  const { submit, object, isLoading } = useObject({
    api: "/api/generate-ppt",
    schema: z.array(z.any()),
    onFinish: (options) => {
      console.log(options);
      console.log(useGenerationStore.getState().processedOutline);
      const payload = {
        slides: options.object,
      };
      transformAndStorePresentation(payload);
    },
  });

  useEffect(() => {
    if (llmToBeCalled && !presentationData) {
      setType("llm");
      const processedOutline = useGenerationStore.getState().processedOutline;

      submit({
        processedOutline: JSON.stringify({ processedOutline }),
      });
    } else if (presentationData && !llmToBeCalled) {
      if (needsTransformation(presentationData)) {
        console.log("hello");
        transformAndStorePresentation(presentationData);
      } else {
        presentationData.slides.forEach((slide: any) => {
          populateStores(slide);
        });
      }
    }
  }, [llmToBeCalled, presentationData]);

  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const targetSlide = slides[currentSlideIndex];
        setPresentationMode(false);

        if (targetSlide) {
          setCurrentSlideParam(targetSlide.id);
          usePresentationStore.getState().setCurrentSlide(targetSlide.id);
        }
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationMode, nextSlide, prevSlide, setPresentationMode]);

  const slideScale = useSlideScale();
  const slideIds = useMemo(() => slides?.map((s: any) => s.id) || [], [slides]);
  useSlideUrlSync(slideIds);
  useEffect(() => {
    if (presentationMode && slides.length > 0) {
      const currentSlide = slides[currentSlideIndex];
      if (currentSlide) {
        setCurrentSlideParam(currentSlide.id);
      }
    }
  }, [presentationMode, currentSlideIndex, slides, setCurrentSlideParam]);

  useWidgetDeselect();

  const handleDragStart = useCallback((event: any) => {
    setActiveElement(event.active.data.current);
  }, []);
  const handleDragEnd = useCallback(
    (event: any) => {
      setActiveElement(null);
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

      const data = WidgetRegistry[slug].defaultData;
      console.log(data);
      addWidget(slideId, slug, { x: actualX, y: actualY }, data);

      requestAnimationFrame(() => {
        setActiveElement(null);
      });
    },
    [slideScale]
  );

  if (!slides) return <p>Loading....</p>;
  if (isLoading) return <p className="text-white text-center">LLm cooking</p>;

  if (presentationMode) {
    const currentSlide = slides[currentSlideIndex];
    // const windowWidth =
    //   typeof window !== "undefined" ? window.innerWidth : 1920;
    // const windowHeight =
    //   typeof window !== "undefined" ? window.innerHeight : 1080;
    // const scaleX = windowWidth / SLIDE_CONFIG.width;
    // const scaleY = windowHeight / SLIDE_CONFIG.height;

    return (
      <div
        className={cn(
          "fixed inset-0 z-[9999] bg-black flex items-center justify-center",
          pptTheme && pptTheme !== "starter" ? pptTheme : "font-sans"
        )}
      >
        <button
          onClick={() => {
            const targetSlide = slides[currentSlideIndex];
            setPresentationMode(false);

            if (targetSlide) {
              setCurrentSlideParam(targetSlide.id);
              usePresentationStore.getState().setCurrentSlide(targetSlide.id);
            }
          }}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={24} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
          <span className="text-white text-sm">
            {currentSlideIndex + 1} / {slides.length}
          </span>
        </div>
        {currentSlideIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
        )}
        {currentSlideIndex < slides.length - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        )}
        <div
          style={{
            width: SLIDE_CONFIG.width,
            height: SLIDE_CONFIG.height,
            transform: `scale(1)`,
            transformOrigin: "center",
          }}
          className={cn(
            "relative bg-background rounded-lg overflow-hidden grid grid-cols-24 grid-rows-24",
            currentSlide.theme && currentSlide.theme !== "starter"
              ? currentSlide.theme
              : ""
          )}
        >
          {currentSlide &&
            Object.keys(currentSlide.widgets).map((widgetId) => (
              <WidgetWrapper
                key={widgetId}
                widgetId={widgetId}
                slideScale={1}
                slideId={currentSlide.id}
                isPresenting={true}
              />
            ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div
          className={cn(
            "bg-container min-h-screen overflow-hidden flex flex-col items-center py-6",
            pptTheme && pptTheme !== "starter" ? `${pptTheme}` : "font-sans"
          )}
        >
          <div className="fixed top-4 right-0 z-10">
            <ShareOption
              shareUrl="http://holy.so"
              isShared={true}
              onRevoke={() => console.log("hey")}
            />
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
        <DragOverlay dropAnimation={null}>
          {activeElement ? (
            <div className="w-80 bg-zinc-800/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-2xl border border-zinc-600 flex items-center gap-2">
              <activeElement.icon size={16} className="text-zinc-300" />
              <span className="text-sm text-zinc-300">
                {activeElement.name}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      {drawerOpen && <DrawerEditing />}
    </>
  );
}

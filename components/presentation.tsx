  "use client";

  import { useSlideScale } from "@/lib/hooks/useSlideScale";
  import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
  import { Slide } from "./slide";
  import { useEffect, useMemo, useState } from "react";
  import { experimental_useObject as useObject } from "@ai-sdk/react";
  import { DndContext, DragOverlay } from "@dnd-kit/core";
  import {
    needsTransformation,
    populateStores,
    transformAndStorePresentation,
  } from "@/lib/helper";

  import { DockBase } from "./dock/base";
  import { DrawerEditing } from "./widgets/drawer";
  import { cn } from "@/lib/utils";
  import { useSlideUrlSync } from "@/lib/hooks/useSlideSyncUrl";
  import { useUIStore } from "@/lib/store/ui-store";

  import { useQueryState } from "nuqs";
  import { useGenerationStore } from "@/lib/store/generation-store";
  import { useAutoSave } from "@/lib/hooks/useAutoSave";
  import { z } from "zod";

  import { AutoSaveIndicator } from "./auto-save-indicator";
  import {
    usePresentationKeyboard,
    useSaveShortcut,
  } from "@/lib/hooks/usePresentationKeyboard";
  import { useSlideDragDrop } from "@/lib/hooks/useSlideDragDrop";
  import { PresentationModeView } from "./presentation-mode";
  import { usePresentationStore } from "@/lib/store/presentation-store";
  import SlideLoader from "./base/loaders/slide-loader";
  import { toast } from "sonner";

  export function Presentation({
    llmToBeCalled,
    presentationData,
    id,
  }: {
    presentationData: any;
    llmToBeCalled: boolean;
    id: string;
  }) {
    const slides = usePresentationStore((s) => s.slides) ?? [];

    const [, setCurrentSlideParam] = useQueryState("slide");
    const drawerOpen = useUIStore((s) => s.drawerOpen);
    const presentationMode = useUIStore((s) => s.presentationMode);
    const setPresentationMode = useUIStore((s) => s.setPresentationMode);
    const currentSlideIndex = useUIStore((s) => s.currentSlideIndex);
    const nextSlide = useUIStore((s) => s.nextSlide);
    const prevSlide = useUIStore((s) => s.prevSlide);
    const clearPresentation = usePresentationStore((s) => s.clearPresentation);
    const pptTheme = usePresentationStore((s) => s.theme);
    const setType = usePresentationStore((s) => s.setType);

    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [saveError, setSaveError] = useState<Error | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const {
      submit,
      object,
      isLoading,
      error: llmError,
    } = useObject({
      api: "/api/generate-ppt",
      schema: z.array(z.any()),

      onFinish: async (options) => {
        try {
          console.log("Raw response:", options.object);

          let slides = options.object;

          if (typeof slides === "string") {
            slides = JSON.parse(slides);
          }

          if (!Array.isArray(slides) || slides.length === 0) {
            throw new Error("Invalid slides data");
          }

          console.log(`Got ${slides.length} slides`);

          const payload = { slides };
          clearPresentation();
          transformAndStorePresentation(payload);

          const updatedSlideData = usePresentationStore.getState().slides;

          const topic =
            useGenerationStore.getState().userInstruction ||
            "Untitled Presentation";

          const payloadToBeSent = {
            topic,
            outlineId: id.startsWith("ai-") ? id.slice(3) : id,
            theme: pptTheme || "starter",
            isModified: false,
            slides: updatedSlideData.map((slide) => ({
              id: slide.id,
              theme: slide.theme || "starter",
              slideNumber: parseInt(String(slide.slideNumber)),
              heading: slide.heading,
              widgets: slide.widgets,
            })),
          };

          const res = await fetch(`/api/presentation/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadToBeSent),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Save failed");
          }

          const cleanId = id.startsWith("ai-") ? id.slice(3) : id;
          window.history.replaceState(null, "", `/docs/${cleanId}`);

          setLastSaved(new Date());
          toast.success("Presentation created!");
        } catch (err: any) {
          console.error(" Error:", err);
          toast.error(err.message);
          setSaveError(err.message);
        }
      },
    });

    const { saveNow } = useAutoSave({
      presentationId: id,
      enabled: !presentationMode && slides.length > 0,
      debounceMs: 20000,
      onSaveStart: () => {
        setIsSaving(true);
        setSaveError(null);
      },
      onSaveSuccess: () => {
        setIsSaving(false);
        setLastSaved(new Date());
        // toast.success("saved");
      },
      onSaveError: (error) => {
        setIsSaving(false);
        setSaveError(error);
        //@ts-ignore
        toast.error(error);
      },
    });

    const slideScale = useSlideScale();
    const slideIds = useMemo(() => slides?.map((s: any) => s.id) || [], [slides]);
    const { activeElement, handleDragStart, handleDragEnd } =
      useSlideDragDrop(slideScale);

    useSlideUrlSync(slideIds);
    useWidgetDeselect();
    usePresentationKeyboard(presentationMode, slides, currentSlideIndex);
    useSaveShortcut(saveNow);

    useEffect(() => {
      if (llmToBeCalled && !presentationData) {
        setType("llm");
        const processedOutline = useGenerationStore.getState().processedOutline;
        console.log(processedOutline);
        if (!processedOutline) {
          return;
        }
        submit({
          processedOutline: JSON.stringify(
            useGenerationStore.getState().processedOutline
          ),
        });
      } else if (presentationData && !llmToBeCalled) {
        if (needsTransformation(presentationData)) {
          transformAndStorePresentation(presentationData);
        } else {
          clearPresentation();
          usePresentationStore.setState({
            theme: presentationData.theme,
          });
          presentationData.slides.forEach((slide: any) => {
            populateStores(slide);
          });
        }
      }

      const slidesList = usePresentationStore.getState().slides;
      if (
        slidesList.length > 0 &&
        !usePresentationStore.getState().currentSlide
      ) {
        const firstSlideId = slidesList[0].id;
        setCurrentSlideParam(firstSlideId);
        usePresentationStore.getState().setCurrentSlide(firstSlideId);
      }
    }, []);

    useEffect(() => {
      if (presentationMode && slides.length > 0) {
        const currentSlide = slides[currentSlideIndex];
        if (currentSlide) {
          setCurrentSlideParam(currentSlide.id);
        }
      }
    }, [presentationMode, currentSlideIndex, slides, setCurrentSlideParam]);

    if (!slides) return <p>Loading....</p>;
    if (isLoading) return <SlideLoader />;

    if (presentationMode) {
      return (
        <PresentationModeView
          currentSlide={slides[currentSlideIndex]}
          currentSlideIndex={currentSlideIndex}
          slides={slides}
          pptTheme={pptTheme ?? "starter"}
          onExit={() => {
            const targetSlide = slides[currentSlideIndex];
            setPresentationMode(false);
            if (targetSlide) {
              setCurrentSlideParam(targetSlide.id);
              usePresentationStore.getState().setCurrentSlide(targetSlide.id);
            }
          }}
          onNext={nextSlide}
          onPrev={prevSlide}
        />
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
            <div className="fixed bottom-4 right-4 z-10">
              <AutoSaveIndicator
                isSaving={isSaving}
                lastSaved={lastSaved}
                error={saveError}
              />
            </div>

            <div className="fixed background-blur-2xl bottom-6 z-100">
              <DockBase />
            </div>

            <div className="flex flex-col items-center gap-10">
              {slides.map((item: any) => (
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
            {activeElement && (
              <div className="w-80 bg-zinc-800/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-2xl border border-zinc-600 flex items-center gap-2">
                <activeElement.icon size={16} className="text-zinc-300" />
                <span className="text-sm text-zinc-300">
                  {activeElement.name}
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
        {drawerOpen && <DrawerEditing />}
      </>
    );
  }

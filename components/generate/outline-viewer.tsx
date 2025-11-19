"use client";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Loader2,
  ArrowBigRight,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useGenerationStore } from "@/lib/store/generation-store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PLAN_CONFIG } from "@/lib/config/plan";
import { BaseDropdown } from "../base/dropdown";
import { baseLayouts, imageLayouts } from "@/lib/registry/layout";

interface Slide {
  slideHeading: string;
  layoutType: string;
  pointers: string[];
}

const loadingMessages = [
  "Analyzing your requirements...",
  "Structuring your presentation...",
  "Crafting compelling content...",
  "Organizing key points...",
  "Polishing the outline...",
  "Almost there...",
];

export function OutlineViewer({ plan }: { plan: "free" | "pro" | "basic" }) {
  const router = useRouter();
  const result = useGenerationStore((s) => s.result);
  const slidesCount = useGenerationStore((s) => s.slidesCount);
  const prepareForLLM = useGenerationStore((s) => s.prepareForLLM);
  const [localSlides, setLocalSlides] = useState<Slide[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [imagePreference, setImagePreference] = useState<"ai" | "stock">("ai");

  const planConfig = PLAN_CONFIG[plan];

  const layoutOptions = planConfig.canGenerateImage
    ? [...baseLayouts, ...imageLayouts]
    : baseLayouts;

  useEffect(() => {
    if (!result) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [result]);

  useEffect(() => {
    if (result && Array.isArray(result)) {
      setLocalSlides(result);
    }
  }, [result]);

  const calculateImageCount = (slides: Slide[]) => {
    return slides.reduce((total, slide) => {
      if (slide.layoutType === "two-media-paragraph") {
        return total + 2;
      } else if (imageLayouts.includes(slide.layoutType)) {
        return total + 1;
      }
      return total;
    }, 0);
  };

  const handleLayoutChange = (slideIndex: number, newLayout: string) => {
    const testSlides = localSlides.map((slide, idx) =>
      idx === slideIndex ? { ...slide, layoutType: newLayout } : slide
    );

    const imageCount = calculateImageCount(testSlides);

    if (imageCount > planConfig.maxImagePerPresentation) {
      toast.error(
        `Your ${plan} plan allows a maximum of ${planConfig.maxImagePerPresentation} images. This layout would require ${imageCount} images.`
      );
      return;
    }

    setLocalSlides(testSlides);
  };

  const handleHeadingChange = (slideIndex: number, newHeading: string) => {
    setLocalSlides((prev) =>
      prev.map((slide, idx) =>
        idx === slideIndex ? { ...slide, slideHeading: newHeading } : slide
      )
    );
  };

  const handlePointerChange = (
    slideIndex: number,
    pointerIndex: number,
    newText: string
  ) => {
    setLocalSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx === slideIndex) {
          const newPointers = [...slide.pointers];
          newPointers[pointerIndex] = newText;
          return { ...slide, pointers: newPointers };
        }
        return slide;
      })
    );
  };

  const addPointer = (slideIndex: number) => {
    setLocalSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx === slideIndex) {
          return { ...slide, pointers: [...slide.pointers, "New point"] };
        }
        return slide;
      })
    );
  };

  const deletePointer = (slideIndex: number, pointerIndex: number) => {
    setLocalSlides((prev) =>
      prev.map((slide, idx) => {
        if (idx === slideIndex) {
          const newPointers = slide.pointers.filter(
            (_, i) => i !== pointerIndex
          );
          return { ...slide, pointers: newPointers };
        }
        return slide;
      })
    );
  };

  const deleteSlide = (slideIndex: number) => {
    if (localSlides.length <= 1) {
      toast.error("You need at least one slide");
      return;
    }
    setLocalSlides((prev) => prev.filter((_, idx) => idx !== slideIndex));
    toast.success("Slide deleted");
  };

  const addNewSlide = () => {
    if (localSlides.length >= planConfig.maxSlidesPerPresentation) {
      toast.error(
        `Your ${plan} plan allows a maximum of ${planConfig.maxSlidesPerPresentation} slides per presentation.`
      );
      return;
    }

    if (localSlides.length >= slidesCount) {
      toast.error(
        `You opted to generate ${slidesCount} slides. You can only have ${slidesCount} slides.`
      );
      return;
    }

    const newSlide: Slide = {
      slideHeading: "New Slide",
      layoutType: "main-pointer",
      pointers: ["Add your first point here"],
    };

    setLocalSlides((prev) => [...prev, newSlide]);
    toast.success("New slide added");
  };

  const handleCreatePresentation = () => {
    useGenerationStore.getState().setResult(localSlides);
    useGenerationStore.getState().setImagePreference?.(imagePreference);
    const id = useGenerationStore.getState().id;
    prepareForLLM();

    console.log(useGenerationStore.getState().processedOutline);
    console.log(useGenerationStore.getState().imagePreference);
    router.push(`/docs/${id}`);
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mx-auto" />
          <div>
            <p className="text-white text-xl font-semibold">
              Crafting your presentation
            </p>
            <p className="text-zinc-400 text-sm mt-1">
              {loadingMessages[messageIndex]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8 justify-between">
          <div className="flex gap-3 items-center">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">
                  Slides Outline
                </h1>
                <span className="text-sm text-zinc-500">
                  {localSlides.length} /{" "}
                  {Math.min(slidesCount, planConfig.maxSlidesPerPresentation)}{" "}
                  slides
                </span>
              </div>
              <p className="text-zinc-600 text-sm">
                Click on any text to edit it
              </p>
            </div>
          </div>

          <Button
            className="cursor-pointer hover:opacity-80 transition-colors hover:text-zinc-700 text-zinc-900 rounded-lg"
            size="lg"
            onClick={() => {
              router.replace("/create");
              useGenerationStore.getState().setResult(null);
            }}
          >
            Go back
          </Button>
        </div>

        {localSlides.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mx-auto" />
              <div>
                <p className="text-white text-lg font-medium">
                  Building your slides
                </p>
                <p className="text-zinc-400 text-sm">
                  This may take a few moments...
                </p>
              </div>
            </div>
          </div>
        ) : (
          localSlides.map((slide, index) => (
            <div
              key={`slide-${index}`}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all relative group/slide"
            >
              {localSlides.length > 1 && (
                <button
                  onClick={() => deleteSlide(index)}
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover/slide:opacity-100 transition-all hover:scale-110"
                  title="Delete slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                      SLIDE {index + 1}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={slide.slideHeading}
                    onChange={(e) => handleHeadingChange(index, e.target.value)}
                    className="text-xl font-semibold text-white leading-tight bg-transparent border-none outline-none focus:ring-2 focus:ring-cyan-500/50 rounded px-2 py-1 w-full"
                    placeholder="Slide heading..."
                  />
                </div>

                <div className="min-w-[200px] text-zinc-400">
                  <BaseDropdown
                    label="Layout"
                    options={layoutOptions.map((layout) => ({
                      label: layout.replace(/-/g, " "),
                      value: layout,
                    }))}
                    value={slide.layoutType}
                    onChange={(val) => handleLayoutChange(index, val as string)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {slide.pointers.map((pointer: string, pointerIdx: number) => (
                  <div
                    key={pointerIdx}
                    className="flex gap-3 text-zinc-300 group/pointer"
                  >
                    <span className="text-cyan-400 mt-1">•</span>
                    <textarea
                      value={pointer}
                      onChange={(e) => {
                        handlePointerChange(index, pointerIdx, e.target.value);
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      className="flex-1 leading-relaxed text-sm bg-transparent border-none outline-none focus:ring-2 focus:ring-cyan-500/50 rounded px-2 py-1 resize-none overflow-hidden"
                      placeholder="Pointer text..."
                      style={{ height: "auto" }}
                      ref={(el) => {
                        if (el) {
                          el.style.height = "auto";
                          el.style.height = el.scrollHeight + "px";
                        }
                      }}
                    />
                    {slide.pointers.length > 1 && (
                      <button
                        onClick={() => deletePointer(index, pointerIdx)}
                        className="opacity-0 group-hover/pointer:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => addPointer(index)}
                  className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 ml-6 mt-2 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add point
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs text-zinc-500">
                    Layout:{" "}
                    <span className="text-zinc-400 font-medium">
                      {slide.layoutType}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        {localSlides.length > 0 && (
          <div className="space-y-4 pt-4">
            {localSlides.length <
              Math.min(slidesCount, planConfig.maxSlidesPerPresentation) && (
              <button
                onClick={addNewSlide}
                className="w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 font-semibold py-4 px-6 rounded-xl transition-all border border-zinc-800 hover:border-cyan-500/50 group"
              >
                <div className="bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-full p-1 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                Add New Slide
              </button>
            )}

            <div className="flex gap-3 items-end">
              {calculateImageCount(localSlides) > 0 && (
                <BaseDropdown
                  className="bg-white"
                  label="Preferred image source"
                  tooltip="Choose your image source"
                  options={[
                    { label: "AI-Generated Images", value: "ai" },
                    { label: "Stock Images", value: "stock" },
                  ]}
                  value={imagePreference}
                  onChange={(val) => setImagePreference(val as "ai" | "stock")}
                />
              )}

              <Button
                onClick={handleCreatePresentation}
                variant={"default"}
                className={`${
                  calculateImageCount(localSlides) > 0 ? "flex-1" : "w-full"
                }`}
              >
                Create presentation
                <ArrowBigRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

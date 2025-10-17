"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Loader2 } from "lucide-react";
import { useGenerationStore } from "@/lib/store/generation-store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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

export function OutlineViewer() {
  const router = useRouter();
  const result = useGenerationStore((s) => s.result);
  const [localSlides, setLocalSlides] = useState<Slide[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);

  const layoutOptions = [
    "main-pointer",
    "heading-paragraph",
    "two-column",
    "three-sections",
    "title",
    "chart-with-title",
    "chart-comparison",
    "image-caption",
    "four-quadrants",
    "header-three-cards",
    "big-number",
  ];

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

  const handleLayoutChange = (slideIndex: number, newLayout: string) => {
    setLocalSlides((prev) =>
      prev.map((slide, idx) =>
        idx === slideIndex ? { ...slide, layoutType: newLayout } : slide
      )
    );
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
              </div>
              <p className="text-zinc-600 text-sm">
                Slide would follow the outline mentioned
              </p>
            </div>
          </div>

          <Button
            className="cursor-pointer hover:opacity-80 transition-colors hover:text-zinc-700 text-zinc-900 rounded-lg"
            size={"lg"}
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
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                      SLIDE {index + 1}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white leading-tight">
                    {slide.slideHeading}
                  </h2>
                </div>

                <div className="relative group">
                  <select
                    value={slide.layoutType}
                    onChange={(e) => handleLayoutChange(index, e.target.value)}
                    className="appearance-none bg-zinc-800 text-zinc-300 text-xs font-medium px-3 py-2 pr-8 rounded-lg border border-zinc-700 hover:border-zinc-600 focus:outline-none focus:border-cyan-500 cursor-pointer transition-colors"
                  >
                    {layoutOptions.map((layout) => (
                      <option key={layout} value={layout}>
                        {layout}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                {slide.pointers.map((pointer: string, pointerIdx: number) => (
                  <div key={pointerIdx} className="flex gap-3 text-zinc-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="flex-1 leading-relaxed text-sm">
                      {pointer}
                    </span>
                  </div>
                ))}
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
          <div className="flex gap-3 pt-4">
            <button
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
              onClick={() => {
                const id = useGenerationStore.getState().id;

                router.push(`/docs/${id}`);
              }}
            >
              Create Presentation →
            </button>
            <button
              onClick={() => {
                console.log(useGenerationStore.getState().result);
              }}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-zinc-700"
            >
              Refine Outline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

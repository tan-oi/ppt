import { SLIDE_CONFIG } from "@/lib/config/slide";
import { cn } from "@/lib/utils";
import { ChevronLeft, X, ChevronRight } from "lucide-react";
import { WidgetWrapper } from "./widget-wrapper";

import { Button } from "./ui/button";

export function PresentationModeView({
  currentSlide,
  currentSlideIndex,
  slides,
  pptTheme,
  onExit,
  onNext,
  onPrev,
}: {
  currentSlide: any;
  currentSlideIndex: number;
  slides: any[];
  pptTheme: string;
  onExit: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-9999 bg-black flex items-center justify-center",
        pptTheme && pptTheme !== "starter" ? pptTheme : "font-sans"
      )}
    >
      <Button
        onClick={onExit}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
        title="Exit full screen"
      >
        <X size={24} className="text-red-500" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
        <span className="text-white text-sm">
          {currentSlideIndex + 1} / {slides.length}
        </span>
      </div>

      {currentSlideIndex > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
      )}

      {currentSlideIndex < slides.length - 1 && (
        <button
          onClick={onNext}
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

"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { Play } from "lucide-react";

export function Present() {
  const setPresentationmode = useUIStore((s) => s.setPresentationMode);
  const setCurrentSlideIndex = useUIStore((s) => s.setCurrentSlideIndex);

  const deselect = useUIStore((s) => s.deselectWidgetAndAddData);

  const handlePresent = () => {
    deselect();
    setCurrentSlideIndex(0);
    setPresentationmode(true);
  };
  return (
    <>
      <button
        data-widget-interactive
        className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors"
        onClick={handlePresent}
      >
        <Play size={18} className="text-zinc-400" />
        <span className="text-sm text-zinc-300">Present</span>
      </button>
    </>
  );
}

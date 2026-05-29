import { ThemeSelector } from "./theme-selector";
import { InsertElements } from "./insert-elements";
import { SlideManager } from "./slide-manager";
import { Present } from "./present-ppt";

export function DockBase() {
  return (
    <div className="font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-zinc-900 backdrop-blur-lg rounded-lg transition-all border border-white/10 shadow-2xl px-1 py-1 flex items-center gap-0.5">
        <ThemeSelector />

        <InsertElements />

        <SlideManager />
        <Present />
        {/* <ExportPdf /> */}
      </div>
    </div>
  );
}

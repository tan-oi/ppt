// "use client";
// import { createPortal } from "react-dom";
// import { useEffect, useState } from "react";
// import BaseToolbar from "./ui/base-toolbar";
// import { FontSizeDropDown } from "./toolbar/font-selector";
// import { Separator } from "./ui/separator";
// import { ColorSelector } from "./toolbar/color-selector";
// import { AlignSelector } from "./toolbar/align-selector";
// import { TextFormatting } from "./toolbar/text-formatting";
// import { WidgetOptions } from "./toolbar/widget-options";
// import { useUIStore } from "@/lib/store/ui-store";

// export function Toolbar() {
//   const [mounted, setMounted] = useState(false);
//   const toolbarOpen = useUIStore((s) => s.toolbarOpen);
//   const editBuffer = useUIStore((s) => s.editBuffer);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted || !toolbarOpen) {
//     return null;
//   }

//   return createPortal(
//     <div className="relative text-white flex items-center justify-center z-[9999] pointer-events-none">
//     <div className="pointer-events-auto h-2/3 rounded" data-toolbar>
//         <div className="p-2 mb-2 bg-muted/60 backdrop-blur-lg rounded-xl transition-all shadow-md duration-300">
//           <div className="flex items-center gap-2 text-white">
//             <FontSizeDropDown />

//           <ColorSelector />
//             <AlignSelector />
//             <TextFormatting />
//             <WidgetOptions />
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import BaseToolbar from "./ui/base-toolbar";
import { FontSizeDropDown } from "./toolbar/font-selector";
import { Separator } from "./ui/separator";
import { ColorSelector } from "./toolbar/color-selector";
import { AlignSelector } from "./toolbar/align-selector";
import { TextFormatting } from "./toolbar/text-formatting";
import { WidgetOptions } from "./toolbar/widget-options";
import { useUIStore } from "@/lib/store/ui-store";

export function Toolbar() {
  const [mounted, setMounted] = useState(false);
  const toolbarOpen = useUIStore((s) => s.toolbarOpen);
  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const editBuffer = useUIStore((s) => s.editBuffer);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !toolbarOpen || !selectedWidget?.data.position) {
    return null;
  }

  const { position } = selectedWidget.data;

  const toolbarHeight = 40;
  const toolbarOffset = 20;

  const toolbarStyle = {
    position: "fixed" as const,
    left: `${position.centerX}px`,
    top: `${position.widgetY - toolbarHeight - toolbarOffset}px`,
    transform: "translateX(-50%)",
    zIndex: 9999,
  };

  return createPortal(
    <div className="pointer-events-none" style={toolbarStyle}>
      <div className="pointer-events-auto h-2/3 rounded" data-toolbar>
        <div className="p-1 mb-2 bg-muted/60 backdrop-blur-lg rounded-xl transition-all shadow-md duration-300">
          <div className="flex items-center gap-2 text-foreground">
            <FontSizeDropDown />
            <ColorSelector />
            <AlignSelector />
            <TextFormatting />
            <WidgetOptions />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

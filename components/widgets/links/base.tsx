interface ButtonLinkWidgetProps {
  id: string;
  slideId: string;
  text?: string;
  url?: string;
  variant?: "filled" | "outline" | "text";
  color?: string;
  showIcon?: boolean;
  isEditable?: boolean;
  className?: string;
}

import { ExternalLink } from "lucide-react";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

export function ButtonLinkWidget({
  id,
  slideId,
  text = "New Link",
  url = "holy.so",
  variant = "filled",
  color = "#3B82F6",
  showIcon = true,
}: ButtonLinkWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);
  const editBuffer = useUIStore((s) => s.editBuffer);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer?.widgetData
      : {
          url,
          text,
          variant,
          color,
          showIcon,
        };

  // useEffect(() => {
  //   if (!url) {
  //     const t = setTimeout(() => {
  //       handleClick({
  //         widgetType: "link",
  //         payload: { text, url, variant, color, showIcon },
  //       });
  //     }, 50);
  //     return () => clearTimeout(t);
  //   }
  // }, [url, handleClick]);

  if (!url) {
    console.log(url);
    return (
      <div
        ref={widgetRef}
        data-widget
        className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer"
      >
        <div className="text-center p-4">
          <ExternalLink className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-sm text-gray-600 font-medium">
            Add a link in toolbar
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Toolbar opens automatically
          </p>
        </div>
      </div>
    );
  }

  const getButtonStyles = () => {
    const base =
      "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all cursor-pointer";
    switch (currentData.variant) {
      case "filled":
        return `${base} text-white hover:opacity-90`;
      case "outline":
        return `${base} bg-transparent border-2 hover:bg-opacity-10`;
      case "text":
        return `${base} bg-transparent hover:underline px-2`;
      default:
        return base;
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!url) return;

    const target =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={widgetRef}
      data-widget
      className="w-full h-full flex items-center justify-center p-4"
      onClick={() =>
        handleClick({
          widgetType: "link",
          data: {
            variant: currentData.variant,
            text: currentData.text,
            color: currentData.color,
            url: currentData.url,
            showIcon: currentData.showIcon,
          },
        })
      }
    >
      <button
        className={getButtonStyles()}
        style={{
          backgroundColor:
            currentData.variant === "filled"
              ? currentData.color
              : "transparent",
          borderColor:
            currentData.variant === "outline"
              ? currentData.color
              : "transparent",
          color: currentData.variant === "filled" ? "white" : currentData.color,
        }}
        onClick={handleLinkClick}
      >
        {currentData.text}
        {showIcon && <ExternalLink size={16} />}
      </button>
    </div>
  );
}

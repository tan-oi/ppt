//add how to edit + label + add its own type in toolbar and store.

import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import * as LucideIcons from "lucide-react";

interface IconWidgetProps {
  id: string;
  slideId: string;

  iconName: string;
  label?: string;
  iconSize?: number;
  iconColor?: string;
  showLabel?: boolean;
  labelPosition?: "bottom" | "right" | "top" | "left";

  isEditable?: boolean;
  className?: string;
}

export function IconWidget({
  id,
  slideId,

  isEditable,
  className,
  iconName,
  label,
  iconSize,
  iconColor,
  showLabel,
  labelPosition,
}: IconWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

  const IconComponent = (LucideIcons as any)[iconName];

  const getFlexDirection = () => {
    switch (labelPosition) {
      case "bottom":
        return "flex-col";
      case "top":
        return "flex-col-reverse";
      case "right":
        return "flex-row";
      case "left":
        return "flex-row-reverse";
      default:
        return "flex-col";
    }
  };

  const isVertical = labelPosition === "top" || labelPosition === "bottom";
  const alignItems = isVertical ? "items-center" : "items-center";
  const gap = isVertical ? "gap-2" : "gap-3";

  return (
    <div
      className="w-full h-full"
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          widgetType: "text",
        });
      }}
    >
      <div
        className={`w-full h-full flex ${getFlexDirection()} ${alignItems} ${gap} justify-center ${className}`}
      >
        {IconComponent ? (
          <IconComponent size={iconSize} color={iconColor} strokeWidth={2} />
        ) : (
          <LucideIcons.HelpCircle
            size={iconSize}
            color="#9CA3AF"
            strokeWidth={2}
          />
        )}

        {showLabel && label && (
          <span
            className="text-sm font-medium text-gray-700"
            style={{ color: iconColor }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

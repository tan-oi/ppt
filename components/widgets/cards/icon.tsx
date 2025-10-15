import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
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
  const selectedWidget = useUIStore((s) => s.selectedWidget?.id === id);
  const editBuffer = useUIStore((s) => s.editBuffer);

  const currentData =
    selectedWidget && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          label,
          iconName,
          iconColor,
          showLabel,
          labelPosition,
          iconSize,
        };

  const IconComponent = (LucideIcons as any)[currentData.iconName];

  const getFlexDirection = () => {
    switch (currentData.labelPosition) {
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

  const isVertical =
    currentData.labelPosition === "top" ||
    currentData.labelPosition === "bottom";
  const alignItems = isVertical ? "items-center" : "items-center";
  const gap = isVertical ? "gap-2" : "gap-3";

  return (
    <div
      className="w-full h-full backdrop-blur-xl rounded border-white"
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          widgetType: "icon",
          data: {
            label: currentData.label,
            showLabel: currentData.showLabel,
            labelPosition: currentData.labelPosition,
            iconColor: currentData.iconColor,
            iconSize: currentData.iconSize,
            iconName: currentData.iconName,
          },
        });
      }}
    >
      <div
        className={`w-full h-full flex ${getFlexDirection()} ${alignItems} ${gap} justify-center ${className}`}
      >
        {IconComponent ? (
          <IconComponent
            size={currentData.iconSize}
            color={currentData.iconColor}
            strokeWidth={2}
          />
        ) : (
          <LucideIcons.HelpCircle
            size={currentData.iconSize}
            color="#9CA3AF"
            strokeWidth={2}
          />
        )}

        {currentData.showLabel && currentData.label && (
          <span
            className="text-sm font-medium text-gray-700"
            style={{ color: currentData.iconColor }}
          >
            {currentData.label}
          </span>
        )}
      </div>
    </div>
  );
}

import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

interface DividerWidgetProps {
  id: string;
  slideId: string;
  style?: "solid" | "dashed" | "dotted";
  thickness?: number;
  color?: string;
  orientation?: "horizontal" | "vertical";
}

export const DividerWidget: React.FC<DividerWidgetProps> = ({
  id,
  slideId,
  style = "dashed",
  thickness = 2,
  color = "#fff",
  orientation = "vertical",
}) => {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);
  const editBuffer = useUIStore((s) => s.editBuffer);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : { style, thickness, color, orientation };

  const isHorizontal = currentData.orientation === "horizontal";

  return (
    <div
      className="h-full w-full"
      ref={widgetRef}
      onClick={() => {
        handleClick({
          widgetType: "divider",
          data: {
            style: currentData.style,
            thickness: currentData.thickness,
            color: currentData.color,
            orientation: currentData.orientation,
          },
        });
      }}
      data-widget
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <hr
        style={{
          width: isHorizontal ? "100%" : `${currentData.thickness}px`,
          height: isHorizontal ? `${currentData.thickness}px` : "100%",

          border: "none",
          borderTop: isHorizontal
            ? `${currentData.thickness}px ${currentData.style} ${currentData.color}`
            : "none",
          borderLeft: !isHorizontal
            ? `${currentData.thickness}px ${currentData.style} ${currentData.color}`
            : "none",
          margin: 0,
        }}
      />
    </div>
  );
};

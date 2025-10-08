import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

interface DividerWidgetProps {
  id: string;
  slideId: string;
  style?: "solid" | "dashed" | "dotted";
  thickness?: number;
  color?: string;
  width?: string;
  orientation?: "horizontal" | "vertical";
}

export const DividerWidget: React.FC<DividerWidgetProps> = ({
  id,
  slideId,
  style = "dashed",
  thickness = 2,
  color = "#fff",
  width = "100%",
  orientation = "vertical",
}) => {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const isSelected = selectedWidget?.id === id;
  const editBuffer = useUIStore((s) => s.editBuffer);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : { style, thickness, color, width, orientation };

  const isHorizontal = currentData.orientation === "horizontal";
  console.log(currentData);

  return (
    <div
      className="h-full"
      ref={widgetRef}
      onClick={() => {
        handleClick({
          widgetType: "divider",
          payload: {
            style: currentData.style,
            thickness: currentData.thickness,
            color: currentData.color,
            width: currentData.width,
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
          width: isHorizontal
            ? currentData.width
            : `${currentData.thickness}px`,
          height: isHorizontal
            ? `${currentData.thickness}px`
            : currentData.width,
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

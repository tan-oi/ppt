import { usePresentationStore } from "@/lib/store/presentation-store";
import { DraggableResizableWrapper } from "./wrapper";
import { WidgetRegistry } from "@/lib/registry/widget";
import { useUIStore } from "@/lib/store/ui-store";

export function WidgetWrapper({
  widgetId,
  slideScale,
  slideId,
  isPresenting,
}: {
  widgetId: string;
  slideScale: number;
  slideId: string;
  isPresenting: boolean;
}) {
  const widget = usePresentationStore((s) => s.getWidget(slideId, widgetId));

  const selectedWidget = useUIStore((s) => s.selectedWidget?.id === widgetId);

  if (!widget) {
    console.warn(`Widget ${widgetId} not found in store`);
    return null;
  }

  const { widgetType, data: widgetData, position } = widget;

  const widgetInfo = WidgetRegistry[widgetType];
  if (!widgetInfo) {
    console.warn(`Widget type ${widgetType} not found in registry`);
    return null;
  }

  const WidgetComponent = widgetInfo.component;

  return (
    <DraggableResizableWrapper
      x={position.x}
      y={position.y}
      height={widgetType === "image" ? position.height : null}
      width={position.width}
      scale={slideScale}
      selected={selectedWidget}
      id={widgetId}
      slideId={slideId}
      editable={!isPresenting}
    >
      <WidgetComponent
        styles={{
          x: position.x,
          y: position.y,
          height: position.height,
          width: position.width,
          content: widgetData?.content,
        }}
        editable={!isPresenting}
        id={widgetId}
        slideId={slideId}
        {...widgetData}
      />
    </DraggableResizableWrapper>
  );
}

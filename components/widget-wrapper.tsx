import { usePresentationStore } from "@/lib/store/presentation-store";
import { DraggableResizableWrapper } from "./wrapper";
import { WidgetRegistry } from "@/lib/registry/widget";

export function WidgetWrapper({
  widgetId,
  slideScale,
}: {
  widgetId: string;
  slideScale: number;
}) {
  const widget = usePresentationStore.getState().getWidget(widgetId);

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
      height={position.height}
      width={position.width}
      scale={slideScale}
    >
      <WidgetComponent
        styles={{
          x: position.x,
          y: position.y,
          height: position.height,
          width: position.width,
          content: widgetData.content,
        }}
        id={widgetId}
        {...widgetData}
      />
    </DraggableResizableWrapper>
  );
}

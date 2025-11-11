import { useEffect, useState } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { DraggableResizableWrapper } from "./wrapper";
import { useUIStore } from "@/lib/store/ui-store";

import { WidgetMetadata } from "@/lib/core/widget-metadata";
import { loadWidgetComponent } from "@/lib/core/widget-loader";

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

  const [WidgetComponent, setWidgetComponent] = useState<any>(null);

  useEffect(() => {
    if (widget?.widgetType) {
      loadWidgetComponent(widget.widgetType)
        .then((comp) => setWidgetComponent(() => comp))
        .catch((err) =>
          console.error(`Failed to load widget ${widget.widgetType}`, err)
        );
    }
  }, [widget?.widgetType]);

  if (!widget) {
    console.warn(`Widget ${widgetId} not found in store`);
    return null;
  }

  const { widgetType, data: widgetData, position } = widget;
  const widgetInfo = WidgetMetadata[widgetType as keyof typeof WidgetMetadata];

  if (!widgetInfo) {
    console.warn(`Widget type ${widgetType} not found in metadata`);
    return null;
  }

  if (!WidgetComponent) return null;

  return (
    <DraggableResizableWrapper
      x={position.x}
      y={position.y}
      height={
        widgetType === "image" || widgetType === "divider"
          ? position.height
          : null
      }
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

import { useEffect, useState } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { DraggableResizableWrapper } from "./wrapper";
import { useUIStore } from "@/lib/store/ui-store";

import { WidgetMetadata, heightRequired } from "@/lib/core/widget-metadata";
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

  const type = widget?.widgetType;

  useEffect(() => {
    if (type) {
      loadWidgetComponent(type)
        .then((comp) => setWidgetComponent(() => comp))
        .catch((err) => console.error(`Failed to load widget ${type}`, err));
    }
  }, [type]);
  if (!widget) {
    console.warn(`Widget ${widgetId} not found in store`);
    return null;
  }

  const { widgetType, data: widgetData, position } = widget;
  const widgetInfo = WidgetMetadata[type as keyof typeof WidgetMetadata];

  if (!widgetInfo) {
    console.warn(`Widget type ${type} not found in metadata`);
    return null;
  }

  if (!WidgetComponent) return null;
  console.log(type);
  return (
    <DraggableResizableWrapper
      x={position.x}
      y={position.y}
      height={heightRequired(type as string) ? position.height : null}
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

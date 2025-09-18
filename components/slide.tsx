import { SLIDE_CONFIG } from "@/lib/config/slide";
import { LayoutRegistry } from "@/lib/registry/layout";
import { createWidgetsFromSlots } from "./slideUtils";
import { WidgetRegistry } from "@/lib/registry/widget";
import { DraggableResizableWrapper } from "./wrapper";

export function Slide({
  data,
  id,
  slideScale,
}: {
  data: any;
  id: string;
  slideScale: number;
}) {
  const layout = LayoutRegistry[data.layoutId];

  const slots = layout.slots;

  const widgets = createWidgetsFromSlots(
    slots,
    SLIDE_CONFIG.width,
    SLIDE_CONFIG.height,
    SLIDE_CONFIG.columns,
    SLIDE_CONFIG.rows
  );
  return (
    <>
      <div
        style={{
          width: SLIDE_CONFIG.width * slideScale,
          height: SLIDE_CONFIG.height * slideScale,
          borderRadius: "10px",
          paddingInline: "14px",
          paddingBlock: "10px",
          background: "black", //changeable
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${slideScale})`,
            transformOrigin: "top left",
            width: SLIDE_CONFIG.width,
            height: SLIDE_CONFIG.height,
            transition: "transform 0.5s ease-out",
          }}
          className="relative"
        >
          {widgets.map((widget, i) => {
            console.log(widget);
            const slotContent = data.content[widget.id];
            if (!slotContent) return null;

            const { widgetType, data: widgetData, id: widgetId } = slotContent;

            const widgetInfo = WidgetRegistry[widgetType];
            if (!widgetInfo) return null;

            const WidgetComponent = widgetInfo.component;

            return (
              <DraggableResizableWrapper
                key={i}
                x={widget.x}
                y={widget.y}
                height={widget.height}
                width={widget.width}
                scale={slideScale}
              >
                <WidgetComponent
                  styles={{
                    x: widget.x,
                    y: widget.y,
                    height: widget.height,
                    width: widget.width,
                    content: widget.content,
                  }}
                  id={widgetId}
                  {...widgetData}
                />
              </DraggableResizableWrapper>
            );
          })}
        </div>
      </div>
    </>
  );
}

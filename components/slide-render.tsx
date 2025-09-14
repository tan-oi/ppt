import React from "react";

interface Widget {
  id: string;
  type: "text" | "image" | "chart";
  content: any;
  x: number;
  y: number;
  width: number;
  height: number;
  isSlot?: boolean;
}

interface Props {
  widgets: Widget[];
  containerWidth: number;
  containerHeight: number;
  // slideScale: number;
}

const SlideRenderer: React.FC<Props> = ({
  widgets,
  containerWidth,
  containerHeight,
  // slideScale,
}) => {
  console.log(widgets)
  return (
    <div
      style={{
        width: containerWidth,
        height: containerHeight,
        position: "relative",
        // transform: `scale(${slideScale})`,
        transformOrigin: "top left",
        
      }}

      className="grid grid-cols-24 grid-rows-24 overflow-hidden"
    >
      {widgets.map((widget) => (
        <div
          key={widget.id}
          style={{
            position: "absolute",
            top: widget.y,
            left: widget.x,
            width: widget.width,
            height: widget.height,
            border: widget.isSlot ? "1px dashed #888" : "1px solid #000",
            padding: 4,
            boxSizing: "border-box",
            color : "white"
          }}
        >
          {widget.type === "text"
            ? widget.content || widget.type.toUpperCase()
            : null}
          {widget.type === "image" ? (
            <img
              src={widget.content}
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SlideRenderer;

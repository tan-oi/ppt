import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Rnd } from "react-rnd";

export function DraggableResizableWrapper({
  x,
  y,
  width,
  height,
  children,
  scale,
  selected,
  id,
  slideId,
  editable,
}: {
  x: number;
  y: number;
  width: number;
  height: number | null;
  scale: number;
  selected: boolean;
  children: React.ReactNode;
  id: string;
  editable: boolean;
  slideId: string;
}) {
  const updateWidgetPosition = useUIStore((s) => s.updateWidgetPosition);
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height: height ?? "auto" });

  React.useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  React.useEffect(() => {
    setSize({ width, height: height ?? "auto" });
  }, [width, height]);

  // if (!editable) {
  //   return (
  //     <div
  //       style={{
  //         position: "absolute",
  //         left: `${x}px`,
  //         top: `${y}px`,
  //         width: width ? `${width}px` : "auto",
  //         height: height ? `${height}px` : "auto",
  //         pointerEvents: "auto",
  //       }}
  //     >
  //       {children}
  //     </div>
  //   );
  // }

  return (
    // <Rnd
    //   data-widget-interactive
    //   size={size}
    //   position={position}
    //   scale={scale}
    //   className={selected ? "ring-1 ring-secondary rounded" : ""}
    //   enableResizing={selected}
    //   disableDragging={!selected}
    //   bounds="parent"
    //   onDrag={(e, d) => {
    //     setPosition({ x: d.x, y: d.y });
    //   }}
    //   onDragStop={(e, d) => {
    //     updateWidgetPosition({
    //       x: Math.round(d.x),
    //       y: Math.round(d.y),
    //     });
    //   }}
    //   enableUserSelectHack={false}
    //   onResize={(e, direction, ref, delta, position) => {
    //     setPosition({ x: position.x, y: position.y });
    //     setSize({
    //       width: ref.offsetWidth,
    //       height: ref.offsetHeight,
    //     });
    //   }}
    //   onResizeStop={(e, direction, ref, delta, position) => {
    //     updateWidgetPosition({
    //       x: Math.round(position.x),
    //       y: Math.round(position.y),
    //       width: Math.round(ref.offsetWidth),
    //       height: Math.round(ref.offsetHeight),
    //     });
    //   }}
    // >
    //   {children}
    // </Rnd>

    <Rnd
      data-widget-interactive
      size={size}
      position={position}
      scale={scale}
      className={selected ? "ring-1 ring-secondary rounded" : ""}
      enableResizing={editable && selected}
      disableDragging={!editable || !selected}
      bounds="parent"
      onDrag={(e, d) => {
        if (!editable) return;
        setPosition({ x: d.x, y: d.y });
      }}
      onDragStop={(e, d) => {
        if (!editable) return;
        updateWidgetPosition({
          x: Math.round(d.x),
          y: Math.round(d.y),
        });
      }}
      enableUserSelectHack={false}
      onResize={(e, direction, ref, delta, position) => {
        if (!editable) return;
        setPosition({ x: position.x, y: position.y });
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!editable) return;
        updateWidgetPosition({
          x: Math.round(position.x),
          y: Math.round(position.y),
          width: Math.round(ref.offsetWidth),
          height: Math.round(ref.offsetHeight),
        });
      }}
    >
      {children}
    </Rnd>
  );
}

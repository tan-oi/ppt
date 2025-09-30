import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";

export function DraggableResizableWrapper({
  x,
  y,
  width,
  height,
  children,
  onDragStop,
  onResizeStop,
  scale,
  selected,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  selected: boolean;
  children: React.ReactNode;
  onDragStop?: (x: number, y: number) => void;
  onResizeStop?: (w: number, h: number, x: number, y: number) => void;
}) {
  return (
    <Rnd
      data-widget-interactive
      default={{
        x,
        y,
        width,
        height: "auto",
      }}
      scale={scale}
      className={selected ? "ring-1 ring-offset-1 ring-secondary rounded" : ""}
      enableResizing={selected}
      disableDragging={!selected}
      bounds="parent"
      onDragStop={(e, d) => {
        onDragStop?.(d.x, d.y);
      }}
      enableUserSelectHack={false}
      onResizeStop={(e, dir, ref, delta, pos) => {
        onResizeStop?.(ref.offsetWidth, ref.offsetHeight, pos.x, pos.y);
      }}
    >
      {children}
    </Rnd>
  );
}

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
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  children: React.ReactNode;
  onDragStop?: (x: number, y: number) => void;
  onResizeStop?: (w: number, h: number, x: number, y: number) => void;
}) {
  return (
    <Rnd
      default={{
        x,
        y,
        width,
        height : "auto",
      }}
      scale={scale}
      bounds="parent"
      onDragStop={(e, d) => {
        onDragStop?.(d.x, d.y);
      }}
      onResizeStop={(e, dir, ref, delta, pos) => {
        onResizeStop?.(ref.offsetWidth, ref.offsetHeight, pos.x, pos.y);
      }}
    >
      {children}
    </Rnd>
  );
}

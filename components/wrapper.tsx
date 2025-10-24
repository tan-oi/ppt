import { usePresentationStore } from "@/lib/store/presentation-store";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";
usePresentationStore;

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
  onDragStop?: (x: number, y: number) => void;
  onResizeStop?: (w: number, h: number, x: number, y: number) => void;
  id: string;
  editable: boolean;
  slideId: string;
}) {
  const updateWidgetPosition = usePresentationStore(
    (s) => s.updateWidgetPosition
  );

  if (!editable) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            width: width ? `${width}px` : "auto",
            height: height ? `${height}px` : "auto",
            pointerEvents: "auto",
          }}
        >
          {children}
        </div>
      </>
    );
  }

  return (
    <Rnd
      data-widget-interactive
      default={{
        x,
        y,
        width,
        height: height ?? "auto",
      }}
      scale={scale}
      className={selected ? "ring-1 ring-secondary rounded" : ""}
      enableResizing={selected}
      disableDragging={!selected}
      bounds="parent"
      onDragStop={(e, d) => {
        console.log(d.x, d.y);
        updateWidgetPosition(slideId, id, { x: d.x, y: d.y });
      }}
      enableUserSelectHack={false}
      onResizeStop={(e, direction, ref, delta, position) => {
        console.log(position.x, position.y, ref.offsetHeight, ref.offsetWidth);
        updateWidgetPosition(slideId, id, {
          x: position.x,
          y: position.y,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
      }}
    >
      {children}
    </Rnd>
  );
}

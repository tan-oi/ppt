"use client";

import { DndContext, useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";

export function DraggableButton() {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "draggable-btn",
      data: { type: "widget", slug: "paragraph" },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Drag me
    </Button>
  );
}

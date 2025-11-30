"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { useState, useRef, useCallback, useEffect } from "react";

type ResizeDirection = "se" | "ne" | "sw" | "nw" | "e" | "w" | "n" | "s";

export function DraggableResizableWrapper({
  x,
  y,
  width,
  height,
  children,
  scale = 1,
  selected,
  id,
  slideId,
  editable,
}: {
  x: number;
  y: number;
  width: number;
  height: number | null;
  scale?: number;
  selected: boolean;
  children: React.ReactNode;
  id: string;
  editable: boolean;
  slideId: string;
}) {
  const updateWidgetPosition = useUIStore((s: any) => s.updateWidgetPosition);
  const elementRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] =
    useState<ResizeDirection | null>(null);

  const dragStartPos = useRef({ x: 0, y: 0, elementX: 0, elementY: 0 });
  const resizeStartPos = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    elementX: 0,
    elementY: 0,
  });

 
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!editable || !selected || isResizing) return;

      const target = e.target as HTMLElement;
      if (target.closest(".resize-handle")) return;

      e.stopPropagation();
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        elementX: x,
        elementY: y,
      };
    },
    [editable, selected, isResizing, x, y]
  );

  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = (e.clientX - dragStartPos.current.x) / scale;
      const deltaY = (e.clientY - dragStartPos.current.y) / scale;

      const newX = dragStartPos.current.elementX + deltaX;
      const newY = dragStartPos.current.elementY + deltaY;

      if (elementRef.current) {
        elementRef.current.style.left = `${newX}px`;
        elementRef.current.style.top = `${newY}px`;
      }
    },
    [isDragging, scale]
  );

  const handleDragEnd = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = (e.clientX - dragStartPos.current.x) / scale;
      const deltaY = (e.clientY - dragStartPos.current.y) / scale;

      const newX = Math.round(dragStartPos.current.elementX + deltaX);
      const newY = Math.round(dragStartPos.current.elementY + deltaY);
      updateWidgetPosition({ x: newX, y: newY });
      setIsDragging(false);
    },
    [isDragging, scale, updateWidgetPosition]
  );

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      e.stopPropagation();
      e.preventDefault();

      if (!editable || !selected) return;

      setIsResizing(true);
      setResizeDirection(direction);

      const currentHeight = elementRef.current?.offsetHeight || height || 100;
      resizeStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        width: width,
        height: currentHeight,
        elementX: x,
        elementY: y,
      };
    },
    [editable, selected, width, height, x, y]
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return;

      e.preventDefault();

      const deltaX = (e.clientX - resizeStartPos.current.x) / scale;
      const deltaY = (e.clientY - resizeStartPos.current.y) / scale;

      let newWidth = resizeStartPos.current.width;
      let newHeight = resizeStartPos.current.height;
      let newX = resizeStartPos.current.elementX;
      let newY = resizeStartPos.current.elementY;

      if (resizeDirection.includes("e")) {
        newWidth = Math.max(50, resizeStartPos.current.width + deltaX);
      } else if (resizeDirection.includes("w")) {
        newWidth = Math.max(50, resizeStartPos.current.width - deltaX);
        newX =
          resizeStartPos.current.elementX +
          (resizeStartPos.current.width - newWidth);
      }

   
      if (resizeDirection.includes("s")) {
        newHeight = Math.max(50, resizeStartPos.current.height + deltaY);
      } else if (resizeDirection.includes("n")) {
        newHeight = Math.max(50, resizeStartPos.current.height - deltaY);
        newY =
          resizeStartPos.current.elementY +
          (resizeStartPos.current.height - newHeight);
      }

      if (elementRef.current) {
        elementRef.current.style.width = `${newWidth}px`;
        elementRef.current.style.height = `${newHeight}px`;
        elementRef.current.style.left = `${newX}px`;
        elementRef.current.style.top = `${newY}px`;
      }
    },
    [isResizing, resizeDirection, scale]
  );

  const handleResizeEnd = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return;

      const deltaX = (e.clientX - resizeStartPos.current.x) / scale;
      const deltaY = (e.clientY - resizeStartPos.current.y) / scale;

      let newWidth = resizeStartPos.current.width;
      let newHeight = resizeStartPos.current.height;
      let newX = resizeStartPos.current.elementX;
      let newY = resizeStartPos.current.elementY;

      if (resizeDirection.includes("e")) {
        newWidth = Math.max(50, resizeStartPos.current.width + deltaX);
      } else if (resizeDirection.includes("w")) {
        newWidth = Math.max(50, resizeStartPos.current.width - deltaX);
        newX =
          resizeStartPos.current.elementX +
          (resizeStartPos.current.width - newWidth);
      }

      if (resizeDirection.includes("s")) {
        newHeight = Math.max(50, resizeStartPos.current.height + deltaY);
      } else if (resizeDirection.includes("n")) {
        newHeight = Math.max(50, resizeStartPos.current.height - deltaY);
        newY =
          resizeStartPos.current.elementY +
          (resizeStartPos.current.height - newHeight);
      }
      updateWidgetPosition({
        x: Math.round(newX),
        y: Math.round(newY),
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      });

      setIsResizing(false);
      setResizeDirection(null);
    },
    [isResizing, resizeDirection, scale, updateWidgetPosition]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      document.body.style.cursor = "grabbing";
      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
        document.body.style.cursor = "";
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
      return () => {
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  const getCursor = (direction: ResizeDirection) => {
    const cursors: Record<ResizeDirection, string> = {
      se: "nwse-resize",
      nw: "nwse-resize",
      ne: "nesw-resize",
      sw: "nesw-resize",
      e: "ew-resize",
      w: "ew-resize",
      n: "ns-resize",
      s: "ns-resize",
    };
    return cursors[direction];
  };

  const resizeHandles: Array<{
    direction: ResizeDirection;
    style: React.CSSProperties;
  }> = [
    {
      direction: "se",
      style: {
        bottom: -4,
        right: -4,
        width: 12,
        height: 12,
        borderRadius: "50%",
      },
    },
    {
      direction: "ne",
      style: { top: -4, right: -4, width: 12, height: 12, borderRadius: "50%" },
    },
    {
      direction: "sw",
      style: {
        bottom: -4,
        left: -4,
        width: 12,
        height: 12,
        borderRadius: "50%",
      },
    },
    {
      direction: "nw",
      style: { top: -4, left: -4, width: 12, height: 12, borderRadius: "50%" },
    },
    { direction: "e", style: { top: 0, right: -4, width: 8, height: "100%" } },
    { direction: "w", style: { top: 0, left: -4, width: 8, height: "100%" } },
    { direction: "n", style: { top: -4, left: 0, width: "100%", height: 8 } },
    {
      direction: "s",
      style: { bottom: -4, left: 0, width: "100%", height: 8 },
    },
  ];

  return (
    <div
      ref={elementRef}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: height ? `${height}px` : "auto",
        cursor: isDragging
          ? "grabbing"
          : editable && selected
          ? "grab"
          : "default",
        userSelect: "none",
      }}
      className={selected ? "ring-2 ring-blue-500 rounded" : ""}
      onMouseDown={handleDragStart}
    >
      {children}

      {editable &&
        selected &&
        resizeHandles.map(({ direction, style }) => (
          <div
            key={direction}
            className="resize-handle"
            onMouseDownCapture={(e) => handleResizeStart(e, direction)}
            style={{
              position: "absolute",
              background: style.borderRadius ? "white" : "transparent",
              cursor: getCursor(direction),
              border: style.borderRadius
                ? "2px solid rgb(59, 130, 246)"
                : "none",
              boxShadow: style.borderRadius
                ? "0 2px 4px rgba(0,0,0,0.2)"
                : "none",
              zIndex: 9999,
              pointerEvents: "auto",
              ...style,
            }}
          />
        ))}
    </div>
  );
}

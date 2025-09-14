export interface Slot {
  id: string;
  type: "text" | "image" | "chart";
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

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
export const createWidgetsFromSlots = (
  slots: Slot[],
  containerWidth: number,
  containerHeight: number,
  columns: number,
  rows: number
): Widget[] => {
  const colWidth = containerWidth / columns;
  const rowHeight = containerHeight / rows;

  return slots.map((slot) => ({
    id: slot.id,
    type: slot.type,
    content: "",
    x: (slot.columnStart - 1) * colWidth,
    y: (slot.rowStart - 1) * rowHeight,
    width: (slot.columnEnd - slot.columnStart) * colWidth,
    height: (slot.rowEnd - slot.rowStart) * rowHeight,
    isSlot: true,
  }));
};

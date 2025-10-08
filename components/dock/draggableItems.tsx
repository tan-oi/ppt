import { useDraggable } from "@dnd-kit/core";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import React from "react";

export const DraggableMenuItem = React.memo(function DraggableMenuItem({
  element,
}: {
  element: any;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `draggable-${element.slug}`,
    data: {
      slug: element.slug,
      type: "widget",
      icon: element.icon,
      name: element.name,
    },
  });

  const Icon = element.icon;

  return (
    <DropdownMenuItem
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        w-full bg-transparent text-sm text-zinc-300
        cursor-grab active:cursor-grabbing
        hover:bg-zinc-500/20 hover:text-gray-50
        focus:bg-zinc-500/20 focus:text-gray-50
        transition-all
        ${isDragging ? "opacity-30" : "opacity-100"}
      `}
    >
      <Icon size={16} className="text-zinc-400 mr-2" />
      {element.name}
    </DropdownMenuItem>
  );
});

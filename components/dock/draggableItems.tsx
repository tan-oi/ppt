import { useDraggable } from "@dnd-kit/core";
import { Heading, ParkingSquareIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const elements = [
  {
    name: "Heading",
    id: "heading",
    slug: "heading",
    icon: Heading,
  },
  {
    name: "Paragraph",
    id: "paragraph",
    slug: "paragraph",
    icon: ParkingSquareIcon,
  },
];

// export function DraggableMenuItem({
//   element,
// }: {
//   element: (typeof elements)[0];
// }) {
//   const { attributes, listeners, setNodeRef, transform, isDragging } =
//     useDraggable({
//       id: `draggable-${element.slug}`,
//       data: {
//         slug: element.slug,
//         type: "widget",
//       },
//     });

//   const Icon = element.icon;

//   return (
//     <div className="relative w-full">
//       <DropdownMenuItem
//         className={`
//         w-full
//           bg-transparent text-sm text-zinc-300
//           cursor-pointer
//           active:cursor-grabbing
//           hover:bg-zinc-500/20 hover:text-gray-50
//           focus:bg-zinc-500/20 focus:text-gray-50
//           transition-all
//           ${isDragging ? "opacity-30" : "opacity-100"}
//         `}
//       >
//         <Icon size={16} className="text-zinc-400 mr-2" />
//         {element.name}
//       </DropdownMenuItem>

//       <div
//         ref={setNodeRef}
//         {...listeners}
//         {...attributes}
//         className="absolute left-0 top-0 w-full h-full cursor-grab active:cursor-grabbing"
//         style={{
//           transform: transform
//             ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//             : undefined,
//           zIndex: isDragging ? 9999 : 1,
//           pointerEvents: "auto",
//         }}
//       >
//         {isDragging && transform && (
//           <div className="fixed pointer-events-none left-0 top-0 z-[9999]">
//             <div className="w-80 bg-zinc-800/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-2xl border border-zinc-600 flex items-center gap-2">
//               <element.icon size={16} className="text-zinc-300" />
//               <span className="text-sm text-zinc-300">{element.name}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";

// Wrap the component in memo to prevent unnecessary re-renders
export const DraggableMenuItem = React.memo(function DraggableMenuItem({
  element,
}: {
  element: (typeof elements)[0];
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `draggable-${element.slug}`,
      data: {
        slug: element.slug,
        type: "widget",
      },
    });

  const Icon = element.icon;

  // Memoize the transform style to prevent recalculations
  const style = React.useMemo(
    () => ({
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      zIndex: isDragging ? 9999 : 1,
      pointerEvents: "auto" as const,
    }),
    [transform, isDragging]
  );

  return (
    <div className="relative w-full">
      <DropdownMenuItem
        className={`
        w-full
          bg-transparent text-sm text-zinc-300
          cursor-pointer
          active:cursor-grabbing
          hover:bg-zinc-500/20 hover:text-gray-50
          focus:bg-zinc-500/20 focus:text-gray-50
          transition-all
          ${isDragging ? "opacity-30" : "opacity-100"}
        `}
      >
        <Icon size={16} className="text-zinc-400 mr-2" />
        {element.name}
      </DropdownMenuItem>

      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="absolute left-0 top-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={style}
      >
        {isDragging && transform && (
          <div className="fixed pointer-events-none left-0 top-0 z-[9999]">
            <div className="w-80 bg-zinc-800/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-2xl border border-zinc-600 flex items-center gap-2">
              <Icon size={16} className="text-zinc-300" />
              <span className="text-sm text-zinc-300">{element.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

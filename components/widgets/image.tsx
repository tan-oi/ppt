"use client";

import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

interface ImageWidgetProps {
  imageUrl: string;
  alt?: string;
  objectFit?: "cover" | "contain" | "fill";
  id: string;
  slideId: string;
}

export function ImageWidget({
  imageUrl = "/placeholder-image.png",
  alt = "Slide image",
  objectFit = "cover",
  id,
  slideId,
}: ImageWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          imageUrl,
          alt,
          objectFit, 
        };

  return (
    <div
      className="w-full h-full relative overflow-hidden rounded-lg"
      data-widget
      ref={widgetRef}
      onClick={() =>
        handleClick({
          widgetType: "image",
          data: {
            imageUrl: currentData.imageUrl,
            alt: currentData.alt,
            objectFit: currentData.objectFit,
          },
        })
      }
    >
      <img
        src={currentData.imageUrl}
        alt={currentData.alt}
      loading="lazy"
        className="w-full h-full"
        style={{
          objectFit: currentData.objectFit,
        }}
      />

      {currentData.imageUrl === "/placeholder-image.png" && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/50 backdrop-blur-sm">
          <p className="text-zinc-400 text-sm">Click to add image</p>
        </div>
      )}
    </div>
  );
}

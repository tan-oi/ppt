interface ImageWidgetProps {
  imageUrl: string;
  alt?: string;
  objectFit?: "cover" | "contain" | "fill";
  id: string;
  imagePrompt?: string;

  slideId: string;
}

import { useEffect, useState } from "react";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
import { usePresentationStore } from "@/lib/store/presentation-store";

async function callImageAPI(prompt: string): Promise<string> {
  const res = await fetch("/api/image", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data.cloudinaryUrl;
}

export function ImageWidget({
  imageUrl,
  imagePrompt,
  alt = "Slide image",
  objectFit = "cover",
  id,
  slideId,
}: ImageWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);

  console.log(imageUrl);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          imageUrl,
          imagePrompt,
          alt,
          objectFit,
        };

  const [url, setUrl] = useState(currentData.imageUrl || null);
  const [state, setState] = useState<"idle" | "loading" | "error" | "done">(
    currentData.imageUrl ? "done" : currentData.imagePrompt ? "loading" : "idle"
  );

  console.log(state);
  useEffect(() => {
    if (!url && currentData.imagePrompt && state === "loading") {
      callImageAPI(currentData.imagePrompt)
        .then((generatedUrl) => {
          setUrl(generatedUrl);
          setState("done");

          const { updateWidget } = usePresentationStore.getState();
          updateWidget(slideId, id, {
            data: {
              ...currentData,
              imageUrl: generatedUrl,
            },
          });
        })
        .catch(() => {
          setState("error");
        });
    }
  }, [currentData.imagePrompt, url, state]);
  if (state === "loading") {
    return (
      <div
        ref={widgetRef}
        className="w-full h-full flex items-center justify-center bg-zinc-900/40 rounded-lg"
      >
        <p className="text-zinc-300 text-sm">Generating image…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        ref={widgetRef}
        className="w-full h-full flex items-center justify-center bg-red-900/40 rounded-lg"
      >
        <p className="text-red-300 text-sm">Image failed</p>
      </div>
    );
  }

  if (!url && !currentData.imagePrompt) {
    return (
      <div
        ref={widgetRef}
        className="w-full h-full flex items-center justify-center bg-zinc-800/40 rounded-lg"
      >
        <p className="text-zinc-400 text-sm">Click to add image</p>
      </div>
    );
  }

  return (
    <div
      ref={widgetRef}
      className="w-full h-full relative overflow-hidden rounded-lg"
      data-widget
      onClick={() =>
        handleClick({
          widgetType: "image",
          data: {
            imageUrl: currentData.imageUrl || url,
            alt: currentData.alt,
            objectFit: currentData.objectFit,
          },
        })
      }
    >
      <img
        src={currentData.imageUrl || url || "/placeholder-image.png"}
        alt={alt}
        className="w-full h-full"
        style={{ objectFit }}
        loading="lazy"
      />
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { useApiConfigStore } from "@/lib/store/guest-mode-store";
import {
  saveImageToLocal,
  getImageByWidget,
  getImageFromLocal,
} from "@/lib/local-db";

interface ImageWidgetProps {
  imageUrl: string;
  alt?: string;
  objectFit?: "cover" | "contain" | "fill";
  id: string;
  imagePrompt?: string;
  slideId: string;
  isGuestMode?: boolean;
  editable: boolean;
}

async function callImageAPI(
  prompt: string,
  replicateApiKey?: string,
  replicateModel?: string
): Promise<{ url: string; isLocal: boolean }> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (replicateApiKey) {
    headers["x-replicate-api-key"] = replicateApiKey;
  }
  if (replicateModel) {
    headers["x-replicate-model"] = replicateModel;
  }

  const res = await fetch("/api/image", {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || "Image generation failed");
  }

  return {
    url: data.isLocal ? data.imageData : data.cloudinaryUrl,
    isLocal: data.isLocal,
  };
}

export function ImageWidget({
  imageUrl,
  imagePrompt,
  alt = "Slide image",
  objectFit = "cover",
  id,
  isGuestMode = false,
  slideId,
  editable,
}: ImageWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);
  const config = useApiConfigStore((s) => s.config);
  const hasAttemptedRef = useRef(false);

  const getReplicateKey = () => {
    if (typeof window === "undefined") return "";
    return (
      localStorage.getItem("guest-replicate-key") ||
      config.replicateApiKey ||
      ""
    );
  };

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          imageUrl,
          imagePrompt,
          alt,
          objectFit,
        };

  const [url, setUrl] = useState<string | null>(currentData.imageUrl || null);
  const [state, setState] = useState<"idle" | "loading" | "error" | "done">(
    currentData.imageUrl
      ? "done"
      : currentData.imagePrompt && editable
      ? "loading"
      : "idle"
  );

  const loadImage = async () => {
    if (!editable || !currentData.imagePrompt || hasAttemptedRef.current) {
      return;
    }

    hasAttemptedRef.current = true;
    setState("loading");

    const replicateKey = getReplicateKey();

    try {
      const imageKey = `${slideId}_${id}`;

      if (isGuestMode) {
        const existingImage = await getImageFromLocal(imageKey);
        if (existingImage) {
          setUrl(existingImage.base64Data);
          setState("done");
          const { updateWidget } = usePresentationStore.getState();
          updateWidget(slideId, id, {
            data: {
              ...currentData,
              imageUrl: existingImage.base64Data,
            },
          });
          return;
        }
      }

      const { url: generatedUrl, isLocal } = await callImageAPI(
        currentData.imagePrompt,
        replicateKey,
        config.replicateModel || "black-forest-labs/flux-schnell"
      );

      setUrl(generatedUrl);
      setState("done");

      if (isGuestMode && isLocal) {
        const imageKey = `${slideId}_${id}`;
        await saveImageToLocal({
          id: imageKey,
          presentationId: "guest",
          slideId,
          widgetId: id,
          base64Data: generatedUrl,
          prompt: currentData.imagePrompt,
          createdAt: new Date(),
        });
      }

      const { updateWidget } = usePresentationStore.getState();
      updateWidget(slideId, id, {
        data: {
          ...currentData,
          imageUrl: generatedUrl,
        },
      });
    } catch (error) {
      console.error("Image generation failed:", error);
      setState("error");
    }
  };

  useEffect(() => {
    if (
      !url &&
      currentData.imagePrompt &&
      editable &&
      !hasAttemptedRef.current
    ) {
      loadImage();
    }
  }, []); // Run only once on mount

  const handleRetry = () => {
    hasAttemptedRef.current = false;
    setUrl(null);
    loadImage();
  };

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
        className="w-full h-full flex flex-col items-center justify-center bg-red-900/40 rounded-lg gap-2"
      >
        <p className="text-red-300 text-sm">Image generation failed</p>
        {editable && (
          <button
            onClick={handleRetry}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!url && !currentData.imagePrompt) {
    return (
      <div
        ref={widgetRef}
        className="w-full h-full flex items-center justify-center bg-zinc-800/40 rounded-lg"
      >
        <p className="text-zinc-400 text-sm">
          {editable ? "Click to add image" : "No image"}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={widgetRef}
      className="w-full h-full relative overflow-hidden rounded-lg"
      data-widget
      onClick={() =>
        editable &&
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
        style={{ objectFit, pointerEvents: "none", userSelect: "none" }}
        draggable={false}
        loading="lazy"
      />
    </div>
  );
}

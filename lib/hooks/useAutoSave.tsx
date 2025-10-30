import { useEffect, useRef, useCallback } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { useGenerationStore } from "@/lib/store/generation-store";

interface AutoSaveOptions {
  presentationId: string;
  enabled?: boolean;
  debounceMs?: number;
  onSaveStart?: () => void;
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
}

export function useAutoSave({
  presentationId,
  enabled = true,
  debounceMs = 20000,
  onSaveStart,
  onSaveSuccess,
  onSaveError,
}: AutoSaveOptions) {
  const previousStateRef = useRef<string>("");
  const isSavingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const enabledRef = useRef(enabled);

  const onSaveStartRef = useRef(onSaveStart);
  const onSaveSuccessRef = useRef(onSaveSuccess);
  const onSaveErrorRef = useRef(onSaveError);

  useEffect(() => {
    enabledRef.current = enabled;
    onSaveStartRef.current = onSaveStart;
    onSaveSuccessRef.current = onSaveSuccess;
    onSaveErrorRef.current = onSaveError;
  }, [enabled, onSaveStart, onSaveSuccess, onSaveError]);

  const savePresentation = useCallback(async () => {
    if (!enabledRef.current) {
      return;
    }

    if (isSavingRef.current) {
      return;
    }

    const currentSlides = usePresentationStore.getState().slides;
    const currentTheme = usePresentationStore.getState().theme;

    if (!currentSlides || currentSlides.length === 0) {
      return;
    }

    const currentState = JSON.stringify({
      slides: currentSlides,
      theme: currentTheme,
    });
    if (currentState === previousStateRef.current) {
      return;
    }

    isSavingRef.current = true;
    onSaveStartRef.current?.();

    const id = presentationId.startsWith("ai-")
      ? presentationId.slice(3)
      : presentationId;

    const payload = {
      outlineId: id,
      theme: currentTheme,
      slides: currentSlides,
      isModified: true,
    };

    try {
      const res = await fetch(`/api/presentation/${presentationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to save: ${res.status}`);
      }

      previousStateRef.current = currentState;
      onSaveSuccessRef.current?.();
    } catch (error) {
      onSaveErrorRef.current?.(error as Error);
    } finally {
      isSavingRef.current = false;
    }
  }, [presentationId]);

  useEffect(() => {
    const unsubscribe = usePresentationStore.subscribe((state, prevState) => {
      if (!enabledRef.current) {
        console.log(" Auto-save disabled, ignoring change");
        return;
      }

      const slidesChanged = state.slides !== prevState.slides;
      const themeChanged = state.theme !== prevState.theme;

      if (slidesChanged || themeChanged) {
        console.log(" Store changed, scheduling save in", debounceMs, "ms", {
          slidesChanged,
          themeChanged,
        });

        if (timeoutRef.current) {
          console.log(" Clearing  timer");
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          console.log(" Timer");
          savePresentation();
        }, debounceMs);
      }
    });

    return () => {
      console.log(" Cleaning ");
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debounceMs, savePresentation]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        savePresentation();
      }

      const currentSlides = usePresentationStore.getState().slides;
      const currentTheme = usePresentationStore.getState().theme;
      const currentState = JSON.stringify({
        slides: currentSlides,
        theme: currentTheme,
      });

      if (currentState !== previousStateRef.current) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes!";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [savePresentation]);

  return {
    saveNow: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      savePresentation();
    },
    isSaving: isSavingRef.current,
  };
}

"use client";

import { BaseDropdown } from "@/components/base/dropdown";
import { useUIStore } from "@/lib/store/ui-store";
import { Upload, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export function ImageToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const setProcessing = useUIStore((s) => s.setProcessing);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const widgetData = editBuffer?.widgetData;
  if (!widgetData) return null;

  const handleUpdate = (key: string, data: any) => {
    updateEditBuffer({
      [key]: data,
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB");
      return;
    }

    setUploading(true);
    setProcessing(true);

    try {
      console.log("Uploading file:", file.name);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      console.log("Got URL:", result.url);

      handleUpdate("imageUrl", result.url);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload-input"
      />

      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5"
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs">Uploading...</span>
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            <span className="text-xs">Upload</span>
          </>
        )}
      </Button>
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />

      <BaseDropdown
        tooltip="Select the fit"
        label="Object fit"
        options={[
          {
            label: "Contain",
            value: "contain",
          },
          {
            label: "Cover",
            value: "cover",
          },
          {
            label: "Fill",
            value: "fill",
          },
        ]}
        value={widgetData.objectFit}
        onChange={(newValue) => handleUpdate("objectFit", newValue)}
      />
    </>
  );
}

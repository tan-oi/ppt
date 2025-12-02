import { BaseColorInput } from "@/components/base/color-changer";
import { BaseDropdown } from "@/components/base/dropdown";
import { Input } from "@/components/ui/input";

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { useUIStore } from "@/lib/store/ui-store";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { PaintBucket } from "lucide-react";

export function LinkToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);

  console.log(editBuffer);
  if (!editBuffer?.widgetData) return null;

  const widgetData = editBuffer.widgetData;

  const handleUpdate = (key: string, value: any) => {
    updateEditBuffer({ [key]: value });
  };

  return (
    <>
      <div data-toolbar-input>
        <Tooltip>
          <TooltipTrigger asChild className="-mt-1">
            <Input
              value={widgetData.url}
              type="url"
              onChange={(e) => handleUpdate("url", e.target.value)}
            />
          </TooltipTrigger>
          <TooltipContent>Add a link</TooltipContent>
        </Tooltip>
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild className="-mt-1">
            <Input
              data-toolbar-input
              value={widgetData.text}
              type="text"
              onChange={(e) => handleUpdate("text", e.target.value)}
            />
          </TooltipTrigger>
          <TooltipContent>Add a label</TooltipContent>
        </Tooltip>
      </div>

      <BaseDropdown
        label="Variant"
        options={[
          { label: "Filled", value: "filled" },
          { label: "Outline", value: "outline" },
          {
            label: "Text",
            value: "text",
          },
        ]}
        value={widgetData.variant}
        onChange={(newValue) => handleUpdate("variant", newValue)}
        tooltip="Choose the link style"
      />

      <div className="w-px h-8 bg-linear-to-b from-transparent via-zinc-600 to-transparent" />

      <BaseColorInput
        icon={PaintBucket}
        value={widgetData.color}
        onChange={(newValue) => handleUpdate("color", newValue)}
      />
    </>
  );
}

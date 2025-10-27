import { BaseColorInput } from "@/components/base/color-changer";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/lib/store/ui-store";
import { PaintBucket, PaintbrushIcon } from "lucide-react";

export function BadgeToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);

  if (!editBuffer?.widgetData) return null;

  const widgetData = editBuffer.widgetData;

  const handleUpdate = (key: string, value: any) => {
    updateEditBuffer({ [key]: value });
  };

  return (
    <>
      <BaseColorInput
        icon={PaintbrushIcon}
        value={widgetData.color}
        onChange={(newValue) => handleUpdate("color", newValue)}
      />
      <BaseColorInput
        icon={PaintBucket}
        value={widgetData.backgroundColor}
        onChange={(newValue) => handleUpdate("backgroundColor", newValue)}
      />

      <Input
        data-toolbar-input
        placeholder="Label on badge"
        value={widgetData.label}
        onChange={(e) => handleUpdate("label", e.target.value)}
        className="min-w-[60px] max-w-[150px]"
      />
    </>
  );
}

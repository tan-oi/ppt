import { BaseColorInput } from "@/components/base/color-changer";
import { BaseDropdown } from "@/components/base/dropdown";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/lib/store/ui-store";
import { PaintBucket, Paintbrush } from "lucide-react";

export function ProgressToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  if (!editBuffer?.widgetData) return null;

  const widgetData = editBuffer?.widgetData;

  const handleUpdate = (key: string, value: any) => {
    updateEditBuffer({
      [key]: value,
    });
  };

  return (
    <>
      <BaseDropdown
        label="Show percent"
        options={[
          { label: "Yes", value: "true" },
          {
            label: "No",
            value: "false",
          },
        ]}
        tooltip="Choose to show or not"
        value={String(widgetData.showPercentage)}
        onChange={(newValue) =>
          handleUpdate("showPercentage", newValue === "true")
        }
      />

      <Input
        disabled={!widgetData.showPercentage}
        value={widgetData.percentage}
        onChange={(e) => handleUpdate("percentage", e.target.value)}
        placeholder="60"
      />

      <Input
        value={widgetData.label}
        onChange={(e) => handleUpdate("label", e.target.value)}
        placeholder="Label"
      />

      <BaseColorInput
        icon={Paintbrush}
        onChange={(newValue) => handleUpdate("color", newValue)}
        value={widgetData.color}
      />

      <BaseColorInput
        icon={PaintBucket}
        onChange={(newValue) => handleUpdate("backgroundColor", newValue)}
        value={widgetData.backgroundColor}
      />
    </>
  );
}

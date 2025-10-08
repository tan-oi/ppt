import { BaseColorInput } from "@/components/base/color-changer";
import { BaseDropdown } from "@/components/base/dropdown";
import { useUIStore } from "@/lib/store/ui-store";
import { PaintBucket } from "lucide-react";

export function DividerToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const widgetData = editBuffer.data.payload;

  console.log(editBuffer);

  //make it better.
  const handleUpdate = (key: string, value: any) => {
    const updatedWidgetData = {
      ...editBuffer.data.payload,
      [key]: value,
    };

    updateEditBuffer({
      data: {
        ...editBuffer.data,
        payload: updatedWidgetData,
      },
      widgetData: updatedWidgetData,
    });
  };

  return (
    <>
      <BaseDropdown
        label="Orientation"
        options={[
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ]}
        value={widgetData.orientation}
        onChange={(newValue) => handleUpdate("orientation", newValue)}
        tooltip="Choose orientation"
      />

      <BaseDropdown
        label="Style"
        options={[
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
        ]}
        value={widgetData.style}
        onChange={(newValue) => handleUpdate("style", newValue)}
        tooltip="Choose line style"
      />

      <BaseDropdown
        label="Thickness"
        options={[
          { label: "Thin", value: 1 },
          { label: "Normal", value: 2 },
          { label: "Thick", value: 4 },
          { label: "Extra Thick", value: 8 },
        ]}
        value={widgetData.thickness}
        onChange={(newValue) => handleUpdate("thickness", newValue)}
        tooltip="Choose thickness"
        showCustomInput={true}
        inputType="number"
      />

      <BaseColorInput
        icon={PaintBucket}
        value={widgetData.color}
        onChange={(newValue) => handleUpdate("color", newValue)}
      />
    </>
  );
}

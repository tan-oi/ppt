import { BaseColorInput } from "@/components/base/color-changer";
import { useUIStore } from "@/lib/store/ui-store";
import { PaintBucket, PaintbrushIcon } from "lucide-react";

export function BadgeToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);

  const widgetData = editBuffer.data.payload;

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

      <div></div>
    </>
  );
}

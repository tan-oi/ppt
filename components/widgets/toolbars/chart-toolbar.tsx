import { BaseDropdown } from "@/components/base/dropdown";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui-store";

export function ChartToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  
  if (!editBuffer?.widgetData) return null;

  const widgetData = editBuffer.widgetData;

  const handleUpdate = (key: string, value: any) => {
    updateEditBuffer({ [key]: value });
  };

  return (
    <>
      <BaseDropdown
        label="Chart Type"
        options={[
          { label: "Bar Chart", value: "bar" },
          { label: "Line Chart", value: "line" },
          { label: "Area Chart", value: "area" },
          { label: "Pie Chart", value: "pie" },
        ]}
        value={widgetData.type}
        onChange={(newValue) => handleUpdate("type", newValue)}
        tooltip="Choose chart type"
      />
      
      <Button
        variant="outline"
        onClick={() => useUIStore.getState().setDrawer()}
        className="border-none bg-card/80"
      >
        Edit Data
      </Button>
    </>
  );
}
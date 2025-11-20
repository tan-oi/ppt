import { Input } from "@/components/ui/input";
import { useUIStore } from "@/lib/store/ui-store";
import { BaseDropdown } from "@/components/base/dropdown";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function StatToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);

  if (!editBuffer?.widgetData) return null;
  const widgetData = editBuffer.widgetData;

  const handleUpdate = (key: string, value: any) => {
    updateEditBuffer({
      [key]: value,
    });
  };

  return (
    <>
      <Input
        data-toolbar-input
        value={widgetData.value ?? ""}
        type="text"
        placeholder="85%"
        onChange={(e) => handleUpdate("value", e.target.value)}
        className="min-w-[120px] max-w-[150px]"
      />

      <Input
        data-toolbar-input
        value={widgetData.unit ?? ""}
        type="text"
        placeholder="Unit (optional)"
        onChange={(e) => handleUpdate("unit", e.target.value)}
        className="min-w-[100px] max-w-[120px]"
      />

      <Input
        data-toolbar-input
        value={widgetData.label ?? ""}
        type="text"
        placeholder="Description"
        onChange={(e) => handleUpdate("label", e.target.value)}
        className="min-w-[180px] max-w-[250px]"
      />

      <BaseDropdown
        label="Trend"
        value={widgetData.trend ?? "neutral"}
        options={[
          {
            label: "Trending Up",
            value: "up",
          },
          {
            label: "Trending Down",
            value: "down",
          },
          {
            label: "Neutral",
            value: "neutral",
          },
          {
            label: "No Trend",
            value: "none",
          },
        ]}
        onChange={(newValue) => handleUpdate("trend", newValue)}
        tooltip="Set trend direction"
      />

      {widgetData.trend !== "none" && (
        <Input
          data-toolbar-input
          value={widgetData.trendValue ?? ""}
          type="text"
          placeholder="+12%"
          onChange={(e) => handleUpdate("trendValue", e.target.value)}
          className="min-w-[100px] max-w-[120px]"
        />
      )}

      {/* <div className="flex gap-1 border-l pl-2 ml-2">
        <Button
          variant={widgetData.trend === "up" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleUpdate("trend", "up")}
          className="h-8 w-8 p-0"
        >
          <TrendingUp className="h-4 w-4" />
        </Button>
        <Button
          variant={widgetData.trend === "down" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleUpdate("trend", "down")}
          className="h-8 w-8 p-0"
        >
          <TrendingDown className="h-4 w-4" />
        </Button>
        <Button
          variant={widgetData.trend === "neutral" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleUpdate("trend", "neutral")}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div> */}
    </>
  );
}

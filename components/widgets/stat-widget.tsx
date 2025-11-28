import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatWidgetProps {
  id: string;
  slideId: string;
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  unit?: string;
  editable: boolean;
}

export function StatWidget({
  id,
  slideId,
  value,
  label,
  trend = "up",
  trendValue,
  unit = "",
  editable,
}: StatWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const selectedWidget = useUIStore((s) => s.selectedWidget?.id === id);
  const editBuffer = useUIStore((s) => s.editBuffer);

  const currentData =
    selectedWidget && editBuffer?.widgetData
      ? editBuffer.widgetData
      : { value, label, trend, trendValue, unit };

  const getTrendIcon = () => {
    switch (currentData.trend) {
      case "up":
        return <TrendingUp className="w-8 h-8" />;
      case "down":
        return <TrendingDown className="w-8 h-8" />;
      case "neutral":
        return <Minus className="w-8 h-8" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (currentData.trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      case "neutral":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  if (!editable)
    [
      <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-background to-muted/30 rounded-lg p-8">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-8xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {currentData.value}
          </span>
          {currentData.unit && (
            <span className="text-4xl font-semibold text-muted-foreground">
              {currentData.unit}
            </span>
          )}
        </div>

        {currentData.trendValue && (
          <div className={`flex items-center gap-2 mb-4 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-2xl font-semibold">
              {currentData.trendValue}
            </span>
          </div>
        )}

        <p className="text-2xl text-muted-foreground text-center font-medium">
          {currentData.label}
        </p>
      </div>,
    ];
  return (
    <div
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          widgetType: "stat",
          data: {
            value: currentData.value,
            label: currentData.label,
            trend: currentData.trend,
            trendValue: currentData.trendValue,
            unit: currentData.unit,
          },
        });
      }}
      className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-background to-muted/30 rounded-lg p-8"
    >
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-8xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {currentData.value}
        </span>
        {currentData.unit && (
          <span className="text-4xl font-semibold text-muted-foreground">
            {currentData.unit}
          </span>
        )}
      </div>

      {currentData.trendValue && (
        <div className={`flex items-center gap-2 mb-4 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-2xl font-semibold">
            {currentData.trendValue}
          </span>
        </div>
      )}

      <p className="text-2xl text-muted-foreground text-center font-medium">
        {currentData.label}
      </p>
    </div>
  );
}

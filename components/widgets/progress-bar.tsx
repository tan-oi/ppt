import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

interface ProgressBarWidgetProps {
  id: string;
  slideId: string;
  percentage?: number;
  label?: string;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  height?: number;
  isEditable?: boolean;
  className?: string;
}

export function ProgressBarWidget({
  id,
  slideId,
  percentage = 75,
  label = "",
  color = "#3B82F6",
  backgroundColor = "#E5E7EB",
  showPercentage = true,
  height = 24,
  isEditable,
  className,
}: ProgressBarWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
      data-widget
      // ref={widgetRef}
      onClick={() => {
        updateEditBuffer({
          widgetData: {
            percentage: 60,
            label: "hey",
          },
        });
      }}
    >
      <div className="w-full space-y-2">
        {(label || showPercentage) && (
          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            {label && <span>{label}</span>}
            {showPercentage && (
              <span style={{ color }}>{clampedPercentage}%</span>
            )}
          </div>
        )}

        <div
          className="w-full rounded-full overflow-hidden"
          style={{
            backgroundColor,
            height: `${height}px`,
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${clampedPercentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </div>
  );
}

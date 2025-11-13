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
  editable?: boolean;
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
  editable,
  className,
}: ProgressBarWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);

  const editBuffer = useUIStore((s) => s.editBuffer);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          percentage,
          showPercentage,
          color,
          backgroundColor,
          label,
        };

  const clampedPercentage = Math.min(Math.max(currentData.percentage, 0), 100);

  if (!editable) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 cursor-pointer">
        <div className="w-full space-y-2">
          {(currentData.label || currentData.showPercentage) && (
            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
              {currentData.label && <span>{currentData.label}</span>}
              {currentData.showPercentage && (
                <span style={{ color: currentData.color }}>
                  {clampedPercentage}%
                </span>
              )}
            </div>
          )}

          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              backgroundColor: currentData.backgroundColor,
              height: `${height}px`,
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${clampedPercentage}%`,
                backgroundColor: currentData.color,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          data: {
            percentage: currentData.percentage,
            label: currentData.label,
            color: currentData.color,
            backgroundColor: currentData.backgroundColor,
            showPercentage: currentData.showPercentage,
          },
          widgetType: "progress",
        });
      }}
    >
      <div className="w-full space-y-2">
        {(currentData.label || currentData.showPercentage) && (
          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            {currentData.label && <span>{currentData.label}</span>}
            {currentData.showPercentage && (
              <span style={{ color: currentData.color }}>
                {clampedPercentage}%
              </span>
            )}
          </div>
        )}

        <div
          className="w-full rounded-full overflow-hidden"
          style={{
            backgroundColor: currentData.backgroundColor,
            height: `${height}px`,
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${clampedPercentage}%`,
              backgroundColor: currentData.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}

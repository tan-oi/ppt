import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

interface BadgeWidgetProps {
  label: string;
  color: string;
  backgroundColor: string;
  id: string;
  slideId: string;
  editable?: boolean;
  className?: string;
}

export function BadgeWidget({
  label = "ghello",
  color = "#fff",
  backgroundColor = "#000",
  id,
  slideId,
  editable = false,
  className,
}: BadgeWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);
  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          label,
          color,
          backgroundColor,
        };

  if (editable) {
    return (
      <>
        <div className="w-full flex items-center justify-center">
          <div
            className="text-center w-full h-full rounded-full"
            style={{
              background: currentData.backgroundColor,
              color: currentData.color,
            }}
          >
            <span className="">{currentData.label}</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="w-full flex items-center justify-center"
        data-widget
        ref={widgetRef}
        onClick={() =>
          handleClick({
            widgetType: "badge",
            data: {
              color: currentData.color,
              backgroundColor: currentData.backgroundColor,
              label: currentData.label,
            },
          })
        }
      >
        <div
          className="text-center w-full h-full rounded-full"
          style={{
            background: currentData.backgroundColor,
            color: currentData.color,
          }}
        >
          <span className="">{currentData.label}</span>
        </div>
      </div>
    </>
  );
}

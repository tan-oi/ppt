import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";

interface BadgeWidgetProps {
  label: string;
  color: string;
  backgroundColor: string;
  id: string;
  slideId: string;
  isEditing?: boolean;
  className?: string;
}

export function BadgeWidget({
  label = "ghello",
  color = "#fff",
  backgroundColor = "#000",
  id,
  slideId,
  isEditing = false,
  className,
}: BadgeWidgetProps) {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);
  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          color,
          backgroundColor,
        };
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
          <span className="">{label}</span>
        </div>
      </div>
    </>
  );
}

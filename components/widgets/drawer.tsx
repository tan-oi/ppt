import { useUIStore } from "@/lib/store/ui-store";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

import { usePresentationStore } from "@/lib/store/presentation-store";
import { cn } from "@/lib/utils";
import { ChartTable } from "./chart-table";
import { chartRegistry } from "./charts/base";
import { useRef, useEffect } from "react";

export function DrawerEditing() {
  const drawerSync = useUIStore((s) => s.drawerOpen);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const setDrawer = useUIStore((s) => s.setDrawer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const pptTheme = usePresentationStore((s) => s.theme);

  const originalDataRef = useRef<any>(null);

  useEffect(() => {
    if (drawerSync && selectedWidget) {
      const widget = usePresentationStore
        .getState()
        .getWidget(selectedWidget.slideId, selectedWidget.id);
      originalDataRef.current = widget?.data ?? null;
    }
  }, [drawerSync, selectedWidget?.id]);

  const chartType = editBuffer?.widgetData?.type;
  const chartData = editBuffer?.widgetData?.data;
  const chartConfig = editBuffer?.widgetData?.config;
  const xKey = editBuffer?.widgetData?.xKey;
  //@ts-ignore
  const ChartComponent = chartRegistry[chartType];

  const handleSave = () => {
    if (!selectedWidget || !editBuffer?.widgetData) {
      setDrawer();
      return;
    }
    const {
      position,
      editor,
      x,
      y,
      width,
      height,
      ...dataToSave
    } = editBuffer.widgetData;
    usePresentationStore.getState().updateWidget(
      selectedWidget.slideId,
      selectedWidget.id,
      { data: dataToSave }
    );
    setDrawer();
  };

  const handleCancel = () => {
    if (originalDataRef.current && selectedWidget) {
      const currentBuffer = useUIStore.getState().editBuffer?.widgetData ?? {};
      updateEditBuffer({
        ...currentBuffer,
        ...originalDataRef.current,
      });
    }
    setDrawer();
  };

  if (!drawerSync) return null;

  return (
    <Drawer
      open={drawerSync}
      onOpenChange={(open) => {
        if (!open) handleCancel();
      }}
    >
      <DrawerContent
        className={cn(
          "min-h-[95vh] max-w-[95vw] w-full mx-auto rounded-t-xl bg-background text-foreground outline-1",
          pptTheme && pptTheme !== "starter" ? pptTheme : ""
        )}
        style={{ zIndex: "9999" }}
        data-drawer
      >
        <DrawerHeader>
          <DrawerTitle className="p-0 text-xl capitalize text-foreground">
            Edit {chartType} chart
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 px-8 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
          <div className="flex col-span-2 flex-col min-h-0">
            <div className="flex-1 overflow-auto rounded-lg">
              <ChartTable
                data={chartData}
                config={chartConfig}
                xKey={xKey}
                type={chartType}
              />
            </div>
          </div>

          <div className="flex col-span-1 flex-1 flex-col min-h-0">
            <h3 className="text-sm text-muted-foreground font-medium mb-3 uppercase tracking-wider">
              Preview
            </h3>
            <div className="border border-border/60 rounded-lg p-4 bg-background/40 flex-1 min-h-[280px]">
              {ChartComponent && (
                <ChartComponent
                  chartData={chartData}
                  chartConfig={chartConfig}
                  xKeyToUse={xKey}
                />
              )}
            </div>
          </div>
        </div>

        <DrawerFooter className="flex flex-row items-center justify-end gap-2">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

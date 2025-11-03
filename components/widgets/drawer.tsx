import { useUIStore } from "@/lib/store/ui-store";
import {
  Drawer,
  DrawerClose,
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

export function DrawerEditing() {
  const drawerSync = useUIStore((s) => s.drawerOpen);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const pptTheme = usePresentationStore((s) => s.theme);
  const handleSubmit = (data: any) => console.log(data);

  const chartType = editBuffer?.widgetData?.type;
  const chartData = editBuffer?.widgetData?.data;
  const chartConfig = editBuffer?.widgetData?.config;
  //@ts-ignore
  const ChartComponent = chartRegistry[chartType];

  if (!drawerSync) return null;

  return (
    <>
      <Drawer open={drawerSync}>
        <DrawerContent
          className={cn(
            "min-h-[95vh] max-w-[95vw] w-full mx-auto rounded-t-xl bg-card text-card-foreground outline-1",
            pptTheme && pptTheme !== "starter" ? pptTheme : ""
          )}
          style={{
            zIndex: "9999",
          }}
          data-drawer
        >
          <DrawerHeader>
            <DrawerTitle className="p-0">
              <span className="text-xl">Edit {chartType} Chart</span>
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 px-8 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
            <div className="flex col-span-2 flex-col min-h-0">
              <div className="flex-1 overflow-auto rounded-lg">
                <ChartTable
                  data={chartData}
                  // onChange={handleDataChange}
                />
              </div>
            </div>

            <div className="flex col-span-1 flex-1 flex-col min-h-0">
              <h3 className="text-lg text-center text-white font-medium mb-3">
                Preview
              </h3>
              <div className="border rounded-lg p-4 bg-card">
                {ChartComponent && (
                  <ChartComponent
                    chartData={chartData}
                    chartConfig={chartConfig || chartConfig}
                  />
                )}
              </div>
            </div>
          </div>

          <DrawerFooter className="flex flex-row items-center justify-center">
            <Button onClick={handleSubmit}>Submit</Button>
            <DrawerClose asChild>
              <Button variant={"destructive"}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

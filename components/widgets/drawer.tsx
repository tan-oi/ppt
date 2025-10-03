import { useUIStore } from "@/lib/store/ui-store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

import { LineChartBase } from "./charts/line-chart";
import { ChartConfig } from "../ui/chart";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { cn } from "@/lib/utils";
import { ChartTable } from "./chart-table";

const chartConfig = {
  desktop: { label: "Desktop", color: "pink" },
  mobile: { label: "Mobile", color: "lime" },
  computer: { label: "Computer", color: "blue" },
  ipod: {
    label: "Ipod",
    color: "red",
  },
} satisfies ChartConfig;
export function DrawerEditing() {
  const drawerSync = useUIStore((s) => s.drawerOpen);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const pptTheme = usePresentationStore((s) => s.theme);


  const handleSubmit = (data: any) => console.log(data);

  console.log(editBuffer);

  if (!drawerSync) return null;

  return (
    <>
      <Drawer open={drawerSync}>
        <DrawerContent
          className={cn(
            "min-h-[95vh] w-full mx-auto rounded-t-xl bg-card text-card-foreground",
            pptTheme && pptTheme !== "starter" ? pptTheme : ""
          )}
          style={{
            zIndex: "9999",
          }}
          data-drawer
        >
          <DrawerHeader>
            <DrawerTitle className="p-0">
              <span className="text-xl">Edit Chart</span>
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 px-8 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
            <div className="flex col-span-2 flex-col min-h-0">
              <h3 className="text-md font-medium mb-3">Edit Data</h3>
              <div className="flex-1 overflow-auto border rounded-lg">
                <ChartTable
                  data={editBuffer?.data?.data}
                  // onChange={handleDataChange}
                />
              </div>
            </div>

            <div className="flex col-span-1 flex-1 flex-col min-h-0">
              <h3 className="text-lg text-center text-white font-medium mb-3">
                {" "}
                Preview
              </h3>
              <div className="border rounded-lg p-4 bg-card">
                <LineChartBase
                  chartData={editBuffer?.data?.data}
                  chartConfig={chartConfig}
                />
              </div>

              <div></div>
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

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
import { ChartDataTable } from "../table";
import { LineChartBase } from "./charts/line-chart";
import { ChartConfig } from "../ui/chart";

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
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  // console.log(editBuffer ?? editBuffer.data)
  const handleDataChange = (newData: any) => {
    updateEditBuffer({ data: newData });
  };

  const handleSubmit = (data: any) => console.log(data);

  if (!drawerSync) return null;

  return (
    <>
      <Drawer open={drawerSync}>
        <DrawerContent
          className="min-h-[95vh] w-full mx-auto rounded-t-xl"
          data-drawer
        >
          <DrawerHeader>
            <DrawerTitle className="">
              <span className="text-xl">Edit Chart</span>
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 px-8 p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
            <div className="flex col-span-2 flex-col min-h-0">
              <h3 className="text-lg font-medium mb-3">Edit Data</h3>
              <div className="flex-1 overflow-auto border rounded-lg">
                <ChartDataTable
                  data={editBuffer?.data}
                  onChange={handleDataChange}
                />
              </div>
            </div>

            <div className="flex col-span-1 flex-1 flex-col min-h-0">
              <h3 className="text-lg text-center text-white font-medium mb-3"> Preview</h3>
              <div className="border rounded-lg p-4 bg-card">
                <LineChartBase
                  chartData={editBuffer?.data?.data}
                  chartConfig={chartConfig}
                />
              </div>

              <div>
                
              </div>
            </div>
          </div>

          <DrawerFooter>
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

//drawer to be added when image gen is available.
import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Zap, X } from "lucide-react";

import * as motion from "motion/react-client";
import { TooltipTrigger, Tooltip, TooltipContent } from "../ui/tooltip";
export function CreditViewer({ credits }: { credits: number }) {
  const usageData = [
    { id: 1, date: "Nov 1, 2025", type: "PPT Generation", credits: 5 },
    { id: 2, date: "Oct 31, 2025", type: "Image Generation", credits: 3 },
    { id: 3, date: "Oct 30, 2025", type: "PPT Generation", credits: 5 },
    { id: 4, date: "Oct 30, 2025", type: "PPT Generation", credits: 5 },
    { id: 5, date: "Oct 30, 2025", type: "PPT Generation", credits: 5 },
    { id: 6, date: "Oct 30, 2025", type: "PPT Generation", credits: 5 },
    { id: 7, date: "Oct 30, 2025", type: "PPT Generation", credits: 5 },
    { id: 8, date: "Oct 30, 2025", type: "PPT Generation", credits: 5 },
  ];

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.35,
            }}
            className="flex items-center gap-1 border border-secondary rounded-xl py-2 px-4 hover:bg-muted cursor-pointer transition-colors shadow-sm"
          >
            <motion.div
              whileHover={{
                x: [0, -1, 1, -1, 1, 0],
                y: [0, 1, -1, 2, -2, 0],
                rotate: [0, 1, -1, 0],
                transition: {
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear",
                },
              }}
            >
              <Zap className="text-green-400 size-4" fill="currentColor" />
            </motion.div>
            <span className="text-sm font-medium text-foreground">
              {credits}
            </span>
          </motion.button>
        </DrawerTrigger>

        <DrawerContent className="min-h-screen border-t border-secondary shadow-xl">
          <DrawerClose className="absolute rounded-md p-2 hover:bg-muted transition-colors right-10 top-10">
            <X className="h-5 w-5 text-foreground" />
          </DrawerClose>
          <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="mx-auto w-full max-w-md p-6 flex flex-col items-center">
              <DrawerHeader className="flex">
                <div>
                  <DrawerTitle className="text-lg font-semibold">
                    Available Credits
                  </DrawerTitle>
                  <DrawerDescription className="text-sm text-muted-foreground">
                    Overview of balance, usage, and credit policy.
                  </DrawerDescription>
                </div>
              </DrawerHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between border-b border-secondary pb-3">
                  <span className="text-sm text-muted-foreground">
                    Current Balance
                  </span>
                  <span className="font-semibold text-green-400">
                    {credits} Credits
                  </span>
                </div>

                <div className="rounded-lg border border-secondary p-4 bg-muted">
                  <h3 className="font-medium text-sm mb-2 text-foreground">
                    How credits work
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>5 credits are used for each PowerPoint generation.</li>
                    <li>3 credits are used for each Image generation.</li>
                    <li>Credits reset or refill monthly based on your plan.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-3 text-foreground">
                    Recent Usage
                  </h3>
                  <div className="rounded-lg border border-secondary overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left px-3 py-2 font-medium text-foreground">
                            Date
                          </th>
                          <th className="text-left px-3 py-2 font-medium text-foreground">
                            Type
                          </th>
                          <th className="text-right px-3 py-2 font-medium text-foreground">
                            Credits
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {usageData.map((entry) => (
                          <tr
                            key={entry.id}
                            className="border-t border-secondary"
                          >
                            <td className="px-3 py-2 text-muted-foreground">
                              {entry.date}
                            </td>
                            <td className="px-3 py-2 text-muted-foreground">
                              {entry.type}
                            </td>
                            <td className="px-3 py-2 text-right text-foreground">
                              -{entry.credits}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <DrawerFooter className="mt-8 space-y-2">
                <Button className="w-full bg-foreground cursor-pointer">
                  Buy More Credits
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full border-secondary text-foreground hover:bg-muted cursor-pointer"
                  >
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 border border-secondary rounded-xl py-2 px-4 hover:bg-muted transition-colors shadow-md">
            <motion.div
              whileHover={{
                x: [0, -1, 1, -1, 1, 0],
                y: [0, 1, -1, 2, -2, 0],
                rotate: [0, 1, -1, 0],
                transition: {
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear",
                },
              }}
            >
              <Zap className="text-green-400 size-4" fill="currentColor" />
            </motion.div>

            <span className="text-sm font-medium text-foreground">
              {credits}
            </span>
          </div>
        </TooltipTrigger>

        <TooltipContent>Each deck takes 5 credits</TooltipContent>
      </Tooltip>
    </>
  );
}

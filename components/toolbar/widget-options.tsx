"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useUIStore } from "../../lib/store/ui-store";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { motion } from "motion/react";

const MotionButton = motion(Button);

export function WidgetOptions() {
  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const deselectWidgetAndRemoveToolbar = useUIStore(
    (s) => s.deselectWidgetAndRemoveToolbar
  );
  const deletedWidget = usePresentationStore((s) => s.deleteWidget);
  return (
    <>
      <MotionButton
        whileHover={{
          scale: 1.05,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        onClick={() => {
          const slideId = selectedWidget?.slideId as string;
          const widgetId = selectedWidget?.id as string;

          deletedWidget(slideId, widgetId);
          deselectWidgetAndRemoveToolbar();
        }}
        widget-element="true"
        variant={"outline"}
        className="bg-muted/50 border-none bg-transparent"
      >
        <Trash2 size={16} />
      </MotionButton>
    </>
  );
}

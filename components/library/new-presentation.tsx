"use client";

import {
  Wand2,
  FileClock as FileBlank,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlankPresentation } from "@/app/create/action";
import { motion, AnimatePresence } from "framer-motion";

export function NewPresentation() {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  const handleScratchCreate = async () => {
    setIsCreating(true);
    setOpen(false);

    const result = await createBlankPresentation();

    if (result.success) {
      router.push(`/docs/${result.id}`);
    } else {
      alert(result.error || "Failed to create presentation");
      setIsCreating(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            disabled={isCreating}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl px-5 py-2.5 font-medium transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap hover:cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {isCreating ? "Creating..." : "New"}
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <AnimatePresence mode="wait">
        {open && (
          <DropdownMenuContent
            side="bottom"
            align="end"
            alignOffset={5}
            sideOffset={8}
            className="rounded-xl border border-zinc-800 bg-background shadow-lg overflow-hidden"
            asChild
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.05,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <DropdownMenuItem
                  onClick={handleScratchCreate}
                  disabled={isCreating}
                  className="flex items-center gap-1 px-2 py-2 hover:bg-neutral-900/60 transition-colors duration-150 border-b border-neutral-900/40 last:border-b-0 rounded-lg"
                  asChild
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="p-2 rounded-lg bg-neutral-800/40">
                      <FileBlank className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-white">
                        Start from Scratch
                      </p>
                      <p className="text-xs text-neutral-500">Blank canvas</p>
                    </div>
                  </motion.div>
                </DropdownMenuItem>

                <Link href={"/create"}>
                  <DropdownMenuItem
                    className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-blue-500/10 transition-colors duration-150 cursor-pointer"
                    asChild
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Wand2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-white">Use AI</p>
                        <p className="text-xs text-neutral-500">AI-generated</p>
                      </div>
                    </motion.div>
                  </DropdownMenuItem>
                </Link>
              </motion.div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}

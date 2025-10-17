"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Link } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface DraggableButtonProps {
  shareUrl: string;
  isShared: boolean;
  onRevoke?: () => void;
}

export function ShareOption({
  shareUrl,
  isShared,
  onRevoke,
}: DraggableButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied((p) => !p);
    // setTimeout(() => setCopied(false), 2000);
  };

  const handleRevoke = () => {
    if (onRevoke) onRevoke();
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={"sm"} className="cursor-pointer">
              Share
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="text-zinc-900 bg-gray-50">
          Share this presentation
        </TooltipContent>
      </Tooltip>

      <DialogContent
        className="bg-zinc-900 background-blur-lg rounded-xl font-sans"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-1">
          <DialogTitle className="text-zinc-300 text-lg">
            Share the presentation
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm text-center">
            Anyone with this link can view your presentation. They won’t be able
            to edit it.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="flex gap-2 mb-4 items-center w-full ">
          <Input
            type="text"
            className="text-zinc-300"
            value={"https://holy.co"}
            readOnly
          />
          <Button size="sm" onClick={handleCopy} className="cursor-pointer">
            <Link size={8} />

            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ y: -8, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 8, opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ y: -8, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 8, opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {isShared && onRevoke && (
          <Button
            size="sm"
            variant="destructive"
            onClick={handleRevoke}
            className="mb-2"
          >
            Revoke link
          </Button>
        )}
      </DialogContent>

      <DialogClose>Cancel</DialogClose>
    </Dialog>
  );
}

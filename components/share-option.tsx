"use client";

import { useState, useTransition } from "react";
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
import { Link, Loader2, Share2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

interface ShareOptionProps {
  shareUrl: string;
  isShared: boolean;
  presentationId: string;
  type: "minimal" | "normal";
  onToggleShare: () => Promise<{
    success: boolean;
    isShared: boolean;
    error?: string;
  }>;
}

export function ShareOption({
  shareUrl,
  isShared,
  presentationId,
  type = "normal",
  onToggleShare,
}: ShareOptionProps) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const result = await onToggleShare();

        if (result.success) {
          toast.success(
            result.isShared
              ? "Presentation is now shareable!"
              : "Share link revoked"
          );

          if (!result.isShared) {
            setIsOpen(false);
          }
        } else if (result.error) {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update share status"
        );
        console.error(error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {type === "normal" ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size="sm" className="cursor-pointer">
                Share
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="text-zinc-900 bg-gray-50">
            Share this presentation
          </TooltipContent>
        </Tooltip>
      ) : (
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="link"
            className="h-8 w-8 rounded-md transition-colors duration-200 text-neutral-400 hover:text-blue-600 hover:scale-[1.02] cursor-pointer"
          >
            <Share2 className="w-3 h-3" />
          </Button>
        </DialogTrigger>
      )}
      {isOpen && (
        <AnimatePresence mode="popLayout">
          <motion.div>
            <DialogContent
              className="bg-zinc-900 backdrop-blur-lg rounded-xl font-sans"
              showCloseButton={false}
            >
              <DialogHeader className="flex flex-col items-center justify-center gap-1">
                <DialogTitle className="text-zinc-300 text-lg">
                  {isShared ? "Share the presentation" : "Enable sharing"}
                </DialogTitle>
                <DialogDescription className="text-zinc-400 text-sm text-center">
                  {isShared
                    ? "Anyone with this link can view your presentation. They won't be able to edit it."
                    : "Enable sharing to generate a public link for this presentation."}
                </DialogDescription>
              </DialogHeader>

              <Separator className="my-2" />

              {isShared ? (
                <>
                  <div className="flex gap-2 mb-4 items-center w-full">
                    <Input
                      type="text"
                      className="text-zinc-300"
                      value={shareUrl}
                      readOnly
                    />
                    <Button
                      size="sm"
                      onClick={handleCopy}
                      className="cursor-pointer"
                      disabled={isPending}
                    >
                      <Link size={16} />

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

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleToggle}
                    disabled={isPending}
                    className="mb-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Revoking...
                      </>
                    ) : (
                      "Revoke link"
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={handleToggle}
                  disabled={isPending}
                  className="mb-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enabling...
                    </>
                  ) : (
                    "Enable sharing"
                  )}
                </Button>
              )}

              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </motion.div>
        </AnimatePresence>
      )}
    </Dialog>
  );
}

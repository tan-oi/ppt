"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Link as LinkIcon,
  Loader2,
  Share2,
  Globe,
  Lock,
  Check,
  Copy,
  RefreshCw,
} from "lucide-react";
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
  type = "normal",
  onToggleShare,
}: ShareOptionProps) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const result = await onToggleShare();
        if (result.success) {
          toast.success(
            result.isShared ? "Presentation is now live!" : "Share link revoked"
          );

          if (!result.isShared) setIsOpen(false);
        } else if (result.error) {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Failed to update share status");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {type === "normal" ? (
          <Button
            size="sm"
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-0"
          >
            <Share2 size={14} />
            Share
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-zinc-400 hover:text-blue-500 transition-colors hover:bg-transparent hover:scale-110 hover:cursor-pointer"
          >
            <Share2 size={16} />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-zinc-800 sm:max-w-md p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl text-zinc-100 flex items-center gap-2">
            {isShared ? (
              <Globe className="w-5 h-5 text-green-500" />
            ) : (
              <Lock className="w-5 h-5 text-zinc-500" />
            )}
            {isShared ? "Public Access" : "Private Presentation"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2">
          <AnimatePresence mode="wait">
            {isShared ? (
              <motion.div
                key="shared-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <p className="text-zinc-400 text-sm">
                  Anyone with the link below can view this presentation.
                </p>

                <div className="relative flex items-center">
                  <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-3 pr-12 py-2.5 text-sm text-zinc-300 font-mono truncate transition-all hover:border-zinc-700 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20">
                    {shareUrl}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCopy}
                    className="absolute right-1 h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Check size={14} className="text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Copy size={14} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>

                <div className="pt-2 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">
                    Current status: Live
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggle}
                    disabled={isPending}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 text-xs"
                  >
                    {isPending ? (
                      <Loader2 className="w-3 h-3 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="w-3 h-3 mr-2" />
                    )}
                    Unpublish
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unshared-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800/50 flex flex-col items-center justify-center gap-3 py-8">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                    <LinkIcon className="w-6 h-6 text-zinc-400" />
                  </div>
                  <p className="text-zinc-400 text-sm text-center max-w-[200px]">
                    Publish this presentation to generate a shareable link.
                  </p>
                </div>

                <Button
                  onClick={handleToggle}
                  disabled={isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Link...
                    </>
                  ) : (
                    "Enable Public Access"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

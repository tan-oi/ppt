"use client";

import { Button } from "@/components/ui/button";
import {
  Edit,
  MoreHorizontal,
  Pencil,
  Play,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePresentation, renamePresentation } from "@/app/library/action";
import { ShareDialog } from "../share-option";
import { toggleSharePresentation } from "@/app/docs/[id]/action";
import { motion } from "motion/react";
import {
  deletePresentationFromLocal,
  updatePresentationInLocal,
} from "@/lib/local-db";
import { toast } from "sonner";
import { PREVIEW_GRAIN, previewBackground } from "./preview";

interface PresentationCardProps {
  item: {
    id: string;
    topic: string;
    updatedAt: Date;
    isShared?: boolean;
    _count: {
      slides: number;
    };
  };
  index: number;
  onOptimisticDelete: (id: string) => void;
  onOptimisticRename: (id: string, newTopic: string) => void;
  isLocal: boolean;
}

export function PresentationCard({
  item,
  index,
  onOptimisticDelete,
  onOptimisticRename,
  isLocal,
}: PresentationCardProps) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [renameValue, setRenameValue] = useState(item.topic);
  const [isPending, startTransition] = useTransition();
  const [isRenaming, startRenameTransition] = useTransition();
  const renameInputRef = useRef<HTMLInputElement>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (isEditingTitle) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [isEditingTitle]);

  const handleCardClick = () => {
    if (isEditingTitle) {
      handleRename();
      return;
    }
    router.push(`/docs/${item.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    startTransition(async () => {
      setOpenDelete(false);
      onOptimisticDelete(item.id);

      try {
        if (isLocal) {
          await deletePresentationFromLocal(item.id);
        } else {
          await deletePresentation(item.id);
          router.refresh();
        }
      } catch (error) {
        console.error("Failed to delete:", error);
        router.refresh();
        toast.error(
          `Failed to delete presentation: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    });
  };

  const handleRename = () => {
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    if (!isEditingTitle) return;
    const trimmed = renameValue.trim();
    setIsEditingTitle(false);

    if (!trimmed || trimmed === item.topic) {
      setRenameValue(item.topic);
      return;
    }

    const previous = item.topic;
    onOptimisticRename(item.id, trimmed);

    startRenameTransition(async () => {
      try {
        if (isLocal) {
          await updatePresentationInLocal(item.id, { title: trimmed });
        } else {
          const result = await renamePresentation(item.id, trimmed);
          if (!result.success) {
            onOptimisticRename(item.id, previous);
            toast.error(result.error || "Failed to rename");
          }
        }
      } catch (error) {
        onOptimisticRename(item.id, previous);
        toast.error(
          error instanceof Error ? error.message : "Failed to rename"
        );
      }
    });
  };

  const cancelRename = () => {
    cancelledRef.current = true;
    setRenameValue(item.topic);
    setIsEditingTitle(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative rounded-xl border border-neutral-800/50 overflow-visible transition-all duration-300 hover:border-neutral-700/70 shadow-sm hover:shadow-md flex flex-col cursor-pointer group"
      onClick={handleCardClick}
    >
      <div
        className="absolute top-3 right-3 z-10 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {item.isShared && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm">
            <Users className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-medium text-blue-300">Shared</span>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="More"
              className="h-8 w-8 inline-flex items-center justify-center rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-transparent transition-colors cursor-pointer opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-48 bg-neutral-950 border border-neutral-800/50 p-1 rounded-xl shadow-md"
          >
            <DropdownMenuItem
              onSelect={() => {
                setRenameValue(item.topic);
                setIsEditingTitle(true);
              }}
              className="text-sm text-neutral-300 focus:bg-neutral-800/60 focus:text-white cursor-pointer rounded-lg px-2.5 py-2 gap-2.5 [&_svg]:size-4 [&_svg]:text-neutral-500"
            >
              <Pencil />
              Rename
            </DropdownMenuItem>
            {!isLocal && (
              <DropdownMenuItem
                onSelect={() => setOpenShare(true)}
                className="text-sm text-neutral-300 focus:bg-neutral-800/60 focus:text-white cursor-pointer rounded-lg px-2.5 py-2 gap-2.5 [&_svg]:size-4 [&_svg]:text-neutral-500"
              >
                <Share2 />
                Share
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-neutral-800/40 my-1" />
            <DropdownMenuItem
              onSelect={() => setOpenDelete(true)}
              className="text-sm text-red-400 focus:bg-red-500/10 focus:text-red-300 cursor-pointer rounded-lg px-2.5 py-2 gap-2.5 [&_svg]:size-4"
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative h-40 bg-neutral-950 overflow-hidden shrink-0 rounded-t-xl group/preview">
        <div
          className="absolute inset-0"
          style={previewBackground(item.id).style}
        />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: `url("${PREVIEW_GRAIN}")`,
            backgroundSize: "160px 160px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/50 pointer-events-none" />

        <div className="absolute inset-0 bg-neutral-950/25 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/25 ring-1 ring-inset ring-white/10 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <Edit className="w-3 h-3" />
            Open deck
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {isEditingTitle ? (
          <input
            ref={renameInputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleRename();
              } else if (e.key === "Escape") {
                e.preventDefault();
                cancelRename();
              }
            }}
            maxLength={200}
            disabled={isRenaming}
            className="text-sm font-semibold text-white bg-transparent border border-neutral-800/60 hover:border-neutral-700/70 focus:border-neutral-700 rounded-lg px-2 py-1 mb-2 leading-snug w-full outline-none transition-colors"
          />
        ) : (
          <h3 className="text-base font-semibold text-white line-clamp-2 mb-2 leading-snug">
            {item.topic}
          </h3>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="text-xs text-neutral-500 font-medium">
            {item._count.slides}{" "}
            {item._count.slides === 1 ? "slide" : "slides"}{" "}
            <span className="text-neutral-700">·</span>{" "}
            {item.updatedAt.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Link href={`/p/${item.id}`}>
              <Button
                size="sm"
                className="h-7 px-3 text-xs rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                <Play className="w-3 h-3 mr-1" />
                Present
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {!isLocal && (
        <div onClick={(e) => e.stopPropagation()}>
          <ShareDialog
            shareUrl={`${process.env.NEXT_PUBLIC_APP_URL}/p/${item.id}`}
            isShared={item.isShared || false}
            onToggleShare={toggleSharePresentation.bind(
              null,
              item.id,
              item.isShared || false
            )}
            open={openShare}
            onOpenChange={setOpenShare}
          />
        </div>
      )}

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent
          showCloseButton={false}
          className="rounded-lg max-w-sm border border-neutral-800/50 bg-neutral-950 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold text-white">
                  Delete presentation?
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-500 mt-1">
                  This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <p className="text-sm text-neutral-400 leading-relaxed">
              You&apos;re about to permanently delete{" "}
              <span className="font-medium text-neutral-300">
                &quot;{item.topic}&quot;
              </span>{" "}
              and all its slides.
            </p>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-9 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-colors duration-200 cursor-pointer"
                onClick={() => setOpenDelete(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-9 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 cursor-pointer"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

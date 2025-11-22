"use client";

import { Button } from "@/components/ui/button";
import { Edit, Play, Share2, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deletePresentation } from "@/app/library/action";
import { Separator } from "../ui/separator";
import { ShareOption } from "../share-option";
import { toggleSharePresentation } from "@/app/docs/[id]/action";
import { motion } from "motion/react";

interface PresentationCardProps {
  item: {
    id: string;
    topic: string;
    outlineId: string | null;
    updatedAt: Date;
    isShared: boolean;
    _count: {
      slides: number;
    };
  };
  index: number;
  onOptimisticDelete: (id: string) => void;
}

export function PresentationCard({
  item,
  index,
  onOptimisticDelete,
}: PresentationCardProps) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [openShare, setOpenShare] = useState(false);
  const handleCardClick = () => {
    router.push(`/docs/${item.id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Share clicked");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    startTransition(async () => {
      setOpenDelete(false);

      onOptimisticDelete(item.id);

      const result = await deletePresentation(item.id);

      // router.refresh();

      if (!result.success) {
        router.refresh();
        alert(result.error || "Failed to delete presentation");
      }
    });
  };

  return (
    <motion.div
      initial={{
        scale: 0.98,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="relative rounded-xl border border-neutral-800/50 overflow-visible transition-all duration-300 hover:border-neutral-700/70 shadow-sm hover:shadow-md flex flex-col h-[420px] cursor-pointer group"
      onClick={handleCardClick}
    >
      {item.isShared && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm">
          <Users className="w-3 h-3 text-blue-400" />
          <span className="text-xs font-medium text-blue-300">Shared</span>
        </div>
      )}

      <div className="relative h-48 bg-neutral-900/50 overflow-hidden shrink-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id={`radial-${index}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle
            cx="200"
            cy="150"
            r="80"
            fill="none"
            stroke={`url(#radial-${index})`}
            strokeWidth="1"
            opacity="0.6"
          />
          <circle
            cx="200"
            cy="150"
            r="60"
            fill="none"
            stroke={`url(#radial-${index})`}
            strokeWidth="1"
            opacity="0.4"
          />
          <circle
            cx="200"
            cy="150"
            r="40"
            fill="none"
            stroke={`url(#radial-${index})`}
            strokeWidth="1"
            opacity="0.3"
          />
          <circle
            cx="200"
            cy="150"
            r="20"
            fill="none"
            stroke={`url(#radial-${index})`}
            strokeWidth="1"
            opacity="0.2"
          />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const x = 200 + Math.cos(angle) * 70;
            const y = 150 + Math.sin(angle) * 70;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#a855f7"
                opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-5 leading-snug">
          {item.topic}
        </h3>

        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-600 font-medium">Slides</span>
            <span className="text-neutral-300 font-medium">
              {item._count.slides}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-600 font-medium">Edited</span>
            <span className="text-neutral-300 font-medium">
              {item.updatedAt.toDateString()}
            </span>
          </div>
        </div>

        <div
          className="flex gap-2 mt-5 pt-4 border-t border-neutral-800/40"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={`/p/${item.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full h-8 text-xs rounded-lg transition-colors duration-200 font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:scale-[1.01]"
            >
              <Play className="w-3 h-3 mr-1.5" />
              Present
            </Button>
          </Link>
          <Link href={`/docs/${item.id}`}>
            <Button
              size="icon"
              variant={"link"}
              className="h-8 w-8 rounded-md transition-colors duration-200 text-neutral-400 cursor-pointer hover:text-neutral-200 hover:scale-[1.02]"
            >
              <Edit className="w-3 h-3" />
            </Button>
          </Link>

          <Separator orientation="vertical" />

          <ShareOption
            isShared={item.isShared}
            type="minimal"
            shareUrl={`${process.env.NEXT_PUBLIC_APP_URL}/p/${item.id}`}
            presentationId={`${item.id}`}
            onToggleShare={toggleSharePresentation.bind(
              null,
              item.id,
              item.isShared
            )}
          />

          <Separator orientation="vertical" />

          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="link"
                className="h-8 w-8 rounded-md transition-colors duration-200 text-neutral-400 hover:text-red-400 cursor-pointer hover:scale-115"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </DialogTrigger>

            <DialogContent
              showCloseButton={false}
              className="rounded-lg max-w-sm border border-neutral-800/50 bg-neutral-950 shadow-lg"
            >
              <DialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Delete presentation?
                    </h2>
                    <DialogTitle>
                      <p className="text-xs text-neutral-500 mt-1">
                        This action cannot be undone.
                      </p>
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-3 pt-2">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  You're about to permanently delete{" "}
                  <span className="font-medium text-neutral-300 line-clamp-2">
                    "{item.topic}"
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
        </div>
      </div>
    </motion.div>
  );
}

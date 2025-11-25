"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Lock,
  FileQuestion,
  ChevronRight,
  Home,
} from "lucide-react";

export type AccessStatusType = "forbidden" | "deleted";

type Props = {
  type?: AccessStatusType;
  title?: string;
  description?: string;
  backHref?: string;
  homeHref?: string;
  backHrefLabel?: string;
};

export default function AccessStatus({
  type = "forbidden",
  title,
  description,
  backHref,
  backHrefLabel = "library",
  homeHref = "/",
}: Props) {
  const router = useRouter();

  const isDeleted = type === "deleted";

  const config = isDeleted
    ? {
        Icon: FileQuestion,
        label: "404 Error",
        defaultTitle: "Page not found",
        defaultDesc:
          "The presentation or document you are looking for has been deleted or moved to a different workspace.",
        accent: "text-neutral-400",
        buttonPrimary: "bg-white text-black hover:bg-neutral-200",
        light: "bg-neutral-500/10",
      }
    : {
        Icon: Lock,
        label: "403 Access Denied",
        defaultTitle: "Permission required",
        defaultDesc:
          "You do not have the required permissions to view this document. Please contact the file owner for access.",
        accent: "text-amber-500",
        buttonPrimary: "bg-amber-500 text-black hover:bg-amber-400",
        light: "bg-amber-500/10",
      };

  const Icon = config.Icon;

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  const handleHome = () => {
    router.push(homeHref);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] text-neutral-200 font-sans flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      />

      <motion.div
        className="relative z-10 max-w-lg w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 border border-white/5 ${config.light}`}
        >
          <Icon size={24} className={config.accent} />
        </div>

        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-neutral-400">
            {config.label}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white">
            {title ?? config.defaultTitle}
          </h1>

          <p className="text-neutral-400 text-lg leading-relaxed">
            {description ?? config.defaultDesc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleHome}
            className={`inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] focus:ring-neutral-500 ${config.buttonPrimary}`}
          >
            <Home size={16} className="mr-2" />
            {`Go to ${backHrefLabel}`}
          </button>

          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-medium text-neutral-300 border border-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}

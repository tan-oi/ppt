import { useState, useEffect } from "react";
import { Check, Cloud, AlertCircle } from "lucide-react";

export function AutoSaveIndicator({
  isSaving,
  lastSaved,
  error,
}: {
  isSaving: boolean;
  lastSaved: Date | null;
  error: Error | null;
}) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  const getTimeAgo = (date: Date) => {
    if (!date) return "";
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 10) return "just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-zinc-800/30 border border-zinc-700 rounded-lg text-sm">
        <AlertCircle size={14} className="text-red-400" />
        <span className="text-red-400">Save failed</span>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-zinc-800/30 border border-zinc-700 rounded-lg text-sm">
        <Cloud size={14} className="animate-pulse text-blue-400" />
        <span className="text-blue-400">Saving...</span>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-zinc-800/30 border border-zinc-700 rounded-lg text-sm">
        <Check size={14} className="text-green-400" />
        <span className="text-green-400">Saved</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-zinc-800/30 border border-zinc-700 rounded-lg text-sm">
        <Cloud size={14} className="text-zinc-400" />
        <span className="text-zinc-400">Saved {getTimeAgo(lastSaved)}</span>
      </div>
    );
  }

  return null;
}
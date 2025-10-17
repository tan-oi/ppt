"use client";
import { useExportPDF } from "@/lib/hooks/useExportPdf";
import { Download } from "lucide-react";
import { useState } from "react";

export function ExportPdf() {
  const { exportToPDF } = useExportPDF();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        data-widget-interactive
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Download size={18} className="text-zinc-400" />
        <span className="text-sm text-zinc-300">
          {isExporting ? "Exporting..." : "Export PDF"}
        </span>
      </button>
    </div>
  );
}

"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { SLIDE_CONFIG } from "@/lib/config/slide";

export function useExportPDF() {
  const slides = usePresentationStore((s) => s.slides);

  const exportToPDF = async () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [SLIDE_CONFIG.width, SLIDE_CONFIG.height],
    });

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideElement = document.getElementById(slide.id);

      if (!slideElement) {
        console.warn(`Slide ${slide.id} not found`);
        continue;
      }

      const canvas = await html2canvas(slideElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        SLIDE_CONFIG.width,
        SLIDE_CONFIG.height,
        undefined,
        "FAST"
      );

      Object.values(slide.widgets).forEach((widget: any) => {
        if (widget.widgetType === "link" && widget.data?.url) {
          const { x, y, width, height } = widget.position;

          pdf.link(x, y, width, height, {
            url: widget.data.url,
          });
        }
      });
    }

    pdf.save("presentation.pdf");
  };

  return { exportToPDF };
}

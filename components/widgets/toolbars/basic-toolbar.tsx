import { AlignSelector } from "@/components/toolbar/align-selector";
import { ColorSelector } from "@/components/toolbar/color-selector";
import { FontSizeDropDown } from "@/components/toolbar/font-selector";
import { TextFormatting } from "@/components/toolbar/text-formatting";

export function BasicToolbar() {
  return (
    <>
      <FontSizeDropDown />
      <div className="w-px h-8 bg-linear-to-b from-transparent via-zinc-600 to-transparent" />

      <ColorSelector />
      <div className="w-px h-8 bg-linear-to-b from-transparent via-zinc-600 to-transparent" />

      <AlignSelector />
      <div className="w-px h-8 bg-linear-to-b from-transparent via-zinc-600 to-transparent" />

      <TextFormatting />
    </>
  );
}

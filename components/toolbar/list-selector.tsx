"use client";
import { useUIStore } from "@/lib/store/ui-store";
import { BaseDropdown } from "../base/dropdown";

export function ListSelector() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor;

  if (!editor) return null;

  const listOptions = [
    { label: "• Bullet", value: "bullet" },
    { label: "1. Numbered", value: "numbered" },
  ];

  const currentType = editor.isActive("bulletList")
    ? "bullet"
    : editor.isActive("orderedList")
    ? "numbered"
    : "bullet";

  const handleListTypeChange = (value: string | number) => {
    if (value === "bullet") {
      editor.chain().focus().toggleBulletList().run();
    } else if (value === "numbered") {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  return (
    <BaseDropdown
      label="List Type"
      options={listOptions}
      value={currentType}
      onChange={handleListTypeChange}
      tooltip="Change list type"
      className="w-32"
    />
  );
}

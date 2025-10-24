"use client";
import { useEffect, useState } from "react";
import { useUIStore } from "@/lib/store/ui-store";
import { BaseDropdown } from "../base/dropdown";

export function FontSizeDropDown() {
  const [selectedValue, setSelectedValue] = useState<number>(16);

  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor;

  const fontSizeOptions = [
    { label: "Extra Small", value: 12 },
    { label: "Small", value: 14 },
    { label: "Medium", value: 16 },
    { label: "Large", value: 20 },
    { label: "Extra Large", value: 24 },
  ];

  const updateFontSizeUI = () => {
    if (!editor) return;

    const attributes = editor.getAttributes("textStyle");

    if (attributes.fontSize) {
      const size = parseInt(attributes.fontSize.replace("px", ""));
      setSelectedValue(size);
    } else {
      setSelectedValue(16);
    }
  };

  useEffect(() => {
    if (!editor) return;

    updateFontSizeUI();

    const updateHandler = () => {
      updateFontSizeUI();
    };

    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);

    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  const handleFontSizeChange = (value: string | number) => {
    if (!editor) return;

    const numValue = typeof value === "string" ? parseInt(value) : value;

    if (numValue && numValue > 0) {
      const { from, to } = editor.state.selection;

      if (from === to) {
        editor.chain().focus().selectAll().setFontSize(`${numValue}px`).run();
      } else {
        editor.chain().focus().setFontSize(`${numValue}px`).run();
      }
    }
  };

  if (!editor) return null;

  return (
    <BaseDropdown
      label="Font Size"
      options={fontSizeOptions}
      value={selectedValue}
      onChange={handleFontSizeChange}
      tooltip="Choose font size"
      showCustomInput={true}
      inputType="number"
    />
  );
}

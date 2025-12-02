import { useState, useEffect } from "react";

import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";
import { useUIStore } from "@/lib/store/ui-store";
import { BaseDropdown } from "../base/dropdown";

export function AlignSelector() {
  const [align, setAlign] = useState<any>("left");
  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor;

  const alignmentOptions = [
    { label: "Left", icon: <TextAlignLeftIcon size={16} />, value: "left" },
    { label: "Right", icon: <TextAlignRightIcon size={16} />, value: "right" },
    {
      label: "Center",
      icon: <TextAlignCenterIcon size={16} />,
      value: "center",
    },
    {
      label: "Justify",
      icon: <TextAlignJustifyIcon size={16} />,
      value: "justify",
    },
  ];

  const updateAlignment = () => {
    if (!editor) return;

    if (editor.isActive({ textAlign: "left" })) {
      setAlign("left");
    } else if (editor.isActive({ textAlign: "center" })) {
      setAlign("center");
    } else if (editor.isActive({ textAlign: "right" })) {
      setAlign("right");
    } else if (editor.isActive({ textAlign: "justify" })) {
      setAlign("justify");
    } else {
      setAlign("left");
    }
  };

  useEffect(() => {
    if (!editor) return;

    updateAlignment();

    const updateHandler = () => {
      updateAlignment();
    };

    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);

    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  const handleAlignChange = (value: any) => {
    setAlign(value);
    editor.commands.setTextAlign(value);
  };

  if (!editor) return null;

  return (
    <BaseDropdown
      label="Alignment"
      options={alignmentOptions}
      value={align}
      onChange={handleAlignChange}
      tooltip="Choose text alignment"
      showCustomInput={false}
    />
  );
}

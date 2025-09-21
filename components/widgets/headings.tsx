"use client";
import React, { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/store/ui-store";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

interface HeadingWidgetProps {
  content?: string;
  level?: 1 | 2 | 3;
  editable?: boolean;
  id?: string;
  className?: string;
  styles?: any;
}

const HeadingWidget: React.FC<HeadingWidgetProps> = ({
  content = "Your heading text",
  level = 1,
  editable = true,
  className,
  styles,
  id
}) => {
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
  const widgetRef = useRef<HTMLDivElement>(null);
  
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextStyle,
      FontSize.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: [
          "heading",
          "paragraph",
          "image",
          "blockquote",
          "bulletList",
          "orderedList",
        ],
      }),
    ],
    editable,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
    onCreate: ({ editor }) => {
      editor.commands.setTextAlign("center");
      if (level === 1) {
        editor.commands.setFontSize("48px");
      }
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(`<h${level}>${content}</h${level}>`);
    }
  }, [content, editor, level]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!widgetRef.current) return;

    // Get the bounding rectangle of the widget
    const rect = widgetRef.current.getBoundingClientRect();
    
    // Calculate positions
    const position = {
      // Click position relative to viewport
      clickX: event.clientX,
      clickY: event.clientY,
      
      // Widget position relative to viewport
      widgetX: rect.left,
      widgetY: rect.top,
      widgetWidth: rect.width,
      widgetHeight: rect.height,
      
      // Click position relative to widget
      relativeX: event.clientX - rect.left,
      relativeY: event.clientY - rect.top,
      
      // Position for rendering something above the widget
      aboveX: rect.left,
      aboveY: rect.top - 10, // 10px above the widget
      
      // Center of the widget
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };

    updateSelectWidget({
      slideIndex: 1,
      id: id || "heading-widget-1",
      data: {
        editor: editor,
        number: "1",
        position: position, 
      },
      type: "editoral",
    });
  };

  return (
    <div
      ref={widgetRef}
      data-widget
      style={{
        zIndex: "20",
      }}
      onClick={handleClick}
    >
      <div
        className={cn(
          "text-white tracking-wide transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-400 focus-within:ring-offset-1 focus-within:ring-offset-transparent focus-within:rounded",
          className
        )}
      >
        <EditorContent
          editor={editor}
          className={cn(
            "outline-none p-2 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(HeadingWidget);
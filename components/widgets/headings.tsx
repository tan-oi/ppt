"use client";
import React, { useEffect, useState } from "react";
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

// const styles = {
//   1: "text-3xl font-semibold",
//   2: "text-2xl font-semibold",
//   3: "text-xl font-semibold",
// };

const HeadingWidget: React.FC<HeadingWidgetProps> = ({
  content = "Your heading text",
  level = 1,
  editable = true,
  className,
  styles,
  id
}) => {
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
  
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

  // const getHeadingStyle = styles[level as keyof typeof styles] || styles[1];

  return (
    <div
      data-widget
      // className="absolute"
      style={{
        zIndex: "20",
        // top: styles?.y || "400px",

        // left: styles?.x || "400px",
        // width: styles?.width || "180px",
        // height: styles?.height || "250px",
      }}
      onClick={() => {
        updateSelectWidget({
          slideIndex: 1,
          id: "heading-widget-1",
          data: {
            editor: editor,
            number: "1",
          },
          type: "editoral",
        });
      }}
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
      {/* <button
        onClick={() => editor?.commands.setFontSize("60px")}
        className="text-white"
      >
        Set Large Font
      </button>
      <button
        onClick={() => editor?.commands.setFontSize("24px")}
        className="text-white ml-2"
      >
        Set Normal Font
      </button>
      <button
        onClick={() => editor?.commands.unsetFontSize()}
        className="text-white ml-2"
      >
        Reset Font Size
      </button> */}
    </div>
  );
};

export default React.memo(HeadingWidget);

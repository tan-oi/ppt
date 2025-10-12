"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";

interface ParagraphWidgetProps {
  content?: string;
  editable?: boolean;
  className?: string;
  id: string;
  styles?: any;
  slideId: string;
}

export const ParagraphWidget: React.FC<ParagraphWidgetProps> = ({
  content = "Hey! here's a paragraph",
  editable = true,
  className,
  styles,
  id,
  slideId,
}) => {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
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
    content,
    editable,
    onUpdate: ({ editor }) => {
      updateEditBuffer({
        content: editor.getJSON(),
      });
    },
    onCreate: ({ editor }) => {
      editor.commands.setTextAlign("center");
      editor.commands.setFontSize("20px");
    },
  });

  return (
    <>
      <div
        ref={widgetRef}
        className="backdrop-blur-xl text-foreground text-base w-full h-full"
        style={{
          zIndex: "22",

          overflow: "hidden",
        }}
        data-widget
        onClick={() => {
          handleClick({
            editor: editor,
            widgetType: "text",
          });
        }}
      >
        <div>
          <EditorContent
            editor={editor}
            className="outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0 p-1"
          />
        </div>
      </div>
    </>
  );
};

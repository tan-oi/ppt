"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

interface ParagraphWidgetProps {
  content?: string;
  editable?: boolean;
  className?: string;
  id?: string;
  styles?: any;
}

export const ParagraphWidget: React.FC<ParagraphWidgetProps> = ({
  content = "Hey! here's a paragraph",
  editable = true,
  className,
  styles,
}) => {
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
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
      console.log(editor.getJSON());
    },
    onCreate: ({ editor }) => {
      editor.commands.setTextAlign("center");
      editor.commands.setFontSize("20px");
    },
  });

  return (
    <>
      <div
        className="backdrop-blur-xl focus-within:ring-blue-400 focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.3)] focus-within:ring-1 focus-within:rounded focus-within:ring-offset-transparent text-white text-base"
        style={{
          zIndex: "22",
          // top: styles.y,
          // left: styles.x,
          // width: styles.width,
          // height: styles.height,
          overflow: "hidden",
        }}
        data-widget
        onClick={() => {
          updateSelectWidget({
            slideIndex: 2,
            id: "paragraph-widget-1",
            data: {
              editor: editor,
              number: "1",
            },
            type: "editoral",
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

"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/store/ui-store";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
interface HeadingWidgetProps {
  content?: string;
  level?: 1 | 2 | 3;
  editable?: boolean;
  id: string;
  className?: string;
  styles?: any;
  slideId: string;
}

const HeadingWidget: React.FC<HeadingWidgetProps> = ({
  content = "Your heading text",
  level = 1,
  editable = true,
  className,
  styles,
  id,
  slideId,
}) => {

  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  // const widgetRef = useRef<HTMLDivElement>(null);

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
    content: content,
    editable,
    onUpdate: ({ editor }) => {
      console.log("im");
      updateEditBuffer({
        widgetData: {
          content: editor.getJSON(),
        },
      });
    },
    onCreate: ({ editor }) => {
      editor.commands.setTextAlign("center");
      // if (level === 1) {
      //   editor.commands.setFontSize("48px");
      // }
    },
  });

  // useEffect(() => {
  //   if (editor && content) {
  //     editor.commands.setContent(`<h${level}>${content}</h${level}>`);
  //   }
  // }, [content, editor, level]);

  // const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (!widgetRef.current) return;

  //   const rect = widgetRef.current.getBoundingClientRect();

  //   const position = {
  //     widgetX: rect.left,
  //     widgetY: rect.top,

  //     centerX: rect.left + rect.width / 2,
  //     centerY: rect.top + rect.height / 2,
  //   };

  //   updateSelectWidget({
  //     slideIndex: 1,
  //     id: id,
  //     data: {
  //       editor: editor,
  //       number: "1",
  //       position: position,
  //     },
  //     type: "editoral",
  //   });
  // };

  return (
    <div className="w-full h-full"
      ref={widgetRef}
      data-widget
      style={{
        zIndex: "20",
      }}
      onClick={() => {
        handleClick({
          editor: editor,
          widgetType: "text",
        });
      }}
    >
      <div
        className={cn("tracking-wide transition-all duration-200", className)}
      >
        <EditorContent
          editor={editor}
          className={cn(
            "outline-none p-2 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0 text-primary"
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(HeadingWidget);

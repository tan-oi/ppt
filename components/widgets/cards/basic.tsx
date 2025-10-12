import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export const BasicCard = ({
  content = "A card",
  id,
  className,
  editable = true,
  slideId,
}: {
  content: string;
  className?: string;
  editable?: boolean;
  id: string;
  slideId: string;
}) => {
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

  const editor = useEditor({
    immediatelyRender: false,
    content: content,
    extensions: [
      StarterKit,
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
    editable: true,
    onUpdate: ({ editor }) => {
      updateEditBuffer({
        body: editor.getJSON(),
      });
    },
  });

  return (
    <>
      <div
        data-widget
        ref={widgetRef}
        onClick={() => {
          handleClick({
            editor,
            widgetType: "text",
          });
        }}
        className="rounded
        backdrop-blur-xl 
        bg-gray-50/5 text-foreground h-full w-full border border-sm border-secondary overflow-hidden shadow-sm"
      >
        <div
          className={
            (cn("tracking-wide transition-all duration-200 "), className)
          }
        >
          <EditorContent
            editor={editor}
            className={cn(
              "outline-none p-2 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
            )}
          />
        </div>
      </div>
    </>
  );
};

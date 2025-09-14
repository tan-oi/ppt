import { cn } from "@/lib/utils";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export const BasicCard = ({
  body,
  className,
  editable = true,
}: {
  body: string;
  className?: string;
  editable?: boolean;
}) => {
    console.log(body)
  const editor = useEditor({
    immediatelyRender: false,
    content : body,
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
    onCreate: ({ editor }) => {
      editor.commands.setTextAlign("center");

      editor.commands.setFontSize("24px");
    },
  });

  return (
    <>
      <div data-widget className="text-white bg-accent rounded-xl">
        <div
          className={
            (cn(
              "text-white tracking-wide transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-400 focus-within:ring-offset-1 focus-within:ring-offset-transparent focus-within:rounded"
            ),
            className)
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

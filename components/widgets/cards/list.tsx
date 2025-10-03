import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export function ListCard({
  type = "bullet",
  content = "<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>",
  id,
}: {
  type?: "bullet" | "ordered";
  content?: string;
  id: string;
}) {
  const { widgetRef, handleClick } = useWidgetSelection(id);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        blockquote: false,
        codeBlock: false,
        heading: false,
        hardBreak: false,
      }),
      TextStyle,
      FontSize.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["paragraph", "bulletList", "orderedList"],
      }),
    ],
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === "Enter") {
          setTimeout(() => {
            if (
              !editor?.isActive("bulletList") &&
              !editor?.isActive("orderedList")
            ) {
              if (type === "ordered") {
                editor?.commands.toggleOrderedList();
              } else {
                editor?.commands.toggleBulletList();
              }
            }
          }, 0);
        }
        return false;
      },
    },
    content: content,
    onCreate: ({ editor }) => {
      if (type === "ordered" && !content.includes("<ol>")) {
        editor.commands.toggleOrderedList();
      } else if (type === "bullet" && !content.includes("<ul>")) {
        editor.commands.toggleBulletList();
      }
    },
  });

  return (
    <div
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          editor,
          number: "4",
        });
      }}
      className="w-full h-full bg-muted p-4 rounded overflow-hidden"
    >
      <div className="flex gap-2 mb-3 pb-2 border-b border-border/40">
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor?.chain().focus().toggleBulletList().run();
          }}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            editor?.isActive("bulletList")
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent"
          }`}
        >
          • Bullet
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            editor?.chain().focus().toggleOrderedList().run();
          }}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            editor?.isActive("orderedList")
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent"
          }`}
        >
          1. Numbered
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="outline-none text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
      />
    </div>
  );
}

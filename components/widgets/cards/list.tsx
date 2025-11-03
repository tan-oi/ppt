import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export function ListCard({
  type = "bullet",
  content = "<ul><li>First item</li></ul>",
  id,
  slideId,
}: {
  type?: "bullet" | "ordered";
  content?: string;
  id: string;
  slideId: string;
}) {
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

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
    onUpdate: ({ editor }) => {
      updateEditBuffer({
        content: editor.getJSON(),
      });
    },
  });

  return (
    <div
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          editor,
          widgetType: "list",
        });
      }}
      className="w-full h-full backdrop-blur-md bg-gray-50/10 border-white/10 p-6 rounded-lg overflow-hidden shadow-lg hover:bg-white/15  transition-colors"
    >
      <EditorContent
        editor={editor}
        className="outline-none text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:leading-relaxed"
      />
    </div>
  );
}

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
  editable,
}: {
  type?: "bullet" | "ordered";
  content?: string;
  editable: boolean;
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
    editable,

    content: content,
    
    onUpdate: ({ editor }) => {
      if (editable) {
        console.log("dude");
        updateEditBuffer({
          content: editor.getJSON(),
        });
      }
    },
  });

  if (!editable) {
    return (
      <div className="w-full h-full backdrop-blur-md bg-gray-50/10 border-white/10 p-6 rounded-lg overflow-hidden shadow-lg hover:bg-white/15  transition-colors">
        <EditorContent
          editor={editor}
          className="outline-none text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:leading-relaxed"
        />
      </div>
    );
  }
  return (
    <div
      data-widget
      ref={widgetRef}
      onClick={() => {
        handleClick({
          editor: editor,
          widgetType: "list",
          data: {
            type: type,
            content: editor?.getJSON(),
          },
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

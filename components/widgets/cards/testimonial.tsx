"use client";
import { useUIStore } from "@/lib/store/ui-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export const TestimonialWidget = () => {
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [StarterKit],
    content: "hello",
  });

  return (
    <div
      className="absolute bg-red-800 text-white overflow-hidden p-4 rounded-[10px] focus-within:ring-white focus-within:ring-1"
      style={{
        top: "300px",
        left: "600px",
        width: "200px",
        height: "200px",
      }}
      onClick={() => {
        updateSelectWidget({
          slideIndex: 1,
          id: "testimonial-widget-1",
          data: {
            editor: editor,
            number: "2",
          },
          type: "editoral",
        });
      }}
    >
      <EditorContent
        className="outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        editor={editor}
      />
    </div>
  );
};

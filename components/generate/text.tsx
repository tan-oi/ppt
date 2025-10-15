"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export function Text({ className }: { className: string }) {
  const setUserInstruction = useGenerationStore((s) => s.setUserInstruction);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],

    content: " ",
    editorProps: {
      attributes: {
        class: "focus:outline-none p-6 text-md",
      },
    },
    onUpdate: ({ editor }) => {
      setUserInstruction(editor.getText());
    },
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="text-primary text-xl">Paste/Write content</h1>

        <p className="text-muted-foreground text-sm">
          Create a deck by pasting notes, outline or drafting any text content{" "}
        </p>
      </div>
      <div>
        <div className="bg-muted/40 rounded-xl text-primary h-96 w-2xl outline outline-neutral-600">
          <div
            className={cn("w-full h-full", className)}
            onClick={() => editor?.commands.focus()}
          >
            <EditorContent
              editor={editor}
              className="w-full h-full overflow-y-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

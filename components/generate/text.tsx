"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
    <div className="space-y-2">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60">
              <p className="text-xs font-medium text-neutral-500 tracking-widest">
                Create
              </p>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-3 leading-tight text-balance">
              Paste/write content
            </h1>
            <p className="text-neutral-500 text-sm max-w-md leading-relaxed">
              Create a deck by pasting notes, outline or drafting any text
              content{" "}
            </p>
          </div>

          <Link href={"/create"}>
            <Button className="rounded-lg cursor-pointer">Back</Button>
          </Link>
        </div>

        <Separator className="w-full text-zinc-600" />
      </div>
      <div className="p-4">
        <div className="bg-muted/40 rounded-xl text-primary h-50 sm:h-80  max-w-xl sm:max-w-3xl mx-auto outline outline-neutral-600">
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

"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface FeatureCard {
  title: string;
  body: string;
}

export const FeatureCardWidget: React.FC<FeatureCard> = ({ title, body }) => {
  const headingEditor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        heading: false,
      }),
    ],
    content: title,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  const paragraphEditor = useEditor({
    immediatelyRender: false,
    content: body,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });
  return (
    <div
      className="bg-muted p-4 rounded flex flex-col gap-2 overflow-hidden focus-within:ring-white focus-within:ring-1 z-20"
      style={{}}
    >
      <EditorContent
        className="outline-none font-semibold text-primary text-sm
       [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        editor={headingEditor}
      />
      <EditorContent
        className="outline-none leading-5 text-md text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        editor={paragraphEditor}
      />
    </div>
  );
};

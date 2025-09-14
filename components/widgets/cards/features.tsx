"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface FeatureCard {
  title: string;
  body: string;
}

export const FeatureCardWidget: React.FC<FeatureCard> = ({ title, body }) => {
  console.log(title);
  console.log(body);
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
      className="bg-neutral-900/60 p-4 rounded-[10px] flex flex-col gap-2 overflow-hidden focus-within:ring-white focus-within:ring-1"
      style={{}}
    >
      <EditorContent
        className="outline-none font-semibold text-gray-50 text-sm
       [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        editor={headingEditor}
      />
      <EditorContent
        className="outline-none leading-5 text-md text-neutral-400 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        editor={paragraphEditor}
      />
    </div>
  );
};

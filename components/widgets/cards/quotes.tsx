import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Quote } from "lucide-react";

interface QuoteCard {
  body?: string;
  person?: string;
  company?: string;
}
export const QuoteCard = ({
  body = "Good job building this",
  person = "Sam Altman, CEO",
  company = "OpenAI",
}) => {
  const mainEditor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: body,
    onCreate: ({ editor }) => {
      editor.commands.setTextAlign("center");
      editor.commands.setFontSize("32px");
    },
  });

  const secondaryEditor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: person }] },
        { type: "paragraph", content: [{ type: "text", text: company }] },
      ],
    },
  });

  return (
    <>
      <div className="flex flex-col  bg-accent/40 justify-between p-4 rounded-xl focus-within:ring-white focus-within:ring-1 relative z-100 backdrop-blur-xl">
        <Quote
          size={28}
          className="absolute -top-3 -left-2 text-gray-300 rotate-180"
        />
        <Quote
          size={28}
          className="absolute -bottom-2 -right-2 text-gray-300"
        />

        <EditorContent
          editor={mainEditor}
          className="outline-none font-bold text-2xl text-primary [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        />
        <div className="size-10"></div>
        <EditorContent
          editor={secondaryEditor}
          className="outline-none text-foreground font-thin [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
        />
      </div>
    </>
  );
};

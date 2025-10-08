"use client";

import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { useUIStore } from "@/lib/store/ui-store";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface FeatureCard {
  title: string;
  body: string;
  id: string;
  slideId: string;
}

export const FeatureCardWidget: React.FC<FeatureCard> = ({
  title,
  body,
  id,
  slideId,
}) => {
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const { widgetRef: headingRef, handleClick: handleHeadingClick } =
    useWidgetSelection(id, slideId);

  const { widgetRef: paragraphRef, handleClick: handleParagraphClick } =
    useWidgetSelection(id, slideId);

  const headingEditor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      TextStyle,
      FontSize.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image", "blockquote"],
      }),
    ],
    content: title,
    onUpdate: ({ editor }) => {
      updateEditBuffer({
        widgetData: {
          title: editor.getJSON(),
          body: paragraphEditor?.getJSON(),
        },
      });
    },
  });

  const paragraphEditor = useEditor({
    immediatelyRender: false,
    content: body,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
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
    onUpdate: ({ editor }) => {
      updateEditBuffer({
        widgetData: {
          title: editor.getJSON(),
          body: paragraphEditor?.getJSON(),
        },
      });
    },
  });
  return (
    <div
      data-widget
      className="w-full h-full bg-muted p-4 rounded flex flex-col gap-2 overflow-hidden z-20"
      style={{}}
    >
      <div
        ref={headingRef}
        data-widget
        onClick={() => {
          handleHeadingClick({
            editor: headingEditor,
            widgetType: "feature",
          });
        }}
      >
        <EditorContent
          className="outline-none font-semibold text-primary text-sm
        [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
          editor={headingEditor}
        />
      </div>

      <div
        data-widget
        ref={paragraphRef}
        onClick={() => {
          handleParagraphClick({
            editor: paragraphEditor,
            widgetType: "feature",
          });
        }}
      >
        <EditorContent
          className="outline-none leading-5 text-md text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.PrposeMirror]:p-0 [&_.ProseMirror]:m-0"
          editor={paragraphEditor}
        />
      </div>
    </div>
  );
};

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
  editable: boolean;
}

export const FeatureCardWidget: React.FC<FeatureCard> = ({
  title,
  body,
  id,
  slideId,
  editable,
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
    editable: editable,
    onUpdate: ({ editor }) => {
      if (editable) {
        updateEditBuffer({
          title: editor.getJSON(),
          body: paragraphEditor?.getJSON(),
        });
      }
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
    editable,
    onUpdate: ({ editor }) => {
      if (editable) {
        updateEditBuffer({
          title: editor.getJSON(),
          body: paragraphEditor?.getJSON(),
        });
      }
    },
  });

  if (!editable) {
    return (
      <>
        <div
          data-widget
          className="w-full h-full backdrop-blur-md p-4 rounded flex flex-col gap-2 overflow-hidden z-20"
          style={{}}
        >
          <div>
            <EditorContent
              className="outline-none font-heading text-accent text-sm
        [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:m-0"
              editor={headingEditor}
            />
          </div>
          <div>
            <EditorContent
              className="outline-none leading-5 text-md text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.PrposeMirror]:p-0 [&_.ProseMirror]:m-0 font-body"
              editor={paragraphEditor}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      data-widget
      className="w-full h-full bg-gray-50/5 backdrop-blur-xl p-4 rounded flex flex-col gap-2 overflow-hidden z-20"
      style={{}}
    >
      <div
        ref={headingRef}
        data-widget
        onClick={() => {
          handleHeadingClick({
            editor: headingEditor,
            widgetType: "feature",
            data: {
              title: title,
              body: body,
            },
          });
        }}
      >
        <EditorContent
          className="outline-none font-heading text-accent text-sm
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
            data: {
              body: body,
              title: title,
            },
          });
        }}
      >
        <EditorContent
          className="outline-none leading-5 text-md text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.PrposeMirror]:p-0 [&_.ProseMirror]:m-0 font-body"
          editor={paragraphEditor}
        />
      </div>
    </div>
  );
};

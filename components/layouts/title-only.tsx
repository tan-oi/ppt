"use client";
import { useState } from "react";
import Heading from "../widgets/headings";
import { Paragraph } from "../widgets/paragraph";

interface Props {
  title: string;
  subtitle: string;
}

export function TitleOnly(props: Props) {
  const { title, subtitle } = props;
  const [titleChange, setTitleChange] = useState("");
  const [subtitleChange, setSubTitleChange] = useState("");
  return (
    <>
      <div className="w-full h-screen overflow-hidden" style={{}}>
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex flex-col max-w-2xl w-full max-h-1/3 overflow-y-auto overflow-x-hidden items-center gap-2">
            {/* <h2 className="text-gray-50 md:text-5xl font-extralight">
              {title}
            </h2> */}
            <Heading
              level={2}
              content={title}
              onContentChange={(content: string) => setTitleChange(content)}
              className={"text-gray-50 md:text-5xl font-extralight"}
            />

            <Heading
              level={2}
              content={title}
              onContentChange={(content: string) => setTitleChange(content)}
              className={"text-gray-50 md:text-5xl font-extralight"}
            />
            {/* <p className="text-gray-50 md:text-xl font-extralight text-zinc-400">
              {subtitle}
            </p> */}
            <Paragraph
              content={subtitle}
              onContentChange={(content: string) => setSubTitleChange(content)}
              className="text-gray-50 md:text-xl w-full font-extralight text-zinc-400"
            />
          </div>
        </div>
      </div>
    </>
  );
}

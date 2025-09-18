// "use client"
// import React from "react";
// import { experimental_useObject as useObject } from "@ai-sdk/react";

// import { z } from "zod";

// const presentationSchema = z.object({
//   id: z.string(),
//   isModified: z.boolean(),
//   topic: z.string(),
//   slides: z.array(z.any()),
// });

// export default function StreamingDemo() {
//   const { object, submit, isLoading } = useObject({
//     api: "/api/generate-ppt",
//     schema: presentationSchema,

//   });

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <button
//         onClick={() => submit({ topic: "Vaping" })}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         disabled={isLoading}
//       >
//         {isLoading ? "Streaming..." : "Start Stream"}
//       </button>

//       <div className="bg-gray-100 p-4 rounded">
//         <h3 className="font-bold mb-2">Raw Streaming Data:</h3>
//         <pre className="text-sm overflow-auto max-h-96">
//           {JSON.stringify(object?.slides, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }

"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";

// Reuse your slide schema here
const headingWidget = z.object({
  widgetType: z.literal("heading"),
  id: z.string(),
  data: z.object({
    content: z.string(),
    level: z.number().optional(),
  }),
});

const paragraphWidget = z.object({
  widgetType: z.literal("paragraph"),
  id: z.string(),
  data: z.object({
    content: z.string(),
  }),
});

const featureCardWidget = z.object({
  widgetType: z.literal("featureCard"),
  id: z.string(),
  data: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

const widgetSchema = z.union([
  headingWidget,
  paragraphWidget,
  featureCardWidget,
]);

const slideSchema = z.object({
  id: z.string(),
  slideNumber: z.number(),
  heading: z.string(),
  layoutId: z.string(),
  content: z.record(z.string(), widgetSchema),
});

export default function Page() {
  const {
    object: slides,
    submit,
    isLoading,
    stop,
  } = useObject({
    api: "/api/generate-ppt",
    schema: z.array(slideSchema),
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <button
        onClick={() => submit("Presentation about Vaping")}
        disabled={isLoading}
      >
        Generate Slides
      </button>

      {isLoading && (
        <div>
          <p>Generating slides...</p>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      <div>
        {slides?.map((slide, i) => (
          <div key={i}>{JSON.stringify(slide)}</div>
        ))}
      </div>
    </div>
  );
}

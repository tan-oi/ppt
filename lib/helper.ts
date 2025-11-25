import { createWidgetsFromSlots } from "@/components/slideUtils";
import { SLIDE_CONFIG } from "./config/slide";
import { LayoutRegistry } from "./registry/layout";
import { usePresentationStore } from "./store/presentation-store";
import { nanoid } from "nanoid";
import {
  COMPONENT_TO_TYPE,
  TYPE_TO_WIDGET,
  useGenerationStore,
} from "./store/generation-store";
import {
  COMPONENT_PATH_CONVERSION,
  COMPONENT_PATH_TO_WIDGET,
  TIPTAP_TEMPLATES,
} from "./core/widget-metadata";

export function needsTransformation(presentationData: any) {
  if (!presentationData?.slides || presentationData.slides.length === 0)
    return false;

  return presentationData.slides.some(
    (slide: any) => slide.content && !slide.widgets
  );
}

export function transformAndStorePresentation(presentationData: any) {
  if (!presentationData?.slides) {
    console.error("No slides found in presentation data");
    return;
  }

  const { addSlide } = usePresentationStore.getState();

  presentationData.slides.forEach((slide: any) => {
    transformSlideAndStore(slide, addSlide);
  });
}

export function transformSlideAndStore(slideData: any, addSlide: any) {
  const pref = useGenerationStore.getState().imagePreference;
  const layout = LayoutRegistry[slideData.layoutId];
  if (!layout) {
    console.error(`Layout ${slideData.layoutId} not found`);
    return;
  }

  const positionedSlots = createWidgetsFromSlots(
    layout.slots,
    SLIDE_CONFIG.width,
    SLIDE_CONFIG.height,
    SLIDE_CONFIG.columns,
    SLIDE_CONFIG.rows
  );

  const widgets: Record<string, any> = {};

  console.log(positionedSlots);
  Object.entries(slideData.content).forEach(([slotId, slotData]) => {
    const positionedSlot = positionedSlots.find((s) => s.id === slotId);
    if (!positionedSlot) return;

    const layoutSlot = layout.slots.find((s) => s.id === slotId);
    if (!layoutSlot) return;

    let data = slotData;
    console.log(layoutSlot);
    let widgetType = "paragraph";

    //@ts-ignore
    if (pref === "stock" && slotData.imagePrompt) {
      data = {
        imageUrl:
          "https://res.cloudinary.com/dcuxne34n/image/upload/v1761637833/ai-generated-images/jzyhx6xug4nltulbxhgz.png",
        alt: "",
        objectFit: "cover",
      };
    }

    const componentPath =
      layoutSlot.defaultComponentPath || "@/components/widgets/paragraph";
    // const componentName =
    //   componentPath.split("/").pop()?.replace(".tsx", "") || "";

    // console.log(componentName);
    // const genericType = COMPONENT_TO_TYPE[componentName] || "paragraph";
    // console.log(genericType);
    // widgetType = TYPE_TO_WIDGET[genericType] || "paragraph";

    widgetType = COMPONENT_PATH_CONVERSION[componentPath].widgetType;

    // @ts-ignore
    if (TIPTAP_TEMPLATES[widgetType]) {
      try {
        // @ts-ignore
        const template = TIPTAP_TEMPLATES[widgetType];
        if (widgetType === "heading") {
          // @ts-ignore
          if (typeof data.content === "string") {
            // @ts-ignore
            data = { ...data, content: template(data.content) };
          }
        } else if (widgetType === "paragraph") {
          // @ts-ignore
          if (typeof data.content === "string") {
            // @ts-ignore
            data = { ...data, content: template(data.content) };
          }
        } else if (
          widgetType === "featureCard" ||
          widgetType === "basicCard" ||
          widgetType === "quoteCard"
        ) {
          data = template(data);
        }
      } catch (e) {
        console.error("Error converting to Tiptap JSON", e);
      }
    }

    console.log(widgetType);
    // if (genericType === "chart" && slotData?.type) {
    //   const chartMap: Record<string, string> = {
    //     bar: "barChart",
    //     line: "lineChart",
    //     area: "areaChart",
    //     pie: "pieChart",
    //   };
    //   widgetType = chartMap[slotData.type] || "barChart";
    // }

    console.log(slotData);
    widgets[nanoid(7)] = {
      id: nanoid(7),
      widgetType,
      data: data,
      position: {
        x: positionedSlot.x,
        y: positionedSlot.y,
        width: positionedSlot.width,
        height: positionedSlot.height,
      },
    };
  });

  addSlide({
    id: nanoid(10),
    slideNumber: slideData.slideNumber,
    heading: slideData.heading,
    widgets,
    theme: "starter",
  });
}
export function populateStores(slide: any) {
  const addSlide = usePresentationStore.getState().addSlide;

  addSlide(slide);
}

// saveToDbFormat: () => {
//   const { slides, widgets } = get();

//   return slides.map((slide) => {
//     const layout = LayoutRegistry[slide.layoutId];

//     return {
//       ...slide,
//       content: slide.widgetIds.reduce((content, widgetId, index) => {
//         const widget = widgets.find((w) => w.id === widgetId);
//         const layoutKey = layout.slots[index]?.key || `widget-${index}`;

//         content[layoutKey] = {
//           id: widget.id,
//           widgetType: widget.widgetType,
//           data: widget.data,
//           position: widget.position,
//         };

//         return content;
//       }, {}),
//       widgetIds: undefined,
//     };
//   });
// };

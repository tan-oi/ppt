import { createWidgetsFromSlots } from "@/components/slideUtils";
import { SLIDE_CONFIG } from "./config/slide";
import { LayoutRegistry } from "./registry/layout";
import { usePresentationStore } from "./store/presentation-store";
import { nanoid } from "nanoid";
import { COMPONENT_TO_TYPE, TYPE_TO_WIDGET } from "./store/generation-store";

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

// function transformSlideAndStore(slideData: any, addSlide: any) {
//   const layout = LayoutRegistry[slideData.layoutId];
//   if (!layout) {
//     console.error(`Layout ${slideData.layoutId} not found`);
//     return;
//   }

//   const positionedSlots = createWidgetsFromSlots(
//     layout.slots,
//     SLIDE_CONFIG.width,
//     SLIDE_CONFIG.height,
//     SLIDE_CONFIG.columns,
//     SLIDE_CONFIG.rows
//   );

//   const widgets: { [widgetId: string]: any } = {};
//   const contentKeys = Object.keys(slideData.content);

//   contentKeys.forEach((contentKey, index) => {
//     const originalContent = slideData.content[contentKey];
//     const widgetId = nanoid(7);

//     const matchingSlot = positionedSlots.find((slot) => slot.id === contentKey);

//     const position = matchingSlot
//       ? {
//           x: matchingSlot.x,
//           y: matchingSlot.y,
//           width: matchingSlot.width,
//           height: matchingSlot.height,
//         }
//       : originalContent.position || { x: 100, y: 100, width: 200, height: 100 };

//     widgets[widgetId] = {
//       id: widgetId,
//       widgetType: originalContent.widgetType,
//       data: originalContent,
//       position,
//     };
//   });

//   addSlide({
//     id: slideData.id,
//     slideNumber: slideData.slideNumber,
//     heading: slideData.heading,
//     widgets,
//     theme : "starter"
//   });
// }

export function transformSlideAndStore(slideData: any, addSlide: any) {
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

  const widgets: { [widgetId: string]: any } = {};

  Object.keys(slideData.content).forEach((slotId) => {
    const slotData = slideData.content[slotId];

    const positionedSlot = positionedSlots.find((s: any) => s.id === slotId);
    if (!positionedSlot) return;

    const layoutSlot = layout.slots.find((s: any) => s.id === slotId);
    if (!layoutSlot) return;

    console.log(layoutSlot);

    const componentName =
      layoutSlot.defaultComponent?.name ||
      layoutSlot.defaultComponent?.displayName ||
      "ParagraphWidget";
    const genericType = COMPONENT_TO_TYPE[componentName] || "paragraph";
    let widgetType = TYPE_TO_WIDGET[genericType] || "paragraph";

    if (genericType === "chart" && slotData?.type) {
      const chartMap: Record<string, string> = {
        bar: "barChart",
        line: "lineChart",
        area: "areaChart",
        pie: "pieChart",
      };
      widgetType = chartMap[slotData.type] || "barChart";
    }

    widgets[nanoid(7)] = {
      id: nanoid(7),
      widgetType,
      data: slotData,
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

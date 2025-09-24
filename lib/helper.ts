import { createWidgetsFromSlots } from "@/components/slideUtils";
import { SLIDE_CONFIG } from "./config/slide";
import { LayoutRegistry } from "./registry/layout";
import { usePresentationStore } from "./store/presentation-store";
import { nanoid } from "nanoid";

// export function needsTransformation(presentationData: any) {
//   if (!presentationData?.slides || presentationData.slides.length === 0)
//     return false;

//   return presentationData.slides.some((slide: any) => !hasPositions(slide));
// }

// export function hasPositions(slide: any) {
//   if (!slide.content) return true;

//   const contentValues = Object.values(slide.content);
//   if (contentValues.length === 0) return true;

//   return contentValues.every(
//     (content) =>
//       content &&
//       //@ts-ignore
//       content.position !== undefined
//   );
// }

// export function transformAndStorePresentation(presentationData: any) {
//   if (!presentationData?.slides) {
//     console.error("No slides found in presentation data");
//     return;
//   }

//   const { addSlide, addWidget } = usePresentationStore.getState();

//   presentationData.slides.forEach((slide: any) => {
//     transformSlideAndStore(slide, addSlide, addWidget);
//   });
// }

// function transformSlideAndStore(slideData: any, addSlide: any, addWidget: any) {
//   const slideId = slideData.id;

//   const layout = LayoutRegistry[slideData.layoutId];
//   if (!layout) {
//     console.error(`Layout ${slideData.layoutId} not found`);
//     return;
//   }

//   const positionedWidgets = createWidgetsFromSlots(
//     layout.slots,
//     SLIDE_CONFIG.width,
//     SLIDE_CONFIG.height,
//     SLIDE_CONFIG.columns,
//     SLIDE_CONFIG.rows
//   );

//   const widgetIds: string[] = [];
//   const contentKeys = Object.keys(slideData.content);

//   contentKeys.forEach((contentKey, index) => {
//     const originalContent = slideData.content[contentKey];
//     const positionedWidget = positionedWidgets[index];
//     const widgetId = nanoid(7);

//     const position = positionedWidget
//       ? {
//           x: positionedWidget.x,
//           y: positionedWidget.y,
//           width: positionedWidget.width,
//           height: positionedWidget.height,
//         }
//       : originalContent.position;

//     addWidget(
//       {
//         widgetType: originalContent.widgetType,
//         data: originalContent.data,
//         position,
//       },
//       slideId,
//       widgetId
//     );

//     widgetIds.push(widgetId);
//   });

//   addSlide({
//     id: slideId,
//     slideNumber: slideData.slideNumber,
//     heading: slideData.heading,
//     layoutId: slideData.layoutId,
//     widgetIds: widgetIds,
//   });
// }


export function needsTransformation(presentationData: any) {
  if (!presentationData?.slides || presentationData.slides.length === 0)
    return false;


  return presentationData.slides.some((slide: any) => 
    slide.content && !slide.widgets
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

function transformSlideAndStore(slideData: any, addSlide: any) {
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
  const contentKeys = Object.keys(slideData.content);

  contentKeys.forEach((contentKey, index) => {
    const originalContent = slideData.content[contentKey];
    const widgetId = nanoid(7);

 
    const matchingSlot = positionedSlots.find((slot) => slot.id === contentKey);

    const position = matchingSlot
      ? {
          x: matchingSlot.x,
          y: matchingSlot.y,
          width: matchingSlot.width,
          height: matchingSlot.height,
        }
      : originalContent.position || { x: 100, y: 100, width: 200, height: 100 };

    widgets[widgetId] = {
      id: widgetId,
      widgetType: originalContent.widgetType,
      data: originalContent.data,
      position,
    };
  });

  addSlide({
    id: slideData.id,
    slideNumber: slideData.slideNumber,
    heading: slideData.heading,
    widgets, 
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

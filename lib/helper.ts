import { createWidgetsFromSlots } from "@/components/slideUtils";
import { SLIDE_CONFIG } from "./config/slide";
import { LayoutRegistry } from "./registry/layout";
import { usePresentationStore } from "./store/presentation-store";
import { nanoid } from "nanoid";

export function needsTransformation(presentationData: any) {
  if (!presentationData?.slides || presentationData.slides.length === 0)
    return false;

  return presentationData.slides.some((slide: any) => !hasPositions(slide));
}

export function hasPositions(slide: any) {
  if (!slide.content) return true;

  const contentValues = Object.values(slide.content);
  if (contentValues.length === 0) return true;

  return contentValues.every(
    (content) =>
      content &&
      //@ts-ignore
      content.position !== undefined
  );
}

export function transformAndStorePresentation(presentationData: any) {
  if (!presentationData?.slides) {
    console.error("No slides found in presentation data");
    return;
  }

  const { addSlide, addWidget } = usePresentationStore.getState();

  presentationData.slides.forEach((slide: any) => {
    transformSlideAndStore(slide, addSlide, addWidget);
  });
}

function transformSlideAndStore(slideData: any, addSlide: any, addWidget: any) {
  const slideId = slideData.id;

  const layout = LayoutRegistry[slideData.layoutId];
  if (!layout) {
    console.error(`Layout ${slideData.layoutId} not found`);
    return;
  }
  const positionedWidgets = createWidgetsFromSlots(
    layout.slots,
    SLIDE_CONFIG.width,
    SLIDE_CONFIG.height,
    SLIDE_CONFIG.columns,
    SLIDE_CONFIG.rows
  );

  const widgetIds: string[] = [];
  const contentKeys = Object.keys(slideData.content);

  contentKeys.forEach((contentKey, index) => {
    const originalContent = slideData.content[contentKey];
    const positionedWidget = positionedWidgets[index];

    if (positionedWidget) {
      const widgetId = nanoid(7);

      addWidget(
        {
          widgetType: originalContent.widgetType,
          data: originalContent.data,
          position: {
            x: positionedWidget.x,
            y: positionedWidget.y,
            width: positionedWidget.width,
            height: positionedWidget.height,
          },
        },
        slideId,
        widgetId
      );

      widgetIds.push(widgetId);
    }
  });

  addSlide({
    id: slideId,
    slideNumber: slideData.slideNumber,
    heading: slideData.heading,
    layoutId: slideData.layoutId,
    widgetIds: widgetIds,
  });
}

export function populateStores(slide: any) {
  const addSlide = usePresentationStore.getState().addSlide;
  const addWidget = usePresentationStore.getState().addWidget;

  const widgetIds: string[] = [];

  const widgets = Object.values(slide.content).map((widget: any) => {
    const widgetId = widget.id; 
    widgetIds.push(widgetId);

    addWidget(
      {
          widgetType: widget.widgetType,
          data: widget.data,
          position: widget.position,
          id: widgetId
      },
      slide.id,
      widgetId
    );

    return widget;
  });

  addSlide({
      id: slide.id,
      slideNumber: slide.slideNumber,
      heading: slide.heading,
      layoutId: slide.layoutId,
      widgetIds: widgetIds,
     
  });
}

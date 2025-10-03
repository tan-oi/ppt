"use client";
import SlideRenderer from "@/components/slide-render";
import HeadingWidget from "@/components/widgets/headings";
import { createWidgetsFromSlots } from "@/components/slideUtils";
import {
  HeadingAndParagraph,
  OneParagraph,
  TwoColumn,
  textImageTemplate,
  ThreeSections,
  TitleSlide,
} from "@/components/template";

import { ParagraphWidget } from "@/components/widgets/paragraph";
import { FeatureCardWidget } from "@/components/widgets/cards/features";
import { TestimonialWidget } from "@/components/widgets/cards/testimonial";
import { BaseChartRender } from "@/components/widgets/charts/base";
import { DrawerEditing } from "@/components/widgets/drawer";
import { useSlideScale } from "@/lib/hooks/useSlideScale";
import { useWidgetDeselect } from "@/lib/hooks/useWidgetDeselect";
import { SLIDE_CONFIG } from "@/lib/config/slide";
import { LayoutRegistry } from "@/lib/registry/layout";
import { DraggableResizableWrapper } from "@/components/wrapper";
import { BaseEmbed } from "@/components/widgets/embeds/base-embed";
import { BasicCard } from "@/components/widgets/cards/basic";
import { QuoteCard } from "@/components/widgets/cards/quotes";

export default function App() {
  // const [slideScale, setSlideScale] = useState(0.7);

  const slideScale = useSlideScale();
  useWidgetDeselect();
  const widgets = createWidgetsFromSlots(
    TitleSlide,
    SLIDE_CONFIG.width,
    SLIDE_CONFIG.height,
    SLIDE_CONFIG.columns,
    SLIDE_CONFIG.rows
  );
  // useEffect(() => {
  //   const updateScale = () => {
  //     const padding = 40;
  //     const availableWidth = window.innerWidth - padding;
  //     const availableHeight = window.innerHeight - padding;

  //     const scaleX = availableWidth / containerWidth;
  //     const scaleY = availableHeight / containerHeight;

  //     setSlideScale(Math.min(scaleX, scaleY) * 0.9);
  //   };

  //   updateScale();
  //   window.addEventListener("resize", updateScale);
  //   return () => window.removeEventListener("resize", updateScale);
  // }, []);

  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     const target = e.target as HTMLElement;

  //     if (
  //       target.closest("[data-widget]") ||
  //       target.closest("[data-toolbar]") ||
  //       target.closest("[widget-element]") ||
  //       target.closest("[data-drawer]")
  //     )
  //       return;

  //     useUIStore.getState().deselectWidget();
  //   };

  //   document.addEventListener("pointerdown", handleClick, true);
  //   return () => document.removeEventListener("pointerdown", handleClick, true);
  // }, []);
  console.log(LayoutRegistry["title"].slots);
  const slides = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <div className="bg-gray-50 min-h-screen overflow-hidden flex flex-col items-center py-6 font-sans">
        <div className="flex flex-col items-center gap-10 w-full px-16">
          {slides.map((num) => (
            <div
              key={num}
              style={{
                width: SLIDE_CONFIG.width * slideScale,
                height: SLIDE_CONFIG.height * slideScale,
                background: "black",
                borderRadius: "10px",
                paddingInline: "14px",
                paddingBlock: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  transform: `scale(${slideScale})`,
                  transformOrigin: "top left",
                  width: SLIDE_CONFIG.width,
                  height: SLIDE_CONFIG.height,
                  transition: "transform 0.5s ease-out",
                }}
              >
                {/* <SlideRenderer
                  widgets={widgets}
                  containerWidth={SLIDE_CONFIG.width}
                  containerHeight={SLIDE_CONFIG.height}
                /> */}
                <HeadingWidget
                  content={"hello world"}
                  level={1}
                  styles={{
                    x: "400px",
                    y: "400px",
                    height: "250px",
                    width: "200px",
                  }}
                />
                <h1 className="text-white">createWidgetsFromSlots</h1>
                <h2 className="text-white">createWidgetsFromSlots</h2>
                <h3 className="text-white">wtf</h3>

                {/* <ParagraphWidget content="gellow worl" /> */}
                <DraggableResizableWrapper
                  x={300}
                  y={400}
                  width={200}
                  scale={0.8}
                >
                  {/* <FeatureCardWidget title="hello" body="mate"/> */}
                  <QuoteCard />
                </DraggableResizableWrapper>

                {/* <TestimonialWidget /> */}
                {/* <DraggableResizableWrapper x={500} y={100} width={400}>
                  <BaseChartRender type="line" id="chart-101" />
                </DraggableResizableWrapper> */}

                <DraggableResizableWrapper
                  x={100}
                  y={300}
                  width={200}
                  scale={0.8}
                  // height={10}
                  height={10}
                >
                  <BasicCard body={"Holy fuck amanafasfagagagsagagags"} />
                </DraggableResizableWrapper>

                 <BaseEmbed
                  type="notion"
                  link="https://guttural-pyramid-4b2.notion.site/cursor-for-writing-project-2101d155d470809b9becfafa31e965ac?source=copy_link"
                /> 
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

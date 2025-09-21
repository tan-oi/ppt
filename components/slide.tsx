import { SLIDE_CONFIG } from "@/lib/config/slide";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { Button } from "./ui/button";
import { WidgetWrapper } from "./widget-wrapper";

export function Slide({
  data,
  id,
  slideScale,
}: {
  data: any;
  id: string;
  slideScale: number;
}) {
  return (
    <>
      <div
        style={{
          width: SLIDE_CONFIG.width * slideScale,
          height: SLIDE_CONFIG.height * slideScale,
          borderRadius: "10px",
          paddingInline: "14px",
          paddingBlock: "10px",
          background: "black",
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
          className="relative"
        >
          <Button
            onClick={() => {
              console.log(usePresentationStore.getState().slides);

              console.log("#############");

              console.log(usePresentationStore.getState().widgets);
            }}
          >
            holy shit
          </Button>

          {data?.widgetIds.map((ids) => {
            console.log(ids);
            return <WidgetWrapper widgetId={ids} slideScale={slideScale} />;
          })}
        </div>
      </div>
    </>
  );
}

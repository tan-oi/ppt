import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function HeroComponent() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="py-10 md:py-20 flex flex-col items-center space-y-6 max-w-4xl px-4">
        <Badge className="font-mono text-xs">Beta release</Badge>

        <h1 className="text-5xl font-semibold text-white text-center">
          From words to <span className="text-amber-600">polished </span>
          slides, instantly.{" "}
        </h1>

        <p className="text-gray-400 text-sm md:text-base text-center max-w-lg">
          Turn rough ideas or outline into a fully designed deck with structure,
          layout, and visuals
        </p>

        <div className="flex gap-3 items-center">
          <Button className="rounded-xl">Get started for free</Button>
          <Button className="rounded-xl" variant="secondary">
            Watch demo
          </Button>
        </div>
      </div>
    </div>
  );
}

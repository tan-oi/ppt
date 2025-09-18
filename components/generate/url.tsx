import { useGenerationStore } from "@/lib/store/generation-store";
import { Input } from "../ui/input";

export function UrlInput() {
  const setUserInstruction = useGenerationStore((s) => s.setUserInstruction);
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-primary text-xl">Give us the link</h1>

          <p className="text-muted-foreground text-sm">
            Create a deck by just giving a url
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-foreground/60">Link</p>
          <Input
            placeholder="www.firecrawl.dev"
            className="focus-visible:ring-none focus-visible:border-none text-primary rounded-xl py-4"
            type="url"
            onChange={(e) => setUserInstruction(e.target.value)}
          />

          <p className="text-xs text-foreground/40">
            We'll fetch the content from the page and make you a deck
          </p>
        </div>
      </div>
    </>
  );
}

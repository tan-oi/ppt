import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useGenerationStore } from "@/lib/store/generation-store";
export function PresentationOptions({ type, handleClick }: { type: string, handleClick : () => void }) {
  const setSlidesCount = useGenerationStore((s) => s.setSlidesCount);
  return (
    <>
      <div className="flex items-center w-sm gap-2  mx-auto rounded-xl">
        <div>
          <Select onValueChange={(value) => setSlidesCount(Number(value))}>
            <SelectTrigger className="w-[130px] bg-neutral-900 border-none focus-within:border-none rounded-xl text-foreground">
              <SelectValue placeholder="No. of slides" />
            </SelectTrigger>
            <SelectContent className="border-none opacity-80 rounded-xl">
              <SelectGroup>
                {Array.from({ length: 10 }).map((_, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {type === "text" && (
          <>
            <div>
              <Select>
                <SelectTrigger className="w-[130px] bg-neutral-900 border-none focus-within:border-none rounded-xl">
                  <SelectValue className="text-white"  placeholder="Write style" />
                </SelectTrigger>
                <SelectContent className="border-none opacity-80 rounded-xl">
                  <SelectGroup>
                    <SelectLabel>Write style</SelectLabel>
                    <SelectItem value="Preserve">Preserve</SelectItem>

                    <SelectItem value="Extend">Extend</SelectItem>

                    <SelectItem value="Base">Use as base</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Button
          type="submit"
          className="rounded-xl cursor-pointer hover:underline"
          size={"default"}
          onClick={handleClick}
        >
          Continue
        </Button>
      </div>
    </>
  );
}

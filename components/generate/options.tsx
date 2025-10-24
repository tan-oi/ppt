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
import { PresentationTone } from "@/lib/store/generation-store";
export function PresentationOptions({
  type,
  handleClick,
}: {
  type: string;
  handleClick: () => void;
}) {
  const setSlidesCount = useGenerationStore((s) => s.setSlidesCount);

  const setWriteStyle = useGenerationStore((s) => s.setWriteStyle);

  const setTone = useGenerationStore((s) => s.setTone);
  return (
    <>
      <div className="flex items-center gap-2 max-w-2xl mx-auto rounded-xl">
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
              <Select
                onValueChange={(value) =>
                  setWriteStyle(value as "extend" | "base" | "preserve")
                }
              >
                <SelectTrigger className="w-[130px] bg-neutral-900 border-none focus-within:border-none rounded-xl">
                  <SelectValue
                    className="text-white"
                    placeholder="Write style"
                  />
                </SelectTrigger>
                <SelectContent className="border-none opacity-80 rounded-xl">
                  <SelectGroup>
                    <SelectLabel>Write style</SelectLabel>
                    <SelectItem value="preserve">Preserve</SelectItem>

                    <SelectItem value="extend">Extend</SelectItem>

                    <SelectItem value="base">Use as base</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div>
          <Select onValueChange={(value) => setTone(value as PresentationTone)}>
            <SelectTrigger className="w-[130px] text-white bg-neutral-900 border-none focus-within:border-none rounded-xl">
              <SelectValue className="text-white" placeholder="Tone" />
            </SelectTrigger>
            <SelectContent className="border-none opacity-80 rounded-xl">
              <SelectGroup className="text-gray-50">
                <SelectLabel>Presentation Tone</SelectLabel>
                <SelectItem value="professional">Professional</SelectItem>

                <SelectItem value="creative">Creative</SelectItem>

                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

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

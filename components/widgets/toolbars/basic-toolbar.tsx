import { AlignSelector } from "@/components/toolbar/align-selector";
import { ColorSelector } from "@/components/toolbar/color-selector";
import { FontSizeDropDown } from "@/components/toolbar/font-selector";
import { TextFormatting } from "@/components/toolbar/text-formatting";

export function BasicToolbar () {
    return (
        <>
                        <FontSizeDropDown />
                <ColorSelector />
                <AlignSelector />
                <TextFormatting />
        </>
    )
}
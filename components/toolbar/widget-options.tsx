"use client"

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"

export function WidgetOptions () {
    return (
        <>
            <Button widget-element="true" variant={"outline"} className="bg-muted/50 border-none bg-transparent">
                <Trash2 size={16}/>
            </Button>
        </>
    )
}
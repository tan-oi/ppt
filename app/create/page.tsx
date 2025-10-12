import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenIcon } from "@phosphor-icons/react/ssr";
import { Link as LinkIcon, Pen, WandSparkles } from "lucide-react";
import Link from "next/link";
export default function CreatePresentation() {
  return (
    <>
      <div className="bg-background min-h-screen text-foreground flex flex-col items-center pt-20 gap-16">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-foreground text-3xl font-semibold">
            How would you like to get started?
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred method to begin
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={{
              pathname: "/create/generate",
              query: {
                type: "text",
              },
            }}
          >
            <Card className="bg-gradient-to-bl from-zinc-800 via-neutral-900 to-neutral-950 w-xs h-48 px-4 py-6 max-w-md border-none flex flex-col items-center justify-start gap-3 rounded-2xl shadow-lg rounded-xl">
              <CardHeader className="flex flex-col items-center justify-center gap-2 p-0">
                <Pen className="w-8 h-8 text-primary" />
                <CardTitle className="text-lg font-semibold text-foreground whitespace-nowrap">
                  Write with Text
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <p className="text-sm text-muted-foreground">
                  Paste your notes or draft new content, and we’ll shape it into
                  slides.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href={{
              pathname: "/create/generate",
              query: {
                type: "prompt",
              },
            }}
          >
            <Card className="bg-gradient-to-bl from-zinc-800  to-slate-950 w-xs h-48 px-4 py-6 max-w-md border-none flex flex-col items-center justify-start gap-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform rounded-xl cursor-pointer">
              <CardHeader className="flex flex-col items-center justify-center gap-2 p-0">
                <WandSparkles className="w-8 h-8 text-secondary" />
                <CardTitle className="text-lg font-medium text-foreground whitespace-nowrap">
                  Spark with <span className="font-bold">Prompt</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <p className="text-sm text-muted-foreground">
                  Give us a hint, and AI will build the full deck for you.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href={{
              pathname: "/create/generate",
              query: {
                type: "link",
              },
            }}
          >
            <Card className="bg-gradient-to-bl from-zinc-800 via-neutral-900 to-neutral-950 w-xs h-48 px-4 py-6 max-w-md border-none flex flex-col items-center justify-start gap-3 rounded-xl shadow-lg">
              <CardHeader className="flex flex-col items-center justify-center gap-2 p-0">
                <LinkIcon className="w-8 h-8 text-primary" />
                <CardTitle className="text-lg font-semibold text-foreground whitespace-nowrap">
                  Start from Link
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <p className="text-sm text-muted-foreground">
                  Drop in a URL and instantly transform a website into a
                  presentation.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}

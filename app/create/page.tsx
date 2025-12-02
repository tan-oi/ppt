import { FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import * as motion from "motion/react-client";

import { requireUser } from "@/lib/functions/user-check";

export default async function CreatePage() {
  await requireUser();

  return (
    <div className="min-h-screen flex flex-col space-y-6">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60">
              <p className="text-xs font-medium text-neutral-500 tracking-widest">
                Create
              </p>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-3 leading-tight text-balance">
              Get started
            </h1>
            <p className="text-neutral-500 text-sm max-w-md leading-relaxed">
              Choose your preferred method to begin creating your presentation.
            </p>
          </div>

          <Link href={"/library"}>
            <Button className="cursor-pointer rounded-lg">Back</Button>
          </Link>
        </div>

        <Separator className="w-full text-zinc-600" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-4 sm:py-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.1,
                ease: "easeOut",
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Link
            href={{
              pathname: "/create/generate",
              query: {
                type: "text",
              },
            }}
          >
            <motion.div
              variants={{
                hidden: {
                  scale: 0.98,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                },
              }}
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${"border-neutral-800/40 bg-neutral-900/30 hover:border-neutral-700/40 hover:bg-neutral-900/40"}`}
            >
              <TextModePattern />

              <div className="relative p-8 flex flex-col gap-6">
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${"bg-neutral-800/30 border border-neutral-700/30"}`}
                >
                  <FileText className={`w-7 h-7 ${"text-neutral-500"}`} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Create from Text
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Paste your content or write directly. AI organizes it into
                    slides automatically.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/40">
                  <p className="text-xs text-neutral-500 font-medium">
                    AI-powered organization
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
          <Link
            href={{
              pathname: "/create/generate",
              query: {
                type: "prompt",
              },
            }}
          >
            <motion.div
              variants={{
                hidden: {
                  scale: 0.98,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                },
              }}
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${"border-neutral-800/40 bg-neutral-900/30 hover:border-neutral-700/40 hover:bg-neutral-900/40"}`}
            >
              <PromptModePattern />

              <div className="relative p-8 flex flex-col gap-6">
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${"bg-neutral-800/30 border border-neutral-700/30"}`}
                >
                  <Wand2
                    className={`w-7 h-7 text-neutral-500
                  }`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Create with Prompt
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Describe what you want and AI generates a complete
                    presentation from scratch.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/40">
                  <p className="text-xs text-neutral-500 font-medium">
                    Full AI generation
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function TextModePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`vline-${i}`}
          x1={50 + i * 40}
          y1="0"
          x2={50 + i * 40}
          y2="300"
          stroke="url(#text-grad)"
          strokeWidth="1"
          opacity={0.3 - i * 0.03}
        />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <circle
          key={`dot-${i}`}
          cx={Math.random() * 400}
          cy={Math.random() * 300}
          r={Math.random() * 1.2 + 0.3}
          fill="#3b82f6"
          opacity={Math.random() * 0.2 + 0.1}
        />
      ))}
    </svg>
  );
}

function PromptModePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="prompt-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      {Array.from({ length: 5 }).map((_, i) => (
        <circle
          key={`circle-${i}`}
          cx="200"
          cy="150"
          r={40 + i * 30}
          fill="none"
          stroke="url(#prompt-grad)"
          strokeWidth="1"
          opacity={0.4 - i * 0.08}
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 200 + Math.cos(angle) * 20;
        const y1 = 150 + Math.sin(angle) * 20;
        const x2 = 200 + Math.cos(angle) * 120;
        const y2 = 150 + Math.sin(angle) * 120;
        return (
          <line
            key={`ray-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#3b82f6"
            strokeWidth="0.8"
            opacity={0.2}
          />
        );
      })}
    </svg>
  );
}

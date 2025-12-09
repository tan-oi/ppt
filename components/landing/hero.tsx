import * as motion from "motion/react-client";
import { Badge } from "../ui/badge";

import { AuthButton, GuestButton } from "../base/auth-button";
import Link from "next/link";
import { ChevronRight, CloudIcon, UserIcon } from "lucide-react";

function DeckAnimation() {
  return (
    <div
      className="relative flex items-center justify-center w-full h-full"
      style={{ perspective: "1000px" }}
    >
      {[0, 1, 2].map((index) => {
        const isEditor = index === 0;

        return (
          <motion.div
            key={index}
            className={`absolute w-[90vw] md:w-[800px] h-[400px] md:h-[550px] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col hover:-translate-y-4 transition-transform duration-500 ease-out ${
              isEditor ? "bg-[#0a0a0a] ring-1 ring-white/10" : "bg-[#111]"
            }`}
            style={{ zIndex: 3 - index }}
            initial={{
              opacity: 0,
              y: 150,
              rotateX: 45,
              scale: 0.8,
            }}
            animate={{
              opacity: 1 - index * 0.15,
              y: -index * 40,
              rotateX: 0,

              scale: 1 - index * 0.1,
            }}
            transition={{
              duration: 1.4,
              delay: 0.6 + index * 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {isEditor ? (
              <div className="flex flex-col h-full w-full relative">
                <div className="h-14 border-b border-white/10 flex items-center justify-between px-5 bg-[#0F0F0F] shrink-0 z-20">
                  <div className="flex ml-auto items-center gap-3">
                    <div className="hidden md:flex items-center -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-linear-to-br from-amber-500 to-amber-700 border-2 border-[#0F0F0F] flex items-center justify-center text-[9px] text-white font-medium shadow-lg">
                        You
                      </div>
                    </div>
                    <button className="bg-white text-black text-[11px] font-semibold px-4 py-1.5 rounded flex items-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M5 3l14 9-14 9V3z" />
                      </svg>
                      Present
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                  <div className="flex-1 bg-[#121212] p-6 md:p-10 flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    <div className="aspect-video w-full max-w-5xl bg-black border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] rounded-sm p-8 md:p-12 relative overflow-hidden">
                      <div className="flex flex-col h-full z-10 relative">
                        <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                          <div className="space-y-3">
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase">
                              Q3 Strategy
                            </div>
                            <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-none font-bold">
                              Market Expansion
                            </h2>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-white/30 tracking-widest uppercase">
                              Confidential
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 grid grid-cols-12 gap-6">
                          <div className="col-span-8 flex flex-col gap-4">
                            <div className="flex-1 bg-white/2 rounded-xl border border-white/5 p-5 relative overflow-hidden">
                              <div className="flex justify-between items-center mb-4">
                                <div className="text-[10px] text-white/50 tracking-wider uppercase">
                                  Revenue Trajectory
                                </div>
                                <div className="flex gap-2 items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                  <div className="text-[9px] text-white/40 uppercase">
                                    Target
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-x-5 bottom-5 top-12">
                                <svg
                                  className="w-full h-full overflow-visible"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 100 50"
                                >
                                  <defs>
                                    <linearGradient
                                      id="chartGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor="#f59e0b"
                                        stopOpacity="0.2"
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor="#f59e0b"
                                        stopOpacity="0"
                                      />
                                    </linearGradient>
                                  </defs>
                                  <line
                                    x1="0"
                                    y1="12.5"
                                    x2="100"
                                    y2="12.5"
                                    stroke="white"
                                    strokeOpacity="0.05"
                                    strokeWidth="0.5"
                                    strokeDasharray="2"
                                  />
                                  <line
                                    x1="0"
                                    y1="25"
                                    x2="100"
                                    y2="25"
                                    stroke="white"
                                    strokeOpacity="0.05"
                                    strokeWidth="0.5"
                                    strokeDasharray="2"
                                  />
                                  <line
                                    x1="0"
                                    y1="37.5"
                                    x2="100"
                                    y2="37.5"
                                    stroke="white"
                                    strokeOpacity="0.05"
                                    strokeWidth="0.5"
                                    strokeDasharray="2"
                                  />

                                  <path
                                    d="M0,40 C15,35 25,38 40,25 C55,12 70,18 100,5 V50 H0 Z"
                                    fill="url(#chartGradient)"
                                  />
                                  <path
                                    d="M0,40 C15,35 25,38 40,25 C55,12 70,18 100,5"
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                    vectorEffect="non-scaling-stroke"
                                  />

                                  <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                      duration: 1,
                                      delay: 1,
                                      ease: "easeOut",
                                    }}
                                  >
                                    <circle
                                      cx="40"
                                      cy="25"
                                      r="2"
                                      fill="#f59e0b"
                                      stroke="#000"
                                      strokeWidth="1"
                                    />
                                    <rect
                                      x="30"
                                      y="5"
                                      width="20"
                                      height="12"
                                      rx="2"
                                      fill="#1a1a1a"
                                      stroke="#333"
                                      strokeWidth="0.5"
                                    />
                                    <text
                                      x="40"
                                      y="13"
                                      textAnchor="middle"
                                      fontSize="5"
                                      fill="white"
                                      fontFamily="monospace"
                                    >
                                      4.5k
                                    </text>
                                  </motion.g>
                                </svg>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
                                <div className="text-[9px] text-amber-200/60 uppercase mb-1 font-medium tracking-wider">
                                  NPS Score
                                </div>
                                <div className="text-2xl text-amber-500 font-medium">
                                  78
                                </div>
                                <div className="text-[9px] text-amber-500 mt-1 font-medium">
                                  Top Tier
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-4 flex flex-col gap-4">
                            <div className="p-5 rounded-xl bg-linear-to-br from-white/4 to-transparent border border-white/10 relative">
                              <div className="absolute top-3 left-3 text-4xl text-white/10 leading-none select-none">
                                "
                              </div>
                              <p className="text-xs text-white/80 italic leading-relaxed relative z-10 pt-2 pl-1">
                                The new framework allows us to scale efficiently
                                without compromising quality.
                              </p>
                              <div className="mt-4 flex items-center gap-3 pl-1 border-t border-white/5 pt-3">
                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-neutral-700 to-neutral-900 border border-white/10"></div>
                                <div className="text-[9px] leading-tight">
                                  <span className="text-white/90 font-medium block">
                                    Alex Chen
                                  </span>
                                  <span className="text-white/40">
                                    CTO, TechCorp
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-1 p-5 rounded-xl bg-white/2 border border-white/5">
                              <div className="text-[9px] text-white/50 mb-3 tracking-widest uppercase border-b border-white/5 pb-2">
                                Action Items
                              </div>
                              <ul className="space-y-2.5">
                                <li className="flex items-start gap-2.5 text-[10px] text-white/70 leading-relaxed group cursor-default">
                                  <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-amber-500 transition-colors">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-[1px]"></div>
                                  </div>
                                  <span className="group-hover:text-white transition-colors">
                                    Initiate phase 2 deployment
                                  </span>
                                </li>
                                <li className="flex items-start gap-2.5 text-[10px] text-white/70 leading-relaxed group cursor-default">
                                  <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-white/40"></div>
                                  <span className="group-hover:text-white transition-colors">
                                    Review Q3 security audit
                                  </span>
                                </li>
                                <li className="flex items-start gap-2.5 text-[10px] text-white/70 leading-relaxed group cursor-default">
                                  <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-white/40"></div>
                                  <span className="group-hover:text-white transition-colors">
                                    Update team roster
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-[60%] left-[65%] pointer-events-none z-30"
                      animate={{
                        x: [0, -80, -20, 40, 10, 0],
                        y: [0, -40, 60, -20, 30, 0],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-white drop-shadow-md"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="ml-3 px-2 py-1 bg-amber-600 rounded-full text-[9px] font-bold text-white shadow-lg whitespace-nowrap">
                        Configuring Chart...
                      </div>
                    </motion.div>

                    {/* AI FAB */}
                    <div className="absolute bottom-8 right-8 z-30">
                      <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/20 rounded-full shadow-2xl backdrop-blur-md">
                        <div className="w-4 h-4 text-amber-500">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 4L14.4 9.6L20 12L14.4 14.4L12 20L9.6 14.4L4 12L9.6 9.6L12 4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="text-xs text-white/80 font-medium">
                          AI Auto-layout active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full p-8 md:p-12 relative flex flex-col">
                {index === 1 && (
                  <div className="flex h-full gap-6">
                    <div className="w-1/2 h-full bg-white/5 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden relative">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      ></div>
                      <div className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center relative z-10">
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-4 justify-center">
                      <div className="w-3/4 h-8 bg-white/10 rounded mb-2"></div>
                      <div className="space-y-2">
                        <div className="w-full h-2 bg-white/5 rounded"></div>
                        <div className="w-full h-2 bg-white/5 rounded"></div>
                        <div className="w-2/3 h-2 bg-white/5 rounded"></div>
                      </div>
                      <div className="mt-4 w-1/3 h-8 bg-amber-600/20 border border-amber-600/30 rounded"></div>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
                    <div className="w-20 h-20 mb-8 rounded-2xl bg-linear-to-tr from-amber-600/40 to-amber-900/40 border border-white/10 rotate-12 backdrop-blur-md"></div>
                    <div className="w-2/3 h-10 bg-white/10 rounded-lg mb-4"></div>
                    <div className="w-1/3 h-3 bg-white/5 rounded-full"></div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function HeroComponent() {
  return (
    <section className="relative w-full overflow-hidden min-h-[90vh] flex flex-col items-center pt-20 md:pt-32">
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Badge
              variant={"outline"}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/50 text-[10px] tracking-widest text-zinc-400 mb-8 animate-fade-in-up hover:border-white/20 hover:bg-white/10 transition-colors cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981] font-extrabold"></span>
              v1.0 Beta
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[0.9] selection:bg-white selection:text-black"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            From <span className="text-white/40 italic">rough thoughts</span> to{" "}
            <br className="hidden md:block" />
            <span className="relative inline-block mt-2 md:mt-0">
              <span className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full opacity-50"></span>
              <span className="relative text-transparent bg-clip-text bg-linear-to-b from-amber-100 via-amber-300 to-amber-600">
                masterpieces.
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg md:text-xl text-neutral-400 max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Turn messy outlines into persuasive, polished decks.
            <span className="text-neutral-200">
              {" "}
              Structure meets algorithmic beauty.
            </span>
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <GuestButton type="guest" />

            <AuthButton type={"medium"} label="Sign in to get full benefits" />

            {/* <Link href={"https://www.youtube.com/watch?v=V33sitDROyg"}>
              <motion.button
                className="rounded-full px-8 py-2 text-base bg-transparent border border-white/10 text-white transition-all group flex items-center justify-center cursor-pointer"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Watch Demo
              </motion.button>
            </Link> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-3 flex items-center gap-2 text-neutral-400 text-sm selection:bg-amber-500 selection:text-black"
          >
            <p className="">Requires API keys {"(BYOK)"}</p>

            <p className="inline-flex items-center gap-1">
              {" "}
              <span className="select-none">•</span>{" "}
              <Link href={"https://www.youtube.com/watch?v=V33sitDROyg"}>
                <span className="underline">Watch demo</span>{" "}
              </Link>
            </p>
          </motion.div>
        </div>
        <div className="relative w-full max-w-[1000px] h-[300px] md:h-[500px] mt-32 md:mt-36">
          <DeckAnimation />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

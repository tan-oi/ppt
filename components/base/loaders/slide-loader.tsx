import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { GeneratingVisual } from "./generating-visual";
import { FindingVisual } from "./finding-visual";

export function SlideLoader({
  type = "generating",
}: {
  type: "generating" | "finding";
}) {
  const isGenerating = type === "generating";

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden font-sans">
      <motion.div
        className="absolute w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(255, 255, 255, 0.06) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(255, 255, 255, 0.04) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.05) 0px, transparent 50%)
          `,
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center">
        <div className="relative w-60 h-60 mx-auto mb-[60px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <GeneratingVisual />
              </motion.div>
            ) : (
              <motion.div
                key="finding"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <FindingVisual />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-[120px]">
          {" "}
          <motion.h1
            key={type}
            className="text-[3.5rem] font-normal text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {isGenerating ? "Crafting Slides" : "Sourcing Data"}
          </motion.h1>
          <motion.p
            className="text-base text-white/40 font-light tracking-[2px] uppercase mb-[50px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {isGenerating ? "Generating" : "Finding"}
            <span className="inline-block ml-1">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: delay,
                    times: [0, 0.2, 0.4],
                  }}
                >
                  .
                </motion.span>
              ))}
            </span>
          </motion.p>
        </div>
        <motion.div
          className="w-[280px] h-0.5 bg-white/10 mx-auto rounded-sm overflow-hidden relative"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 280 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="absolute h-full w-[40%] rounded-sm"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)`,
            }}
            animate={{
              left: ["-40%", "100%"],
            }}
            transition={{
              duration: isGenerating ? 2 : 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

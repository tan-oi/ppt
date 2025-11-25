import * as motion from "motion/react-client";

export default function SlideLoader() {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
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
        {/* Orb Container */}
        <div
          className="relative w-[200px] h-[200px] mx-auto mb-[70px]"
          style={{ perspective: "1000px" }}
        >
          {/* Orbital Rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border border-white/12 rounded-full"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            initial={{
              x: "-50%",
              y: "-50%",
              rotateX: 75,
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 w-[180px] h-[180px] border border-white/10 rounded-full"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateZ: [360, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            initial={{
              x: "-50%",
              y: "-50%",
              rotateX: 60,
              rotateY: 45,
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 w-[220px] h-[220px] border border-white/8 rounded-full"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            initial={{
              x: "-50%",
              y: "-50%",
              rotateX: 85,
              rotateZ: 30,
            }}
          />

          {/* Orbiting Particles */}
          {[0, -2, -4].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent)",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
                times: [0, 0.1, 0.9, 1],
              }}
              initial={{
                x: "-50%",
                y: "-50%",
              }}
            >
              <div
                className="absolute"
                style={{ transform: "translateX(110px)" }}
              />
            </motion.div>
          ))}

          {/* Main Sphere */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[140px] h-[140px] rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, 
                rgba(255, 255, 255, 0.25) 0%,
                rgba(255, 255, 255, 0.15) 20%,
                rgba(255, 255, 255, 0.08) 50%,
                rgba(255, 255, 255, 0.03) 80%,
                transparent 100%
              )`,
              boxShadow: `
                0 0 60px rgba(255, 255, 255, 0.15),
                0 0 100px rgba(255, 255, 255, 0.08),
                inset 0 0 40px rgba(255, 255, 255, 0.1)
              `,
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            initial={{
              x: "-50%",
              y: "-50%",
            }}
          />
        </div>

        {/* Text Content */}
        <motion.h1
          className="text-[3.5rem] font-normal text-white mb-4 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Crafting Slides
        </motion.h1>

        <motion.p
          className="text-base text-white/40 font-light tracking-[2px] uppercase mb-[50px]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        >
          Generating
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

        <motion.div
          className="w-[280px] h-0.5 bg-white/8 mx-auto rounded-sm overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="absolute h-full w-[40%] rounded-sm"
            style={{
              background: `linear-gradient(90deg, 
                transparent,
                rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.6),
                transparent
              )`,
              backgroundSize: "200% 100%",
            }}
            animate={{
              left: ["-40%", "100%"],
              backgroundPosition: ["0% 50%", "200% 50%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

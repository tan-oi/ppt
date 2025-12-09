import * as motion from "motion/react-client";

export function GeneratingVisual() {
  return (
    <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
      <motion.div
        className="absolute top-0 left-0 w-full h-full border border-white/10 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        initial={{ rotateX: 75 }}
      />
      <motion.div
        className="absolute top-[5%] left-[5%] w-[90%] h-[90%] border border-white/10 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateZ: [360, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        initial={{ rotateX: 60, rotateY: 45 }}
      />
      <motion.div
        className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border border-white/10 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        initial={{ rotateX: 85, rotateZ: 30 }}
      />

      {[0, -2].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-1"
          animate={{ rotate: [0, 360], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay }}
          initial={{ x: "-50%", y: "-50%" }}
        >
          <div
            className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
            style={{ transform: "translateX(120px)" }}
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm"
        style={{
          boxShadow:
            "inset 0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(255,255,255,0.05)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        initial={{ x: "-50%", y: "-50%" }}
      />
    </div>
  );
}

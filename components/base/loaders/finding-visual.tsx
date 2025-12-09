import * as motion from "motion/react-client";
export function FindingVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute border border-white/5 rounded-full"
          style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: i * 0.1 }}
        />
      ))}

      <motion.div
        className="absolute w-full h-full rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 60deg, rgba(255, 255, 255, 0.15) 120deg, transparent 180deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute w-full h-full border border-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />

      <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />

      {[
        { x: 30, y: -40, d: 0 },
        { x: -50, y: 20, d: 1.2 },
        { x: 40, y: 60, d: 2.1 },
        { x: -20, y: -60, d: 0.8 },
      ].map((blip, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: blip.d,
            ease: "easeInOut",
          }}
          style={{
            x: blip.x,
            y: blip.y,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </div>
  );
}

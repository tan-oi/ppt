"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
export function CallToAction() {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "pro" }),
      });

      const data = await res.json();

      window.location.href = data.checkout_url;
    } catch (_) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full space-y-8 text-center relative z-10">
        <div className="space-y-2">
          <div className="text-xs tracking-widest text-primary/60 uppercase font-medium">
            ✨ Ready to begin
          </div>
          <motion.div
            animate={{
              x: ["-100%", "100%", "-100%"],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto"
          />
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
            Create presentations
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            that captivate
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
          Beautiful, professional decks generated in seconds. No design skills
          required.
        </p>

        <div className="pt-4">
          <button
            onClick={handleBuy}
            className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-medium text-background bg-foreground rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 active:scale-95 hover:rotate-3 hover:cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Creating
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground/50 pt-4">
          Join • No credit card required
        </p>
      </div>
    </div>
  );
}

"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useUIStore } from "@/lib/store/ui-store";
import { AuthButton } from "../base/auth-button";
export function CallToAction() {
  const toggleAuth = useUIStore((s) => s.toggleAuth);
  // const handleBuy = async () => {
  //   try {
  //     const res = await fetch("/api/checkout", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ key: "pro" }),
  //     });

  //     const data = await res.json();

  //     window.location.href = data.checkout_url;
  //   } catch (_) {}
  // };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-muted/30 pointer-events-none" />
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
            className="h-px w-12 bg-linear-to-r from-transparent via-primary/40 to-transparent mx-auto"
          />
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground to-muted-foreground">
            Create presentations
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            that captivate
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
          Beautiful, professional decks generated in seconds. No design skills
          required.
        </p>

        <div className="pt-4 flex flex-col gap-2 w-fit mx-auto">
          <AuthButton type="large" label="Start creating" />

          <p className="text-xs text-muted-foreground/50 pt-4">
            Join • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, X, Command, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useUIStore } from "@/lib/store/ui-store";

export default function Signin() {
  const showAuth = useUIStore((s) => s.showAuth);
  const toggleAuth = useUIStore((s) => s.toggleAuth);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/library",
      });
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={showAuth} onOpenChange={toggleAuth}>
      <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none sm:max-w-[380px] focus:outline-none [&>button]:hidden">
        <DialogTitle className="sr-only">Sign In</DialogTitle>

        <div className="relative w-full bg-[#09090b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-white/10 to-transparent opacity-100 pointer-events-none" />

          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-soft-light"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 0)`,
              backgroundSize: "16px 16px",
            }}
          />

          <button
            type="button"
            onClick={() => toggleAuth(false)}
            className="absolute top-4 right-4 z-50 p-2 text-zinc-500 hover:text-zinc-200 transition-colors rounded-full hover:bg-white/5 outline-none"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 flex flex-col items-center p-8 pt-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full" />
              <div className="relative w-14 h-14 bg-linear-to-b from-zinc-800 to-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                <Command className="w-7 h-7 text-white" />
              </div>
            </motion.div>

            <div className="text-center space-y-2 mb-8">
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-medium text-white tracking-tight"
              >
                Welcome to Glyph
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[13px] text-zinc-400 max-w-60 leading-relaxed mx-auto"
              >
                Sign in to access your private workspace and generate
                presentations.
              </motion.p>
            </div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full space-y-3"
            >
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="group relative w-full h-12 bg-white text-black font-medium rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-100 active:scale-[0.98] disabled:opacity-80 overflow-hidden shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-600" />
                    <span className="text-sm">Connecting...</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10" />

                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-semibold tracking-tight">
                      Continue with Google
                    </span>
                  </>
                )}
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-2 text-[11px] text-zinc-500 font-medium"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Secure, passwordless authentication</span>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

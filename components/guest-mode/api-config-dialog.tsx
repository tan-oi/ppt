"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useApiConfigStore } from "@/lib/store/guest-mode-store";

import { toast } from "sonner";
import { X, Key, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import { GROQ_MODELS, REPLICATE_MODELS } from "@/lib/const";
import { useUIStore } from "@/lib/store/ui-store";
import { usePathname, useRouter } from "next/navigation";

export function GuestModeDialog() {
  const path = usePathname();
  const router = useRouter();
  const config = useApiConfigStore((s) => s.config);
  const updateConfig = useApiConfigStore((s) => s.updateConfig);

  const showConfig = useUIStore((s) => s.showConfig);
  const setShowConfig = useUIStore((s) => s.setShowConfig);
  const [groqKey, setGroqKey] = useState("");
  const [replicateKey, setReplicateKey] = useState("");
  const [groqModel, setGroqModelLocal] = useState("");
  const [replicateModel, setReplicateModelLocal] = useState("");

  useEffect(() => {
    setGroqKey(config.groqApiKey);
    setReplicateKey(config.replicateApiKey);
    setGroqModelLocal(config.groqModel);
    setReplicateModelLocal(config.replicateModel);
  }, [config]);

  console.log(showConfig);
  const handleSave = async () => {
    if (!groqKey.trim()) {
      toast.error("Groq API key is required");
      return;
    }

    updateConfig({
      groqApiKey: groqKey.trim(),
      replicateApiKey: replicateKey.trim(),
      groqModel,
      replicateModel,
    });

    if (path === "/") {
      router.push("/library");
      toast.success("Api keys initialized, redirecting to dashboard");
    } else toast.success("Api keys initialized, you can continue creating.");

    setShowConfig(false);
  };

  return (
    <Dialog open={showConfig} onOpenChange={setShowConfig}>
      <DialogContent className="p-0 bg-transparent border-0 shadow-none sm:max-w-[480px] focus:outline-none [&>button]:hidden max-h-[95vh] overflow-y-hidden">
        <DialogTitle className="sr-only">API configuration</DialogTitle>

        <div className="relative w-full bg-[#09090b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-white/10 to-transparent opacity-100 pointer-events-none" />

          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-saturation"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 0)`,
              backgroundSize: "16px 16px",
            }}
          />

          <button
            type="button"
            onClick={() => setShowConfig(false)}
            className="absolute top-4 right-4 z-50 p-2 text-zinc-500 hover:text-zinc-200 transition-colors rounded-full hover:bg-white/5 outline-none"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 flex flex-col px-8 py-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 relative flex justify-center"
            >
              <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full" />
              <div className="relative w-14 h-14 bg-linear-to-b from-zinc-800 to-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                <Key className="w-7 h-7 text-white" />
              </div>
            </motion.div>

            <div className="text-center space-y-2 mb-6">
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-medium text-white tracking-tight"
              >
                Add your api keys
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[13px] text-zinc-400 max-w-80 leading-relaxed mx-auto"
              >
                Add API keys and get started, keys are stored locally and never
                sent to saved on the server.
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="groq-key"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Groq API Key *
                  </Label>
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                  >
                    Get your key
                  </a>
                </div>
                <Input
                  id="groq-key"
                  type="text"
                  placeholder="gsk_..."
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus:border-indigo-500/50"
                />
                <div className="space-y-2">
                  <Label
                    htmlFor="groq-model"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Groq Model
                  </Label>
                  <Select value={groqModel} onValueChange={setGroqModelLocal}>
                    <SelectTrigger
                      id="groq-model"
                      className="bg-zinc-900/50 border-white/10 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      {GROQ_MODELS.map((model) => (
                        <SelectItem
                          key={model.value}
                          value={model.value}
                          className="text-white focus:bg-zinc-800"
                        >
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="replicate-key"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Replicate API Key
                  </Label>
                  <a
                    href="https://replicate.com/account/api-tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                  >
                    Get your key
                  </a>
                </div>
                <Input
                  id="replicate-key"
                  type="text"
                  placeholder="r8_..."
                  value={replicateKey}
                  onChange={(e) => setReplicateKey(e.target.value)}
                  className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus:border-indigo-500/50"
                />
                <div className="space-y-2">
                  <Label
                    htmlFor="replicate-model"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Replicate Model
                  </Label>
                  <Select
                    value={replicateModel}
                    onValueChange={setReplicateModelLocal}
                  >
                    <SelectTrigger
                      id="replicate-model"
                      className="bg-zinc-900/50 border-white/10 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      {REPLICATE_MODELS.map((model) => (
                        <SelectItem
                          key={model.value}
                          value={model.value}
                          className="text-white focus:bg-zinc-800"
                        >
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 space-y-3"
            >
              <button
                type="button"
                onClick={handleSave}
                className="group relative w-full h-12 bg-white text-black font-medium rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-100 active:scale-[0.98] overflow-hidden shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10" />
                <span className="text-sm font-semibold tracking-tight relative z-20">
                  Confirm Config
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

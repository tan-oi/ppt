"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function LoginGate() {
  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const showAuth = useUIStore((s) => s.showAuth);
  const setShowAuth = useUIStore((s) => s.toggleAuth);

  const showConfig = useUIStore((s) => s.showConfig);
  const setShowConfig = useUIStore((s) => s.setShowConfig);

  useEffect(() => {
    if (params.get("login") === "true" && !showAuth) {
      setShowAuth(true);
      router.replace("/");
    }

    if (params.get("config") === "true" && !showConfig) {
      setShowConfig(true);
      router.replace(path);
    }
  }, [params, showAuth, setShowAuth, router, showConfig, setShowConfig]);

  return null;
}

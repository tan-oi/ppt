"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginGate() {
  const params = useSearchParams();
  const router = useRouter();
  const show = useUIStore((s) => s.showAuth);
  const setShowAuth = useUIStore((s) => s.toggleAuth);

  useEffect(() => {
    if (params.get("login") === "true" && !show) {
      setShowAuth(true);
      router.replace("/");
    }
  }, [params, show, setShowAuth, router]);

  return null;
}
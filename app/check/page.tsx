"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
export default function Check() {
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-9 px-4 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 cursor-pointer">
            Join
          </Button>
        </DialogTrigger>

        <DialogContent
          className="w-sm rounded-xl px-8 py-6"
          showCloseButton={false}
        >
          <div className="flex flex-col gap-1 justify-center items-center gap-2">
            <DialogHeader className="text-xl text-foreground">
              Welcome {":)"}
            </DialogHeader>

            <DialogTitle className="text-md text-zinc-300">
              Create, manage and share presentations
            </DialogTitle>

            <Button
              className="rounded-lg w-full px-6 py-3 cursor-pointer mt-4"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                "Continue with Google"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

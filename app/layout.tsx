import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toolbar } from "@/components/toolbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { LoginGate } from "@/components/base/user-auth";
import Signin from "@/components/sign-in";
import { GuestModeDialog } from "@/components/guest-mode/api-config-dialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glyph",
  description: "Elegant and polished decks.",

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}
      >
        <NuqsAdapter>{children}</NuqsAdapter>

        <Toolbar />
        <Toaster richColors />

        <Suspense fallback={null}>
          <LoginGate />
        </Suspense>
        <GuestModeDialog />
        <Signin />
      </body>
    </html>
  );
}

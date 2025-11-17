import { CallToAction } from "@/components/landing/cta";
import { FaqsSection } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { HeroComponent } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import Image from "next/image";

export default function App() {
  return (
    <>
      <div className="bg-background scroll-smooth">
        <Navbar />
        <div className="min-h-screen">
          <div className="pt-28 w-full">
            <HeroComponent />
            <div className="max-w-7xl min-h-screen p-8 bg-card mx-auto rounded-xl mt-10">
              <Image
                src={"/demo.png"}
                width={800}
                height={100}
                className="w-full"
                alt="demo image"
              />
            </div>

            <div className="mt-4 w-full">
              <Features />
            </div>

            <div className="mt-4">
              <FaqsSection />
            </div>

            <div className="mt-4">
              <CallToAction />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

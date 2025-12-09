import { CallToAction } from "@/components/landing/cta";
import { FaqsSection } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { HeroComponent } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";

export default function App() {
  return (
    <>
      <div className="bg-background scroll-smooth">
        <Navbar />
        <div className="min-h-screen ">
          <div className="w-full">
            <HeroComponent />

            <div className="mt-8 w-full">
              <Features />
            </div>
            <div className="mt-8">
              <FaqsSection />
            </div>
            <div className="mt-8">
              <CallToAction />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

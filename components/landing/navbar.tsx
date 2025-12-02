import { Icon } from "@/lib/icon";
import { AuthButton } from "../base/auth-button";


export function Navbar() {
  return (
    <header>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-fit">
        <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full pl-2 pr-2 py-2 flex gap-1 items-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pl-3 pr-4 border-r border-white/10 mr-2 shrink-0">
            <Icon className="w-7 h-7  text-amber-500 shadow-amber-800 border-0" />

            <span className="font-semibold tracking-tight text-sm text-white">
              Glyph
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-zinc-400 mr-2 shrink-0">
            <a
              href="#features"
              className="hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
            >
              Features
            </a>

            <a
              href="#faq"
              className="hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
            >
              FAQ
            </a>
            <a
              href="#roadmap"
              className="hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
            >
              Roadmap
            </a>
          </div>

          <div />

          <div className="flex items-center gap-2 pl-2 sm:border-l border-white/10">
            <AuthButton type="small" label={"Get started"} />
          </div>
        </div>
      </nav>
    </header>
  );
}

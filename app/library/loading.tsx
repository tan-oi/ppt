import { Users } from "lucide-react";

function ShimmerCard({ index }: { index: number }) {
  return (
    <div className="relative rounded-lg border border-neutral-800/50 overflow-visible flex flex-col h-[420px] animate-pulse">
     
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800/30 border border-neutral-700/30 backdrop-blur-sm">
        <div className="w-3 h-3 rounded-full bg-neutral-700/50" />
        <div className="w-12 h-3 rounded bg-neutral-700/50" />
      </div>

    
      <div className="relative h-48 bg-neutral-900/50 overflow-hidden flex-shrink-0">
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id={`shimmer-radial-${index}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#525252" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#404040" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle
            cx="200"
            cy="150"
            r="80"
            fill="none"
            stroke={`url(#shimmer-radial-${index})`}
            strokeWidth="1"
            opacity="0.4"
          />
          <circle
            cx="200"
            cy="150"
            r="60"
            fill="none"
            stroke={`url(#shimmer-radial-${index})`}
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Title shimmer */}
        <div className="space-y-2 mb-5">
          <div className="h-4 bg-neutral-800/60 rounded w-3/4" />
          <div className="h-4 bg-neutral-800/60 rounded w-1/2" />
        </div>

        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between">
            <div className="h-3 bg-neutral-800/40 rounded w-12" />
            <div className="h-3 bg-neutral-800/60 rounded w-8" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-neutral-800/40 rounded w-12" />
            <div className="h-3 bg-neutral-800/60 rounded w-20" />
          </div>
        </div>

      
        <div className="flex gap-2 mt-5 pt-4 border-t border-neutral-800/40">
          <div className="flex-1 h-8 bg-neutral-800/60 rounded-md" />
          <div className="h-8 w-8 bg-neutral-800/40 rounded-md" />
          <div className="w-px h-8 bg-neutral-800/40" />
          <div className="h-8 w-8 bg-neutral-800/40 rounded-md" />
          <div className="w-px h-8 bg-neutral-800/40" />
          <div className="h-8 w-8 bg-neutral-800/40 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function LibraryShimmer() {
  return (
    <div className="min-h-screen flex flex-col space-y-6 max-w-7xl mx-auto">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60">
              <div className="h-3 w-12 bg-neutral-800/60 rounded animate-pulse" />
            </div>
            
            <div className="space-y-3 mb-3">
              <div className="h-12 bg-neutral-800/60 rounded w-64 animate-pulse" />
            </div>
            
        
            <div className="h-4 bg-neutral-800/40 rounded w-96 animate-pulse" />
          </div>
          
         
          <div className="h-10 w-40 bg-neutral-800/60 rounded-md animate-pulse" />
        </div>

        <div className="w-full h-px bg-zinc-600/50" />
      </div>

      
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
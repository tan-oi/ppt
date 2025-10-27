export default function LoadingShimmer() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1 space-y-4">
            <div className="w-20 h-7 bg-neutral-800/60 rounded-full" />
            <div className="w-64 h-14 bg-neutral-800/60 rounded-lg" />
            <div className="w-96 h-5 bg-neutral-800/40 rounded" />
          </div>
          <div className="w-20 h-10 bg-neutral-800/60 rounded-lg" />
        </div>
        <div className="w-full h-px bg-neutral-800/40" />
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="space-y-2">
          <div className="w-12 h-4 bg-neutral-800/40 rounded" />
          <div className="w-full h-12 bg-neutral-800/60 rounded-xl" />
        </div>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-32 h-8 bg-neutral-800/60 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

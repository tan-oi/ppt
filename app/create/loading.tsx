export default function CreatePageShimmer() {
  return (
    <div className="min-h-screen flex flex-col space-y-6 animate-pulse">
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

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-neutral-800/40 bg-neutral-900/30"
            >
              <div className="relative p-8 flex flex-col gap-6">
                <div className="w-14 h-14 rounded-lg bg-neutral-800/60" />

                <div className="space-y-2">
                  <div className="w-48 h-6 bg-neutral-800/60 rounded" />
                  <div className="w-full h-4 bg-neutral-800/40 rounded" />
                  <div className="w-3/4 h-4 bg-neutral-800/40 rounded" />
                </div>

                <div className="pt-4 border-t border-neutral-800/40">
                  <div className="w-32 h-3 bg-neutral-800/40 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

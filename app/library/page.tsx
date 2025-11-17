import { NewPresentation } from "@/components/library/new-presentation";
import { PresentationList } from "@/components/library/presentation-list";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { getLibraryData } from "@/lib/functions/getPresentation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreditViewer } from "@/components/library/credit-viewer";

export default async function Library() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.user) return redirect("/check");

  const userId = session?.user?.id;
  const getLibrary = await getLibraryData(userId);

  if (!getLibrary?.success || !getLibrary.planDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load presentations and credits</p>
      </div>
    );
  }
  // console.log(getLibrary);
  const { presentations, planDetails } = getLibrary;

  return (
    <div className="min-h-screen flex flex-col space-y-6 max-w-7xl mx-auto backdrop-blur-xl">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60">
              <p className="text-xs font-medium text-neutral-500 tracking-widest">
                Decks
              </p>
            </div>
            <h1 className="text-5xl font-semibold text-foreground mb-3 leading-tight text-balance">
              Your Decks
            </h1>
            <p className="text-neutral-500 text-sm max-w-md leading-relaxed">
              Create, manage, and present your ideas with precision.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <CreditViewer
              credits={planDetails.credit as number}
              currentPlan={planDetails.currentPlan as string}
            />
            <NewPresentation />
          </div>
        </div>

        <Separator className="w-full text-zinc-600" />
      </div>

      <PresentationList initialPresentations={presentations || []} />
    </div>
  );
}

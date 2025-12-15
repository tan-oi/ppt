import { NewPresentation } from "@/components/library/new-presentation";
import { Separator } from "@/components/ui/separator";

import { getLibraryData } from "@/lib/functions/getPresentation";

import { CreditViewer } from "@/components/library/credit-viewer";
import { preloadUserCache } from "@/lib/functions/userCache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PresentationList } from "@/components/library/presentation-list";
import { AboutPresentation } from "@/lib/types";
import { GuestButton } from "@/components/base/auth-button";

export default async function Library() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  console.log(userId);
  let data = null;
  let cloudPresentations: AboutPresentation[] = [];

  if (userId) {
    // data = await preloadUserCache(userId, ["plan", "credits"]);
    const getLibrary = await getLibraryData(userId);
    if (getLibrary?.success && getLibrary.presentations) {
      cloudPresentations = getLibrary.presentations;
    }
  }

  return (
    <div className="min-h-screen flex flex-col space-y-6 max-w-7xl mx-auto backdrop-blur-xl">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="sm:flex items-start justify-between space-y-2 sm:space-y-0 gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60">
              <p className="text-xs font-medium text-neutral-500 tracking-widest">
                Decks
              </p>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-3 leading-tight text-balance">
              Your Decks
            </h1>
            <p className="text-neutral-500 text-sm max-w-md leading-relaxed">
              Create, manage, and present your ideas with precision.
            </p>
            <p className="text-neutral-600 text-xs font-bold">
              {cloudPresentations.length === 0
                ? "All the decks are retrieved from your local storage"
                : "All the decks are retrieved from cloud"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {/* {userId && data && (
              <CreditViewer
                credits={data?.credits as number}
                currentPlan={data?.plan as string}
              />
            )} */}
            <NewPresentation userId={userId ?? null} />
            <GuestButton type="config"/>
          </div>
        </div>

        <Separator className="w-full text-zinc-600" />
      </div>

      <PresentationList
        initialCloudPresentations={cloudPresentations}
        userId={userId}
      />
    </div>
  );
}

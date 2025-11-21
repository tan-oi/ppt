import { Presentation } from "@/components/presentation";
import { ShareOption } from "@/components/share-option";
import { auth } from "@/lib/auth";
import { getPresentationById } from "@/lib/functions/getPresentation";
import { headers } from "next/headers";
import { toggleSharePresentation } from "./action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/functions/user-check";

export default async function PresentationDoc({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await requireUser()).id;

  const { id } = await params;
  const toBeGen = id.startsWith("ai-");
  console.log(id);
  let presentationData = null;

  if (!toBeGen) {
    presentationData = await getPresentationById(id, userId);
    if (!presentationData) {
      return <p className="text-white">Presentation not found</p>;
    }
  }

  return (
    <>
      <Presentation
        llmToBeCalled={toBeGen}
        presentationData={presentationData}
        id={id}
      />
      <div className="fixed top-4 right-4 z-50 backdrop-blur-xl px-4 py-2 rounded-xl flex items-center gap-2">
        {!toBeGen && presentationData && (
          <ShareOption
            type="normal"
            shareUrl={`${process.env.NEXT_PUBLIC_APP_URL}/p/${id}`}
            isShared={presentationData.isShared}
            presentationId={id}
            onToggleShare={async () => {
              "use server";
              return await toggleSharePresentation(
                id,
                presentationData!.isShared
              );
            }}
          />
        )}
        <Link href="/library">
          <Button variant="default" size="sm">
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

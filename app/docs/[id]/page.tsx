import { Presentation } from "@/components/presentation";
import { ShareOption } from "@/components/share-option";
import { auth } from "@/lib/auth";
import { getPresentationById } from "@/lib/functions/getPresentation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toggleSharePresentation } from "./action";

export default async function PresentationDoc({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/check");

  const { id } = await params;
  const toBeGen = id.startsWith("ai-");
  console.log(id);
  let presentationData = null;

  if (!toBeGen) {
    presentationData = await getPresentationById(id, session.user.id);

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

      {toBeGen ||
        (presentationData && (
          <div className="fixed top-4 right-4 z-50">
            <ShareOption
              shareUrl={`${process.env.NEXT_PUBLIC_APP_URL}/p/${id}`}
              isShared={presentationData.isShared}
              presentationId={id}
              onToggleShare={toggleSharePresentation.bind(
                null,
                id,
                presentationData.isShared
              )}
            />
          </div>
        ))}
    </>
  );
}

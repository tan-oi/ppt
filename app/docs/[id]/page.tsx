import { Presentation } from "@/components/presentation";
import { ShareOption } from "@/components/share-option";
import { getPresentationById } from "@/lib/functions/getPresentation";
import { toggleSharePresentation } from "./action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/functions/user-check";
import { getGenerationRedisKey } from "@/lib/config/plan";
import { redis } from "@/lib/rate-limit";
import AccessStatus from "@/components/base/access-status";

export default async function PresentationDoc({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userId = (await requireUser()).id;

  let { id } = await params;
  id = id.startsWith("ai-") ? id.slice(3) : id;
  const { ticket } = await searchParams;

  let allowGeneration = false;

  if (typeof ticket === "string") {
    const genKey = getGenerationRedisKey(ticket);

    const rawData = await redis.getdel(genKey);

    if (rawData) {
      console.log(rawData);

      //@ts-ignore
      if (rawData.userId === userId && rawData.presentationId === id) {
        allowGeneration = true;
      }
    }
  }

  let presentationData = null;

  if (!allowGeneration) {
    presentationData = await getPresentationById(id, userId);
    if (!presentationData) {
      return (
        <AccessStatus
          type="deleted"
          title="Presentation not found"
          description="Either this doesnt exist or the timer has expired"
          backHref="/library"
          backHrefLabel="library"
          homeHref="/"
        />
      );
    }
  }

  return (
    <>
      <Presentation
        llmToBeCalled={allowGeneration}
        presentationData={presentationData}
        id={id}
      />
      <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl flex items-center gap-2">
        {!allowGeneration && presentationData && (
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

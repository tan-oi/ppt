import { Presentation } from "@/components/presentation";
import { ShareOption } from "@/components/share-option";
import { getPresentationById } from "@/lib/functions/getPresentation";
import { toggleSharePresentation } from "./action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  let { id } = await params;
  id = id.startsWith("ai-") ? id.slice(3) : id;
  const { ticket } = await searchParams;

  const hasGuestSuffix = id.endsWith("_gm");
  const isGuestModeTicket =
    typeof ticket === "string" && ticket.startsWith("gm_");
  const isGuestMode = !userId && (hasGuestSuffix || isGuestModeTicket);

  if (!userId && !hasGuestSuffix && !ticket) {
    return (
      <AccessStatus
        type="forbidden"
        title="Access denied"
        description="This presentation requires authentication or a valid guest mode ID"
        backHref="/"
        homeHrefLabel="home"
        homeHref="/"
      />
    );
  }

  if (userId && hasGuestSuffix) {
    return (
      <AccessStatus
        type="forbidden"
        title="Invalid presentation"
        description="Guest mode presentations cannot be accesssed with auth"
        backHref="/library"
        homeHrefLabel="library"
        homeHref="/"
      />
    );
  }
  let allowGeneration = false;

  if (typeof ticket === "string") {
    if (ticket) {
      const genKey = getGenerationRedisKey(ticket);
      const rawData = await redis.getdel(genKey);

      if (rawData) {
        //@ts-ignore
        if (rawData.presentationId === id) {
          allowGeneration = true;
        }
      }
    } else if (userId) {
      const genKey = getGenerationRedisKey(ticket);
      const rawData = await redis.getdel(genKey);

      if (rawData) {
        //@ts-ignore
        if (rawData.userId === userId && rawData.presentationId === id) {
          allowGeneration = true;
        }
      }
    }
  }

  let presentationData = null;

  if (!allowGeneration) {
    if (isGuestMode) {
      presentationData = null;
    } else {
      if (!userId) {
        <AccessStatus
          type="forbidden"
          title="Presentation not found"
          description="Either this doesn't exist or you don't have access to it"
          backHref="/library"
          homeHrefLabel="library"
          homeHref="/library"
        />;
      }

      presentationData = await getPresentationById(id, userId as string);

      if (!presentationData) {
        return (
          <AccessStatus
            type="deleted"
            title="Presentation not found"
            description="Either this doesn't exist or you don't have access to it"
            backHref="/library"
            homeHrefLabel="library"
            homeHref="/library"
          />
        );
      }
    }
  }

  return (
    <>
      <Presentation
        llmToBeCalled={allowGeneration}
        presentationData={presentationData}
        id={id}
        isGuestMode={isGuestMode}
      />
      <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl flex items-center gap-2">
        {!allowGeneration && !isGuestMode && presentationData && (
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
        <Link href={"/library"}>
          <Button variant="default" size="sm">
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

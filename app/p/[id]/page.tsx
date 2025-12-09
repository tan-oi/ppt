import { auth } from "@/lib/auth";
import { getSharedPresentation } from "@/lib/functions/getPresentation";
import { headers } from "next/headers";
import { PresentationViewer } from "@/components/presentation-viewer";
import AccessStatus from "@/components/base/access-status";
export default async function PresentationView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let viewData = null;
  const isGuestMode = id.endsWith("_gm");

  if (!isGuestMode) {
    viewData = await getSharedPresentation(id);
    if (!viewData.success) {
      return (
        <AccessStatus
          title={viewData.message}
          description="You dont have the permission to take this action"
          backHref="/library"
          homeHrefLabel="library"
          homeHref="/"
        />
      );
    }
  }

  return (
    <PresentationViewer viewData={viewData ? viewData.data : null} id={id} />
  );
}

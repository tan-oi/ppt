import { auth } from "@/lib/auth";
import { getSharedPresentation } from "@/lib/functions/getPresentation";
import { headers } from "next/headers";
import { PresentationViewer } from "@/components/presentation-viewer";
export default async function PresentationView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id } = await params;

  const viewData = await getSharedPresentation(id);
  console.log(viewData);
  if (!viewData.success) {
    return <p className="text-white">{viewData.message}</p>;
  }

  return <PresentationViewer viewData={viewData.data} />;
}

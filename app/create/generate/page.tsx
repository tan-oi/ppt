import { GenerateClient } from "@/components/generate/client";
import { auth } from "@/lib/auth";
import { userPlan } from "@/lib/functions/plan-enforcement";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function GeneratePPT({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/check");

  const params = await searchParams;
  const type = (params.type as "text" | "prompt") || "prompt";

  const uPlan = await userPlan(session.user.id);
  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 50%, color-mix(in oklch, var(--color-primary) 45%, transparent) 0%, transparent 60%)",
            }}
          />
        </div>
        <div className="">
          <GenerateClient type={type} plan={uPlan.plan} />
        </div>
      </div>
    </>
  );
}

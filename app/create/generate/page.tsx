import { GenerateClient } from "@/components/generate/client";

import { requireUser } from "@/lib/functions/user-check";
import { getUserCache } from "@/lib/functions/userCache";

export default async function GeneratePPT({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await requireUser()).id;

  const params = await searchParams;
  const type = (params.type as "text" | "prompt") || "prompt";

  const userPlan = await getUserCache(id, ["plan"]);
  console.log(id);
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
          <GenerateClient type={type} plan={userPlan?.plan ?? "free"} />
        </div>
      </div>
    </>
  );
}

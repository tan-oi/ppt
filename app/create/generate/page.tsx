import { GenerateClient } from "@/components/generate/client";

export default async function GeneratePPT({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const type = (await searchParams).type;

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
        <div className="flex flex-col w-full mx-auto max-w-2xl  pt-16 justify-center">
          <GenerateClient type={type} />
        </div>
      </div>
    </>
  );
}

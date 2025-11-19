import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserCache, preloadUserCache, updateUserCache } from "./userCache";

export async function deductCredits({
  type,
  amount,
}: {
  type: "image" | "ppt";
  amount: number;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const userId = session.user.id;

  const cache = await preloadUserCache(userId, ["credits", "plan"]);

  let credits = Number(cache?.credits ?? 0);

  if (credits < amount) {
    return { ok: false, error: "INSUFFICIENT_CREDITS" };
  }

  await updateUserCache(userId, { credits: credits - amount });

  const tx = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user || user.credits < amount) {
      await updateUserCache(userId, { credits });
      return { ok: false, error: "INSUFFICIENT_CREDITS" };
    }

    await tx.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } },
    });

    const record = await tx.transactionHistory.create({
      data: {
        userId,
        credits: amount,
        type,
      },
    });

    return {
      ok: true,
      newCredits: user.credits - amount,
      transactionId: record.id,
    };
  });

  if (!tx.ok) {
    return tx;
  }
  await updateUserCache(userId, { credits: tx.newCredits });

  return tx;
}

export async function refundCredits({
  userId,
  amount,
}: {
  userId: string;
  amount: number;
}) {
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: amount } },
  });

  const current = await getUserCache(userId, ["credits"]);
  const updated = Number(current?.credits ?? 0) + amount;

  await updateUserCache(userId, { credits: updated });
}

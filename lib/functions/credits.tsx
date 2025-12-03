import { prisma } from "@/lib/prisma";

import { getUserCache, preloadUserCache, updateUserCache } from "./userCache";

// export async function deductCredits({
//   type,
//   amount,
//   userId,
// }: {
//   type: "image" | "ppt";
//   amount: number;
//   userId: string;
// }) {
//   if (!userId) {
//     return { ok: false, error: "UNAUTHORIZED" };
//   }

//   const cache = await getUserCache(userId, ["credits", "plan"]);

//   let credits = Number(cache?.credits ?? 0);

//   if (credits < amount) {
//     return { ok: false, error: "INSUFFICIENT_CREDITS" };
//   }

//   await updateUserCache(userId, { credits: credits - amount });

//   const tx = await prisma.$transaction(async (tx) => {
//     const user = await tx.user.findUnique({
//       where: { id: userId },
//       select: { credits: true },
//     });

//     if (!user || user.credits < amount) {
//       await updateUserCache(userId, { credits });
//       return { ok: false, error: "INSUFFICIENT_CREDITS" };
//     }

//     await tx.user.update({
//       where: { id: userId },
//       data: { credits: { decrement: amount } },
//     });

//     const record = await tx.transactionHistory.create({
//       data: {
//         userId,
//         credits: amount,
//         type,
//       },
//     });

//     return {
//       ok: true,
//       newCredits: user.credits - amount,
//       transactionId: record.id,
//     };
//   });

//   if (!tx.ok) {
//     return tx;
//   }
//   await updateUserCache(userId, { credits: tx.newCredits });

//   return tx;
// }

export async function deductCredits({
  type,
  amount,
  userId,
}: {
  type: "image" | "ppt";
  amount: number;
  userId: string;
}) {
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const cache = await getUserCache(userId, ["credits", "plan"]);
  let credits = Number(cache?.credits ?? 0);

  if (credits < amount) {
    return { ok: false, error: "INSUFFICIENT_CREDITS" };
  }

  updateUserCache(userId, { credits: credits - amount }).catch(console.error);

  const tx = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });
    if (!user || user.credits < amount) {
      await updateUserCache(userId, { credits: user?.credits }).catch(
        console.error
      );
      return { ok: false, error: "INSUFFICIENT_CREDITS" };
    }

    const [updatedUser, record] = await Promise.all([
      tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: amount } },
        select: { credits: true },
      }),
      tx.transactionHistory.create({
        data: {
          userId,
          credits: amount,
          type,
        },
      }),
    ]);

    return {
      ok: true,
      newCredits: updatedUser.credits,
      transactionId: record.id,
    };
  });

  if (!tx.ok) {
    return tx;
  }

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

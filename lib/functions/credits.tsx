import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/rate-limit";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getRedisKey } from "../config/plan";

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
  const redisKey = getRedisKey(userId);

  let credits = await redis.hget<number>(redisKey, "credits");

  console.log(credits);

  if (credits === null) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true, current_plan: true },
    });

    if (!user) {
      return { ok: false, error: "UNAUTHORIZED" };
    }

    credits = user.credits;

    await redis
      .pipeline()
      .hset(redisKey, {
        credits,
        plan: user.current_plan ?? "free",
      })
      .expire(redisKey, 86400)
      .exec();
  }

  if (credits < amount) {
    return { ok: false, error: "INSUFFICIENT_CREDITS" };
  }

  await redis.hincrby(redisKey, "credits", -amount);

  const tx = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user || user.credits < amount) {
      await redis.hincrby(redisKey, "credits", amount);
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

  await redis
    .pipeline()
    .hset(redisKey, { credits: tx.newCredits })
    .expire(redisKey, 86400)
    .exec();

  return tx;
}

export async function refundCredits({
  userId,
  amount,
}: {
  userId: string;
  amount: number;
}) {
  const redisKey = `user:${userId}:credits`;

  await redis.incrby(redisKey, amount);

  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: amount } },
  });

  // await prisma.transactionHistory.create({
  //   data: {
  //     userId,
  //     credits: amount,
  //     type: "ppt",
  //   },
  // });
}

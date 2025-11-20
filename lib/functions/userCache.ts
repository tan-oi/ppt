import { getRedisKey } from "../config/plan";
import { prisma } from "../prisma";
import { redis } from "../rate-limit";

export async function ensureUserCache(userId: string) {
  const redisKey = getRedisKey(userId);

  const exists = await redis.exists(redisKey);

  if (exists) return redisKey;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      current_plan: true,
      current_plan_start: true,
      credits: true,
      _count: {
        select: {
          Presentations: true,
        },
      },
    },
  });

  const credits = user?.credits ?? 0;
  const plan = user?.current_plan ?? "free";

  const presentationCount = user?._count?.Presentations ?? 0;

  await redis
    .pipeline()
    .hset(redisKey, { credits, plan, pptCount: presentationCount })
    .expire(redisKey, 86400)
    .exec();

  return redisKey;
}

type fieldsT = "credits" | "plan" | "pptCount";

export async function getUserCache(userId: string, fields: fieldsT[]) {
  const redisKey = getRedisKey(userId);

  const values = await redis.hmget(redisKey, ...fields);

  if (!values) return null;

  return values;
}

export async function updateUserCache(
  userId: string,
  data: Record<string, any>
) {
  const key = getRedisKey(userId);
  await redis.hset(key, data);
}

export async function preloadUserCache(userId: string, fields: fieldsT[]) {
  await ensureUserCache(userId);
  return await getUserCache(userId, fields);
}


export async function incrementUserCache(
  userId: string,
  field: string,
  amount = 1
) {
  const key = getRedisKey(userId);
  await redis.hincrby(key, field, amount);
}

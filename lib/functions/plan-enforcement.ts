import { getPlanConfig, getRedisKey } from "../config/plan";
import { prisma } from "../prisma";
import { redis } from "../rate-limit";

export async function canCreatePresentation(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      current_plan: true,
      _count: {
        select: {
          Presentations: true,
        },
      },
    },
  });

  if (!user) {
    return {
      allowed: false,
      reason: "User not found",
    };
  }

  const plan = user.current_plan;

  const getPresentationLimit = getPlanConfig(plan).maxPresentations;

  const canCreate = user._count.Presentations < getPresentationLimit;

  if (!canCreate) {
    return {
      allowed: false,
      message: `You've reached your ${plan} limit of ${getPresentationLimit} decks`,
    };
  }

  return {
    allowed: true,
  };
}

export async function userPlan(userId: string) {
  const redisKey = getRedisKey(userId);

  const userPlan = await redis.hget<string>(redisKey, "plan");

  if (!userPlan) {
    const userPlanFromDb = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        current_plan: true,
      },
    });

    return {
      plan: userPlanFromDb?.current_plan,
    };
  }

  return {
    plan: userPlan,
  };
}

export async function requestValidation(userId: string, slidesNo: number) {
  const userDetail = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      _count: {
        select: {
          Presentations: true,
        },
      },
      current_plan: true,
    },
  });

  const plan = userDetail?.current_plan as "free" | "pro" | "basic";
  const {
    maxPresentations,
    maxSlidesPerPresentation,
    maxImagePerPresentation,
  } = getPlanConfig(plan);

  const canCreatePresentation =
    (userDetail?._count.Presentations as number) < maxPresentations;

  if (!canCreatePresentation) {
    return {
      allowed: false,
      error: "INSUFFICIENT_ALLOWANCE",
      message: `You've reached your ${plan} limit of ${maxPresentations} decks`,
    };
  }

  const slidesAreAllowed = slidesNo <= maxSlidesPerPresentation;

  if (!slidesAreAllowed) {
    return {
      allowed: false,
      error: "INSUFFICIENT_ALLOWANCE",
      message: `You can only create upto ${maxSlidesPerPresentation} slides in your ${plan} plan`,
    };
  }

  return {
    allowed: true,
    maxImagesAllowed: maxImagePerPresentation,
  };
}

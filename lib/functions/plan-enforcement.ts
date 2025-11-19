import { getPlanConfig, getRedisKey } from "../config/plan";

import { preloadUserCache } from "./userCache";

export async function canCreatePresentation(userId: string) {
  const cache = await preloadUserCache(userId, ["plan", "pptCount"]);

  const plan = (cache?.plan as "free" | "basic" | "pro") ?? "free";

  const pptCount = Number(cache?.pptCount ?? 0);

  const limit = getPlanConfig(plan).maxPresentations;

  if (pptCount >= limit) {
    return {
      allowed: false,
      message: `You've reached your ${plan} limit of ${limit} decks`,
    };
  }

  return { allowed: true };
}

export async function userPlan(userId: string) {
  const cache = await preloadUserCache(userId, ["plan"]);
  return { plan: cache?.plan ?? "free" };
}

export async function requestValidation(userId: string, slidesNo: number) {
  const cache = await preloadUserCache(userId, ["plan", "pptCount"]);

  const plan = (cache?.plan as "free" | "basic" | "pro") ?? "free";
  const pptCount = Number(cache?.pptCount ?? 0);

  const {
    maxPresentations,
    maxSlidesPerPresentation,
    maxImagePerPresentation,
  } = getPlanConfig(plan);

  if (pptCount >= maxPresentations) {
    return {
      allowed: false,
      error: "INSUFFICIENT_ALLOWANCE",
      message: `You've reached your ${plan} limit of ${maxPresentations} decks`,
    };
  }

  if (slidesNo > maxSlidesPerPresentation) {
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

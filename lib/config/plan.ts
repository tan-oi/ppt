export const PLAN_CONFIG = {
  free: {
    monthlyCredits: 25,

    maxPresentations: 5,
    maxSlidesPerPresentation: 5,
    maxImagePerPresentation: 0,

    canGenerateImage: false,

    costs: {
      generateAISlides: 5,
      generateImage: 0,
    },
  },
  basic: {
    monthlyCredits: 80,
    maxPresentations: 30,

    maxSlidesPerPresentation: 10,
    maxImagePerPresentation: 2,

    canGenerateImage: true,

    costs: {
      generateAISlides: 5,
      generateImage: 3,
    },
  },
  pro: {
    monthlyCredits: 300,
    maxPresentations: Infinity,

    maxSlidesPerPresentation: 15,
    maxImagePerPresentation: 4,

    canGenerateImage: true,

    costs: {
      generateAISlides: 5,
      generateImage: 3,
    },
  },
};

type CurrentPlan = "free" | "basic" | "pro";
export function getPlanConfig(plan: "free" | "basic" | "pro") {
  return PLAN_CONFIG[plan];
}

export function canAccessFeature(
  plan: CurrentPlan,
  feature: keyof typeof PLAN_CONFIG.free
) {
  return PLAN_CONFIG[plan][feature];
}

export function getCreditCost(
  plan: CurrentPlan,
  action: keyof typeof PLAN_CONFIG.free.costs
) {
  return PLAN_CONFIG[plan].costs[action];
}

export function getRedisKey(userId: string) {
  return `user:${userId}:meta`;
}

export function getGenerationRedisKey(ticket: string) {
  return `gen:ticket:${ticket}`;
}

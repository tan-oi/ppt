import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { redis } from "../rate-limit";
import { headers } from "next/headers";
import { getRedisKey } from "../config/plan";

export async function getPresentationById(
  presentationId: string,
  userId: string
) {
  let id = presentationId.startsWith("ai-")
    ? presentationId.slice(3)
    : presentationId;
  const presentation = await prisma.presentation.findUnique({
    where: {
      id: id,
      userId: userId,
    },
    include: {
      slides: {
        include: {
          widgets: true,
        },
        orderBy: {
          slideNumber: "asc",
        },
      },
    },
  });

  if (!presentation) {
    return null;
  }

  return {
    id: presentation.id,
    isModified: presentation.isModified,
    isShared: presentation.isShared,
    theme: presentation.theme,
    topic: presentation.topic,
    slides: presentation.slides.map((slide) => ({
      id: slide.id,
      theme: slide.theme,
      slideNumber: slide.slideNumber,
      heading: slide.heading,
      widgets: slide.widgets.reduce((acc, widget) => {
        acc[widget.id] = {
          id: widget.id,
          widgetType: widget.widgetType,
          data: widget.data,
          position: widget.position,
        };
        return acc;
      }, {} as Record<string, any>),
    })),
  };
}

type PresentationResult = {
  success: boolean;
  data?: any;
  message?: string;
};
export async function getSharedPresentation(
  presentationId: string
): Promise<PresentationResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const presentation = await prisma.presentation.findFirst({
    where: {
      id: presentationId,
    },
    include: {
      slides: {
        include: {
          widgets: true,
        },
        orderBy: {
          slideNumber: "asc",
        },
      },
    },
  });

  if (!presentation) {
    return {
      success: false,
      message: "Presentation not found",
    };
  }

  if (!presentation.isShared && !session?.user?.id) {
    return {
      success: false,
      message: "This presentation is not shared publicly",
    };
  }

  return {
    success: true,
    data: {
      id: presentation.id,
      isModified: presentation.isModified,
      isShared: presentation.isShared,
      topic: presentation.topic,
      theme: presentation.theme,
      slides: presentation.slides.map((slide) => ({
        id: slide.id,
        theme: slide.theme,
        slideNumber: slide.slideNumber,
        heading: slide.heading,
        widgets: slide.widgets.reduce((acc, widget) => {
          acc[widget.id] = {
            id: widget.id,
            widgetType: widget.widgetType,
            data: widget.data,
            position: widget.position,
          };
          return acc;
        }, {} as Record<string, any>),
      })),
    },
  };
}

export async function getAllPresentations(userId: string) {
  try {
    const getPresentations = await prisma.presentation.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        _count: {
          select: {
            slides: true,
          },
        },
      },
    });

    return {
      success: true as const,
      data: getPresentations,
    };
  } catch (error) {
    console.error("Error fetching presentation:", error);
    return {
      success: false,
      error: "Database error",
      message: "Failed to fetch presentation. Please try again.",
    };
  }
}

export async function getCredits(userId: string) {
  const key = getRedisKey(userId);

  const rawPlanData = await redis.hmget(key, "credits", "plan");

  if (
    rawPlanData &&
    rawPlanData.credits !== null &&
    rawPlanData.plan !== null
  ) {
    return {
      credits: Number(rawPlanData.credits),
      currentPlan: rawPlanData.plan || null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      credits: true,
      current_plan: true,
    },
  });

  const credits = user?.credits ?? 0;
  const plan = user?.current_plan ?? "free";

  await redis.hset(key, {
    credits: credits,
    plan: plan ?? "free",
  });

  await redis.expire(key, 86400);

  return {
    credits,
    currentPlan: plan,
  };
}

export async function getLibraryData(userId: string) {
  try {
    const [presentationResult, plan] = await Promise.all([
      getAllPresentations(userId),
      getCredits(userId),
    ]);
    console.log(plan);
    if (!presentationResult.success) {
      return {
        success: false as const,
        error: presentationResult.error,
        message: presentationResult.message,
      };
    }

    return {
      success: true,
      presentations: presentationResult.data,
      planDetails: {
        credit: plan.credits,
        currentPlan: plan.currentPlan,
      },
    };
  } catch (error) {
    console.error("Error fetching library data:", error);
    return {
      success: false,
      error: "Database error",
      message: "Failed to fetch library data. Please try again.",
    };
  }
}


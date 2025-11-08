import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { redis } from "../rate-limit";
import { headers } from "next/headers";

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

    console.log(getPresentations);
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
  const redisKey = `user:${userId}:credits`;

  let cachedRedis = await redis.get<number>(redisKey);

  if (cachedRedis !== null) {
    return cachedRedis;
  }

  const userCredits = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      credits: true,
    },
  });

  if (userCredits && userCredits.credits) {
    redis.set(redisKey, userCredits.credits, {
      ex: 24 * 60 * 60,
    });

    return userCredits.credits;
  } else {
    redis.set(redisKey, 0, {
      ex: 24 * 60 * 60,
    });
    return 0;
  }
}

export async function getLibraryData(userId: string) {
  try {
    const [presentationResult, credit] = await Promise.all([
      getAllPresentations(userId),
      getCredits(userId),
    ]);

    if (!presentationResult.success) {
      return {
        success: false as const,
        error: presentationResult.error,
        message: presentationResult.message,
      };
    }

    return {
      success: true as const,
      presentations: presentationResult.data,
      credits: credit,
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

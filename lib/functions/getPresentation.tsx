import { prisma } from "@/lib/prisma";
import { auth } from "../auth";

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

  if (!presentation.isShared) {
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
      success: true,
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

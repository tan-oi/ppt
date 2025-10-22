import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication Required",
        message: "Please login to continue",
      },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const presentation = await prisma.presentation.findUnique({
      where: {
        id,
        userId: session.user.id,
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
      return NextResponse.json(
        {
          success: false,
          error: "Presentation not found",
          message:
            "The requested presentation does not exist or you don't have access to it",
        },
        { status: 404 }
      );
    }

    const transformedData = {
      id: presentation.id,
      isModified: presentation.isModified,
      topic: presentation.topic,
      slides: presentation.slides.map((slide) => ({
        id: slide.id,
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

    return NextResponse.json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    console.error("Error fetching presentation:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to fetch presentation. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication required",
        message: "Please log in to continue",
      },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const body = await request.json();

    await prisma.$transaction(async (tx) => {
      const existing = await tx.presentation.findUnique({
        where: { id },
      });

      if (existing) {
        if (existing.userId !== session.user.id) {
          throw new Error("Unauthorized");
        }

        await tx.slide.deleteMany({
          where: { presentationId: id },
        });

        await tx.presentation.update({
          where: { id },
          data: {
            topic: body.topic,
            isModified: body.isModified,
          },
        });
      } else {
        await tx.presentation.create({
          data: {
            id,
            topic: body.topic,
            isModified: body.isModified || false,
            userId: session.user.id,
            outlineId: body.outlineId,
          },
        });
      }

      await tx.presentation.update({
        where: { id },
        data: {
          slides: {
            create: body.slides.map((slide: any) => ({
              id: slide.id,
              slideNumber: slide.slideNumber,
              heading: slide.heading,
              widgets: {
                create: Object.values(slide.widgets).map((widget: any) => ({
                  id: widget.id,
                  widgetType: widget.widgetType,
                  data: widget.data,
                  position: widget.position,
                })),
              },
            })),
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Presentation saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving presentation:", error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
          message: "You don't have permission to modify this presentation",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to save presentation. Please try again.",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication required",
        message: "Please log in to continue",
      },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    await prisma.presentation.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Presentation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting presentation:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to delete the presentation",
      },
      { status: 500 }
    );
  }
}

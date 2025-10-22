import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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
  const body = await request.json();

  try {
    const res = await prisma.outline.update({
      where: {
        id,
      },
      data: {
        finalContent: body.updatedOutline,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating outline:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to update outline",
      },
      { status: 500 }
    );
  }
}

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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

  try {
    const getPresentations = await prisma.presentation.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: getPresentations,
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

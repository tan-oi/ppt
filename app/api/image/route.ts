import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { replicate } from "@ai-sdk/replicate";
import { experimental_generateImage as generateImage } from "ai";
import { deductCredits, refundCredits } from "@/lib/functions/credits";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  //replace this what what the plan says.
  const creditCost = 3;

  try {
    await deductCredits({
      type: "image",
      amount: creditCost,
      userId,
    });

    const { prompt } = await req.json();

    try {
      const { image } = await generateImage({
        model: replicate.image("black-forest-labs/flux-schnell"),
        prompt,
        aspectRatio: "16:9",
      });

      const base64 = `data:image/webp;base64,${Buffer.from(
        image.uint8Array
      ).toString("base64")}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "ai-generated-images",
        resource_type: "image",
      });

      return NextResponse.json({
        success: true,
        cloudinaryUrl: upload.secure_url,
        publicId: upload.public_id,
      });
    } catch (generationError) {
      await refundCredits({
        userId,
        amount: creditCost,
      });

      throw generationError;
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message ?? "Image generation failed",
      },
      { status: 500 }
    );
  }
}

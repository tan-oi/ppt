import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { replicate, createReplicate } from "@ai-sdk/replicate";
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

  const replicateApiKey = req.headers.get("x-replicate-api-key");
  const isGuestMode = !session?.user?.id;

  if (!session?.user?.id && !isGuestMode) {
    return NextResponse.json(
      { success: false, error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const userId = session?.user?.id || "guest";
  const creditCost = 3;

  try {
    // if (!isGuestMode) {
    //   await deductCredits({
    //     type: "image",
    //     amount: creditCost,
    //     userId,
    //   });
    // }

    const { prompt } = await req.json();
    const replicateModel =
      req.headers.get("x-replicate-model") || "black-forest-labs/flux-schnell";

    try {
      const replicateProvider = replicateApiKey
        ? createReplicate({ apiToken: replicateApiKey })
        : replicate;

      const { image } = await generateImage({
        model: replicateProvider.image(replicateModel),
        prompt,
        aspectRatio: "16:9",
      });

      const base64 = `data:image/webp;base64,${Buffer.from(
        image.uint8Array
      ).toString("base64")}`;

      if (isGuestMode) {
        return NextResponse.json({
          success: true,
          imageData: base64,
          isLocal: true,
        });
      }

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "ai-generated-images",
        resource_type: "image",
      });

      return NextResponse.json({
        success: true,
        cloudinaryUrl: upload.secure_url,
        publicId: upload.public_id,
        isLocal: false,
      });
    } catch (generationError: any) {
      console.error("Image generation error:", generationError);

      const errorMessage = generationError.message?.toLowerCase() || "";
      const isAuthError =
        generationError.status === 401 ||
        generationError.statusCode === 401 ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("invalid") ||
        errorMessage.includes("authentication");

      // if (!isGuestMode) {
      //   await refundCredits({
      //     userId,
      //     amount: creditCost,
      //   });
      // }

      if (isAuthError) {
        return NextResponse.json(
          {
            success: false,
            error: "INVALID_API_KEY",
            message:
              "Invalid Replicate API token. Please check your API token and try again.",
          },
          { status: 401 }
        );
      }

      throw generationError;
    }
  } catch (err: any) {
    console.error("Image generation error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message ?? "Image generation failed",
      },
      { status: 500 }
    );
  }
}

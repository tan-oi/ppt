import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { replicate } from "@ai-sdk/replicate";
import { experimental_generateImage as generateImage } from "ai";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const startTime = performance.now();
  console.log("🚀 Starting image generation request");

  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: "REPLICATE_API_TOKEN is not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const parseStart = performance.now();
    let body;
    try {
      const text = await req.text();
      body = text ? JSON.parse(text) : {};
    } catch (parseError) {
      body = {};
    }
    console.log(
      `⏱️  Request parsing: ${(performance.now() - parseStart).toFixed(2)}ms`
    );

    const prompt =
      body.prompt ||
      " wide barren plain under heavy clouds. A single monolithic structure rises at the center, matte black, perfectly smooth, no markings. Light source is diffused, no shadows. Color palette is muted earth tones with desaturated greens. No characters, no plants, no symbols. Strict realism, no stylization, no fantasy elements.";

    const replicateStart = performance.now();
    console.log("🎨 Calling Replicate API...");

    const { image } = await generateImage({
      model: replicate.image("black-forest-labs/flux-schnell"),
      prompt: prompt,
      aspectRatio: "16:9",
    });

    const replicateTime = (performance.now() - replicateStart) / 1000;
    console.log(
      `✅ Replicate generation completed: ${replicateTime.toFixed(2)}s`
    );

    const base64Start = performance.now();
    const base64Image = `data:image/webp;base64,${Buffer.from(
      image.uint8Array
    ).toString("base64")}`;
    console.log(
      `⏱️  Base64 conversion: ${(performance.now() - base64Start).toFixed(2)}ms`
    );

    const cloudinaryStart = performance.now();
    console.log("☁️  Uploading to Cloudinary...");

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "ai-generated-images",
      resource_type: "image",
    });

    const cloudinaryTime = (performance.now() - cloudinaryStart) / 1000;
    console.log(
      `✅ Cloudinary upload completed: ${cloudinaryTime.toFixed(2)}s`
    );
    console.log(`📸 Image uploaded: ${uploadResult.secure_url}`);

    const totalTime = (performance.now() - startTime) / 1000;
    console.log(`\n⏱️  TIMING SUMMARY:`);
    console.log(
      `   - Replicate generation: ${replicateTime.toFixed(2)}s (${(
        (replicateTime / totalTime) *
        100
      ).toFixed(1)}%)`
    );
    console.log(
      `   - Cloudinary upload: ${cloudinaryTime.toFixed(2)}s (${(
        (cloudinaryTime / totalTime) *
        100
      ).toFixed(1)}%)`
    );
    console.log(`   - Total time: ${totalTime.toFixed(2)}s\n`);

    return NextResponse.json({
      success: true,
      cloudinaryUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      prompt: prompt,
      timing: {
        replicate: `${replicateTime.toFixed(2)}s`,
        cloudinary: `${cloudinaryTime.toFixed(2)}s`,
        total: `${totalTime.toFixed(2)}s`,
      },
    });
  } catch (error: any) {
    const errorTime = (performance.now() - startTime) / 1000;
    console.error(`❌ Error after ${errorTime.toFixed(2)}s:`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}

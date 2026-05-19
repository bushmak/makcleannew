import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image manquante." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Format non accepté. Utilise JPG, PNG ou WebP." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Image trop lourde. Maximum 5 MB." }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "realisations");
  await fs.mkdir(uploadDir, { recursive: true });

  const input = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.webp`;
  const outputPath = path.join(uploadDir, filename);

  await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outputPath);

  return NextResponse.json({
    src: `/uploads/realisations/${filename}`,
  });
}

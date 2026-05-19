import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    filename: string;
  }>;
};

export async function GET(_req: Request, context: RouteContext) {
  const { filename } = await context.params;
  const response = await readUpload(filename);

  if (!response) {
    return NextResponse.json({ error: "Image introuvable." }, { status: 404 });
  }

  return response;
}

export async function HEAD(_req: Request, context: RouteContext) {
  const { filename } = await context.params;
  const response = await readUpload(filename, true);

  if (!response) {
    return new NextResponse(null, { status: 404 });
  }

  return response;
}

async function readUpload(filename: string, headersOnly = false) {
  if (!/^[a-zA-Z0-9.-]+\.webp$/.test(filename)) {
    return null;
  }

  const filePath = path.join(process.cwd(), "public", "uploads", "realisations", filename);

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(headersOnly ? null : new Uint8Array(file), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(file.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return null;
  }
}

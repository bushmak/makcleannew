import { NextRequest, NextResponse } from "next/server";
import { addRealisation, deleteRealisation, getRealisations } from "@/lib/realisations";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  return NextResponse.json({ realisations: await getRealisations() });
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const src = String(body?.src || "").trim();
  const title = String(body?.title || "").trim();
  const caption = String(body?.caption || "").trim();
  const location = String(body?.location || "").trim();
  const category = String(body?.category || "").trim();

  if (!src || !title || !caption) {
    return NextResponse.json({ error: "Image, titre et description sont obligatoires." }, { status: 400 });
  }

  const realisation = await addRealisation({ src, title, caption, location, category });
  return NextResponse.json({ realisation }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
  }

  const deleted = await deleteRealisation(id);
  return NextResponse.json({ success: deleted });
}

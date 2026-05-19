import { promises as fs } from "fs";
import path from "path";

export type Realisation = {
  id: string;
  src: string;
  title: string;
  caption: string;
  location?: string;
  category?: string;
  createdAt: string;
};

const DATA_DIR = process.env.MAKCLEAN_DATA_DIR || path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "realisations.json");

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

export async function getRealisations(): Promise<Realisation[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const data = JSON.parse(raw) as Realisation[];
  return data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function saveRealisations(realisations: Realisation[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, `${JSON.stringify(realisations, null, 2)}\n`, "utf8");
}

export async function addRealisation(input: Omit<Realisation, "id" | "createdAt">) {
  const realisations = await getRealisations();
  const createdAt = new Date().toISOString();
  const id = `${slugify(input.title)}-${Date.now().toString(36)}`;
  const realisation: Realisation = {
    id,
    createdAt,
    src: input.src,
    title: input.title.trim(),
    caption: input.caption.trim(),
    location: input.location?.trim() || "",
    category: input.category?.trim() || "",
  };

  await saveRealisations([realisation, ...realisations]);
  return realisation;
}

export async function deleteRealisation(id: string) {
  const realisations = await getRealisations();
  const deleted = realisations.find((item) => item.id === id);
  const next = realisations.filter((item) => item.id !== id);
  await saveRealisations(next);

  if (deleted?.src.startsWith("/uploads/realisations/")) {
    await deleteUploadedImage(deleted.src);
  }

  return Boolean(deleted);
}

async function deleteUploadedImage(src: string) {
  const filename = path.basename(src);
  const filePath = path.join(process.cwd(), "public", "uploads", "realisations", filename);

  try {
    await fs.unlink(filePath);
  } catch {
    // The realisation should still be removed even if the file is already gone.
  }
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "realisation";
}

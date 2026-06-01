import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");

/** Fichiers sources → nom WebP attendu par le code (sans accent, etc.) */
const RENAME_OUTPUT = new Map([
  [path.join("services", "Extérieur.jpg"), path.join("services", "Exterieur.webp")],
  [path.join("services", "Exterieur.jpg"), path.join("services", "Exterieur.webp")],
  [path.join("logo", "1200x630px.png"), "1200x630.webp"],
  [path.join("logo", "logo.png"), path.join("logo", "logo.webp")],
]);

function toRel(filePath) {
  return path.relative(publicDir, filePath).split(path.sep).join("/");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function convertFile(inputPath) {
  const rel = toRel(inputPath);
  const mapped = RENAME_OUTPUT.get(rel);
  const outputRel = mapped
    ? mapped
    : rel.replace(/\.(jpe?g|png)$/i, ".webp");
  const outputPath = path.join(publicDir, outputRel.split("/").join(path.sep));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  console.log(`${rel} -> ${outputRel}`);
  return { inputPath, outputPath };
}

const sources = await walk(publicDir);
const converted = [];

for (const input of sources) {
  const rel = toRel(input);
  const outRel = RENAME_OUTPUT.get(rel) ?? rel.replace(/\.(jpe?g|png)$/i, ".webp");
  const outPath = path.join(publicDir, ...outRel.split("/"));
  if (path.resolve(input) === path.resolve(outPath)) continue;
  converted.push(await convertFile(input));
}

for (const { inputPath } of converted) {
  try {
    await fs.unlink(inputPath);
  } catch {
    console.warn(`Impossible de supprimer (fichier ouvert ?) : ${toRel(inputPath)}`);
  }
}

// Exterieur.webp attendu par le code (sans accent)
const exterieurCandidates = [
  path.join(publicDir, "services", "Exterieur.webp"),
  path.join(publicDir, "services", "Extérieur.webp"),
];
for (const candidate of exterieurCandidates) {
  try {
    await fs.access(candidate);
    await fs.copyFile(candidate, path.join(publicDir, "services", "Exterieur.webp"));
    console.log(`services/Exterieur.webp OK (depuis ${toRel(candidate)})`);
    break;
  } catch {
    /* try next */
  }
}

const ogSrc = path.join(publicDir, "logo", "1200x630px.webp");
const ogDst = path.join(publicDir, "1200x630.webp");
try {
  await fs.access(ogSrc);
  await fs.copyFile(ogSrc, ogDst);
  console.log("1200x630.webp OK (racine public/)");
} catch {
  /* optional */
}

console.log(`Terminé : ${converted.length} fichier(s) converti(s) en WebP.`);

import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "realisations");
const entries = await fs.readdir(dir);
const sources = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of sources) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const input = path.join(dir, file);
  const output = path.join(dir, `${base}.webp`);

  await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output);

  console.log(`${file} -> ${base}.webp`);
}

console.log(`Done: ${sources.length} fichier(s) converti(s).`);

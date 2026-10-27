// Сжимает исходные фото в webp и складывает в public/images.
// Запуск: npm run images -- "<путь к папке с исходниками>"
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2];
const OUT = path.resolve('public/images');
const MAX_WIDTH = 2200;
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

if (!SRC) {
  console.error('Укажите папку с исходниками: npm run images -- "<путь>"');
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => exts.has(path.extname(f).toLowerCase()));

const used = new Set();
for (const file of files) {
  let name = path.basename(file, path.extname(file)).toLowerCase();
  // campus.png и campus.webp не должны затирать друг друга
  if (used.has(name)) name = `${name}-${path.extname(file).slice(1).toLowerCase()}`;
  used.add(name);
  const out = path.join(OUT, `${name}.webp`);
  const info = await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  console.log(`${file} → ${name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

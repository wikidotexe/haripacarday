// Membuat ikon PWA (PNG) tanpa dependensi eksternal.
// Jalankan ulang dengan: node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, rgba) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // RGBA
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const ROSE = [0xff, 0x3d, 0x8b];
const GRAPE = [0x8b, 0x5c, 0xf6];
const lerp = (a, b, t) => Math.round(a + (b - a) * t);

/** Kurva hati implisit: (x² + y² - 1)³ - x²y³ ≤ 0 */
function insideHeart(x, y, scale) {
  const hx = x / scale;
  const hy = -y / scale;
  const a = hx * hx + hy * hy - 1;
  return a * a * a - hx * hx * hy * hy * hy <= 0;
}

function renderIcon(size, heartScale) {
  const rgba = Buffer.alloc(size * size * 4);
  const samples = 3;
  const center = size / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const t = (x + y) / (size * 2 - 2);
      const bg = [lerp(ROSE[0], GRAPE[0], t), lerp(ROSE[1], GRAPE[1], t), lerp(ROSE[2], GRAPE[2], t)];

      let hits = 0;
      for (let sy = 0; sy < samples; sy += 1) {
        for (let sx = 0; sx < samples; sx += 1) {
          const px = x + (sx + 0.5) / samples - center;
          const py = y + (sy + 0.5) / samples - center - size * 0.04;
          if (insideHeart(px, py, size * heartScale)) hits += 1;
        }
      }

      const cover = hits / (samples * samples);
      const offset = (y * size + x) * 4;
      rgba[offset] = lerp(bg[0], 255, cover);
      rgba[offset + 1] = lerp(bg[1], 255, cover);
      rgba[offset + 2] = lerp(bg[2], 255, cover);
      rgba[offset + 3] = 255;
    }
  }

  return encodePng(size, size, rgba);
}

const targets = [
  { file: 'public/icons/icon-192.png', size: 192, scale: 0.34 },
  { file: 'public/icons/icon-512.png', size: 512, scale: 0.34 },
  { file: 'public/icons/maskable-512.png', size: 512, scale: 0.24 },
  { file: 'public/apple-touch-icon.png', size: 180, scale: 0.34 },
];

for (const target of targets) {
  const path = resolve(ROOT, target.file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, renderIcon(target.size, target.scale));
  console.log(`dibuat: ${target.file}`);
}

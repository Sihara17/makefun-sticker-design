// makefun-sticker-01 — Node 22 entrypoint, standard library only.
// Copy the exact submitted image bytes to the grader's output path.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputFile = join(outputDir, 'entry.png');
const image = readFileSync(new URL('./entry.png', import.meta.url));
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const maxImageBytes = 1024 * 1024;
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);

if (!image.subarray(0, 8).equals(pngSignature)) {
  throw new Error('entry.png is not a PNG image');
}
if (image.length > maxImageBytes || width > 1024 || height > 1024 || width === 0 || height === 0) {
  throw new Error('entry.png exceeds the competition image limits');
}

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, image);

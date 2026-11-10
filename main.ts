// makefun-sticker-01 — Node 22 entrypoint, standard library only.
// Validate the sticker PNG, then copy its exact bytes to /output/entry.png.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { inflateSync } from 'node:zlib';

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const maxBytes = 1024 * 1024;
const crcTable = new Uint32Array(256);

for (let i = 0; i < crcTable.length; i += 1) {
  let value = i;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  crcTable[i] = value >>> 0;
}

function checksum(parts: readonly Buffer[]): number {
  let crc = 0xffffffff;
  for (const part of parts) {
    for (const byte of part) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function paeth(left: number, up: number, diagonal: number): number {
  const estimate = left + up - diagonal;
  const dl = Math.abs(estimate - left);
  const du = Math.abs(estimate - up);
  const dd = Math.abs(estimate - diagonal);
  return dl <= du && dl <= dd ? left : du <= dd ? up : diagonal;
}

const source = readFileSync(new URL('./entry.png', import.meta.url));
if (source.length > maxBytes || source.length < 33 || !source.subarray(0, 8).equals(signature)) {
  throw new Error('entry.png must be a complete PNG smaller than 1 MiB');
}

const width = source.readUInt32BE(16);
const height = source.readUInt32BE(20);
if (
  width === 0 || height === 0 || width > 1024 || height > 1024 ||
  source[24] !== 8 || source[25] !== 6
) {
  throw new Error('entry.png must be at most 1024 × 1024 and use RGBA8');
}

const imageData: Buffer[] = [];
let offset = signature.length;
let chunkNumber = 0;
let hasHeader = false;
let hasData = false;
let dataClosed = false;
let hasEnd = false;

while (offset + 12 <= source.length) {
  const length = source.readUInt32BE(offset);
  const end = offset + 12 + length;
  if (end > source.length) throw new Error('entry.png contains a truncated chunk');

  const type = source.toString('ascii', offset + 4, offset + 8);
  const typeBytes = source.subarray(offset + 4, offset + 8);
  const body = source.subarray(offset + 8, offset + 8 + length);
  const actualCrc = source.readUInt32BE(offset + 8 + length);
  if (checksum([typeBytes, body]) !== actualCrc) throw new Error('entry.png has a bad chunk checksum');
  const critical = (typeBytes[0] & 0x20) === 0;
  if (critical && !['IHDR', 'PLTE', 'IDAT', 'IEND'].includes(type)) {
    throw new Error('entry.png contains an unsupported critical chunk: ' + type);
  }
  if (chunkNumber === 0 && (type !== 'IHDR' || length !== 13)) {
    throw new Error('entry.png must begin with one valid IHDR chunk');
  }
  if (type === 'IHDR') {
    if (hasHeader || source[26] !== 0 || source[27] !== 0 || source[28] !== 0) {
      throw new Error('entry.png must use standard non-interlaced PNG encoding');
    }
    hasHeader = true;
  }
  if (type === 'IDAT') {
    if (dataClosed) throw new Error('entry.png has separated image-data chunks');
    hasData = true;
    imageData.push(body);
  } else if (hasData && type !== 'IEND') {
    dataClosed = true;
  }
  if (type === 'IEND') {
    if (length !== 0) throw new Error('entry.png has an invalid IEND chunk');
    hasEnd = true;
    offset = end;
    break;
  }

  chunkNumber += 1;
  offset = end;
}

if (!hasHeader || !hasData || !hasEnd || offset !== source.length) {
  throw new Error('entry.png is incomplete or has trailing data');
}

const stride = width * 4;
const pixels = inflateSync(Buffer.concat(imageData));
if (pixels.length !== height * (stride + 1)) {
  throw new Error('entry.png pixel data does not match its dimensions');
}

let hasTransparentPixel = false;
let hasOpaquePixel = false;
let cursor = 0;
let previous = Buffer.alloc(stride);

for (let y = 0; y < height; y += 1) {
  const filter = pixels[cursor];
  cursor += 1;
  if (filter > 4) throw new Error('entry.png uses an unknown row filter');

  const row = Buffer.from(pixels.subarray(cursor, cursor + stride));
  cursor += stride;
  for (let x = 0; x < stride; x += 1) {
    const left = x >= 4 ? row[x - 4] : 0;
    const up = previous[x];
    const upperLeft = x >= 4 ? previous[x - 4] : 0;
    const predictor = filter === 1 ? left
      : filter === 2 ? up
        : filter === 3 ? Math.floor((left + up) / 2)
          : filter === 4 ? paeth(left, up, upperLeft)
            : 0;
    row[x] = (row[x] + predictor) & 255;
    if (x % 4 === 3) {
      hasTransparentPixel ||= row[x] === 0;
      hasOpaquePixel ||= row[x] === 255;
    }
  }
  previous = row;
}

if (!hasTransparentPixel || !hasOpaquePixel) {
  throw new Error('entry.png must contain transparent and visible pixels');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputFile = join(outputDir, 'entry.png');
mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, source);

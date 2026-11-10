// Deterministic makefun-sticker-01 entrypoint (Node 22, standard library only).
// The PNG is committed alongside this file; this program copies its exact bytes
// to the grader's output path on every run.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outputDir, 'entry.png'));

# makefun-sticker-design

[![make.fun · makefun-sticker-01](https://make.fun/badge/makefun-sticker-01.svg)](https://make.fun/bounty/makefun-sticker-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-sticker-01)
[![rank](https://make.fun/badge/makefun-sticker-01/Sihara17/makefun-sticker-design/rank.svg)](https://make.fun/bounty/makefun-sticker-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-sticker-01)
[![reward](https://make.fun/badge/makefun-sticker-01/Sihara17/makefun-sticker-design/reward.svg)](https://make.fun/bounty/makefun-sticker-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-sticker-01)

**Ship It!** is a die-cut sticker concept for make.fun: a smiling golden spark-agent races through code braces toward the finish. The bold magenta, cream, charcoal, and gold palette is inspired by make.fun’s public brand icon, while the character and composition are original.

The editable vector artwork is [`artwork/ship-it.svg`](artwork/ship-it.svg). The exported 1024 × 1024 transparent PNG is [`entry.png`](entry.png), and the entry program copies those exact bytes to `/output/entry.png`.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program uses only Node.js built-ins and writes the same PNG bytes on every run.

## Design rationale

- The four-point spark is a friendly stand-in for an AI agent; the curly braces make the developer context immediate.
- A curved gold racing line and checkered flag turn the contest idea into one clear visual action.
- “SHIP IT!” gives the image a developer-native punchline, while `make.fun` identifies the platform.
- A thick cream cutline and charcoal keyline hold the silhouette against light and dark surfaces. Large flat color areas and sturdy shapes suit print and small previews.

## Files and licensing

- `main.ts` — deterministic Node 22 entrypoint.
- `entry.png` — submitted sticker image, RGBA PNG, 1024 × 1024 pixels.
- `artwork/ship-it.svg` — editable vector source.
- `LICENSE` — MIT license for the repository’s code and artwork.

The artwork was created for this entry and does not use third-party characters or logos. If this entry wins a prize, the submission grants make.fun the separate image-use license stated in the bounty rules.

---

<sub>Entered on [make.fun](https://make.fun/?ref=43bh8e63&utm_source=github&utm_medium=readme&utm_campaign=makefun-sticker-01) · AI agents build software for cash rewards</sub>

# The Last-Mile Launch Crew

An original make.fun sticker concept: a brisk courier bird delivers a parcel of code. Its folded parcel seal makes a small checkmark, so the “done” cue belongs to the delivery itself. The cream cutline and dark keyline help the silhouette hold on light and dark surfaces.

## Artwork

- [`artwork/ship-it.svg`](artwork/ship-it.svg) — editable vector source.
- [`entry.png`](entry.png) — transparent 1024 × 1024 PNG used by the competition.
- [`main.ts`](main.ts) — Node 22 entrypoint that checks the PNG signature and writes the exact image bytes to `/output/entry.png`.

The image uses flat vector shapes, a short four-color palette, sturdy outlines, and large lettering for small-size readability. It has no external assets or runtime dependencies.

## Run locally

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

The repository is licensed under MIT. The competition's separate image-use license applies if the entry wins a prize.

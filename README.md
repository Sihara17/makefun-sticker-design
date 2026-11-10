# The Last-Mile Launch Crew

An original make.fun sticker concept: the courier swift keeps its forward delivery pose while becoming a holographic cloud bird. Cyan, turquoise, violet, and pink refract across its plumage; restrained mist trails the tail. A dark three-point pirate hat with a skull-and-crossbones emblem gives the character a clear new identity, while the code parcel keeps its completion check prominent.

## Artwork

- [`artwork/ship-it.svg`](artwork/ship-it.svg) — editable vector source.
- [`entry.png`](entry.png) — transparent 1024 × 1024 PNG used by the competition.
- [`main.ts`](main.ts) — Node 22 entrypoint that validates the PNG header, size, dimensions, and RGBA color type, then writes the exact image bytes to `/output/entry.png`.

The image combines clean vector silhouettes, prismatic gradients, a few luminous particles, sturdy outlines, and large lettering for small-size readability. The mascot, pirate hat, parcel, and check lead the composition; mist stays behind the face and hat. It has no external assets or runtime dependencies.

## Run locally

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

The repository is licensed under MIT. The competition's separate image-use license applies if the entry wins a prize.

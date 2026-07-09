# electrocute-ui

[![npm version](https://img.shields.io/npm/v/electrocute-ui.svg)](https://www.npmjs.com/package/electrocute-ui)
[![license](https://img.shields.io/npm/l/electrocute-ui.svg)](https://github.com/yafira/electrocute-ui/blob/main/LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://ui.electrocute.io/storybook/)

The React component library and design system for [Electrocute Lab](https://electrocute.io) — design tokens, components (Button, Card, Nav), and a live Storybook.

## What's in v0.1

- **`Button`** — 4 tones (lavender-beam / peony-fizz / marzipan-cloud / pistachio-swirl) × 3 variants (solid / outline / pill), plus large primary (30px radius) and secondary (10px radius) CTA sizes
- **`Card`** — 6 pastel-tinted tones (pistachio-swirl, marzipan-cloud, peony-fizz, glacier-mist, lavender-beam, mochi-cream), 20px radius, with an optional hover-accent state
- **`Nav`** — icon nav bar with light / outline / dark themes and active-item state
- **`tokens`** — colors, typography scale, and border radius values sampled directly from the Figma file

## Palette

Tone names are their own mini-palette rather than generic color words:

| Tone name         | Hex       | Source palette          |
| ----------------- | --------- | ----------------------- |
| `lavender-beam`   | `#BAAEFF` | Digital Purple          |
| `peony-fizz`      | `#F2B9E0` | Sweet Mochi             |
| `marzipan-cloud`  | `#FFFAE0` | Citrus                  |
| `pistachio-swirl` | `#BBFFDD` | Spring Greens           |
| `glacier-mist`    | `#ECF3FE` | Jazz Blues (Card only)  |
| `mochi-cream`     | `#FAEDFF` | Sweet Mochi (Card only) |

## Install

```bash
npm install electrocute-ui
```

## Usage

```tsx
import { Button, Card, Nav, color } from "electrocute-ui";

function App() {
  return (
    <Button tone="purple" variant="solid" size="lg">
      Get started
    </Button>
  );
}
```

## Local development

```bash
npm install
npm run dev            # Storybook at localhost:6006
npm run build           # builds the library to dist/
npm run build-storybook # static Storybook site to storybook-static/
npm run build-site      # builds landing page + Storybook combined into site-dist/
```

`site/` is a small standalone React app (own Vite config: `vite.site.config.ts`) that imports components directly from `../src` — it's a live demo, not screenshots or mockups. `npm run build-site` builds it, builds Storybook, and combines them so the landing page lives at `/` and Storybook at `/storybook/` in the same deploy.

## Publishing to npm

```bash
npm run build
npm login
npm publish --access public
```

Bump the version in `package.json` first (`npm version patch|minor|major`).

## Deploying Storybook (so it's a public, linkable portfolio piece)

**Option A — GitHub Pages**

```bash
npm run build-storybook
npx gh-pages -d storybook-static
```

Then enable GitHub Pages on the repo (Settings → Pages → deploy from `gh-pages` branch). You'll get a URL like `https://yafira.github.io/electrocute-ui`.

**Option B — Vercel** (usually faster to set up)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Set the build command to `npm run build-storybook` and the output directory to `storybook-static`.

Either way, put the resulting URL on your resume/portfolio next to this project — a live, browsable Storybook is a much stronger artifact than screenshots.

## Design token sourcing note

Colors, spacing, and radius values in `src/tokens/` were read directly from clean Figma exports of each design system panel. One inconsistency worth checking against the live Figma file: Digital Purple's 2nd and 3rd swatch labels (`363333`, `534D4D`) are identical to Goth Grunge's own values — likely a copy-paste labeling artifact from duplicating that frame, not an intentional value. `colors.ts` uses the visually-correct pale-lavender values for those two swatches with a comment flagging the discrepancy.

If the palette changes in Figma, this file won't auto-sync — either hand-edit `src/tokens/colors.ts` to match, or (better, for the next iteration) wire up a Figma Tokens plugin export so this file is generated rather than hand-maintained.

Typography is still an open decision in the Figma file (three candidate type systems — Skia, IBM Plex Sans Condensed, Roboto — are shown side by side). This library defaults to IBM Plex Sans Condensed since it matches the Plex family already used across your other sites. Update `src/tokens/typography.ts` once that's finalized.

## Roadmap ideas

- Input / form field component (14px radius per the Border Radius spec)
- Dark mode token set (a `gothGrunge`-forward palette already exists for this)
- Figma Tokens plugin sync so `tokens/` is generated, not hand-sampled
- Icon set as its own package or subpath export

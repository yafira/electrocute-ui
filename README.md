# electrocute-ui

The React component library and design system for [Electrocute Lab](https://electrocute.io) — design tokens, components (Button, Card, Nav), and a live Storybook.

## What's in v0.1

- **`Button`** — 4 tones (purple / pink / yellow / green) × 3 variants (solid / outline / ghost), plus large primary (30px radius) and secondary (10px radius) CTA sizes
- **`Card`** — pastel-tinted content cards (20px radius) with an optional hover-accent state
- **`Nav`** — icon nav bar with light / outline / dark themes and active-item state
- **`tokens`** — colors, typography scale, and border radius values sampled directly from the Figma file

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
```

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

Colors, spacing, and radius values in `src/tokens/` were extracted by pixel-sampling the exported Figma screenshots rather than pulled from Figma's own inspector or a tokens plugin. If you update the palette in Figma, the values here won't auto-sync — either hand-edit `src/tokens/colors.ts` to match, or (better, for the next iteration) wire up a Figma Tokens plugin export so this file is generated rather than hand-maintained.

Typography is still an open decision in the Figma file (three candidate type systems — Skia, IBM Plex Sans Condensed, Roboto — are shown side by side). This library defaults to IBM Plex Sans Condensed since it matches the Plex family already used across your other sites. Update `src/tokens/typography.ts` once that's finalized.

## Roadmap ideas

- Input / form field component (14px radius per the Border Radius spec)
- Dark mode token set (a `gothGrunge`-forward palette already exists for this)
- Figma Tokens plugin sync so `tokens/` is generated, not hand-sampled
- Icon set as its own package or subpath export

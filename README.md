# electrocute-ui

[![npm version](https://img.shields.io/npm/v/electrocute-ui.svg)](https://www.npmjs.com/package/electrocute-ui)
[![license](https://img.shields.io/npm/l/electrocute-ui.svg)](https://github.com/yafira/electrocute-ui/blob/main/LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://ui.electrocute.io/storybook/)

The React component library and design system for [Electrocute Lab](https://electrocute.io) — design tokens, components (Button, Card, Nav), and a live Storybook.

## What's in v0.4

- **`Button`** — 4 tones (lavender-beam / peony-fizz / marzipan-cloud / pistachio-swirl) × 3 variants (solid / outline / pill), plus large primary (30px radius) and secondary (10px radius) CTA sizes
- **`Card`** — 6 pastel-tinted tones (pistachio-swirl, marzipan-cloud, peony-fizz, glacier-mist, lavender-beam, mochi-cream), 20px radius, with an optional hover-accent state
- **`Nav`** — icon nav bar with light / outline / dark themes and active-item state
- **`ThemeProvider` / `useTheme` / `ThemeSwitcher`** — light, dark, and reader (accessible/high-contrast) modes, driven by `data-ecu-theme` and CSS custom properties. `Button`, `Card`, and `Badge` are retrofitted to theme automatically
- **`tokens`** — colors, typography scale, and border radius values sampled directly from the Figma file

## Theming

```tsx
import { ThemeProvider, ThemeSwitcher, useTheme, Button } from "electrocute-ui";

function App() {
  return (
    <ThemeProvider>
      <Controls />
    </ThemeProvider>
  );
}

function Controls() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
      <Button tone="lavender-beam">Themed button</Button>
    </>
  );
}
```

`ThemeProvider` defaults to the system color-scheme preference and persists the person's explicit choice to localStorage. Pass `target="document"` to apply `data-ecu-theme` to `<html>` instead of a wrapper div, if you're theming a whole app rather than an embedded widget.

Reader mode (`theme="accessible"`) is a deliberately blunt, high-contrast override — black text, white surfaces, visible borders — rather than a themed variant of the pastel palette. It's meant for genuine accessibility needs, not just a third color scheme.

## Palette

Tone names are their own mini-palette rather than generic color words. `lavender-beam` through `mochi-cream` come from the Electrocute Design System Figma file; `matcha-foam` through `smoke-hush` come from electrocute.io's own project grid. All 24 live in one `color` export (`import { color } from "electrocute-ui"`) — only the first 6 are currently wired into component `tone` props.

| Tone name            | Hex       | Source                      |
| -------------------- | --------- | --------------------------- |
| `lavender-beam`      | `#BAAEFF` | Digital Purple              |
| `peony-fizz`         | `#F2B9E0` | Sweet Mochi                 |
| `marzipan-cloud`     | `#FFFAE0` | Citrus                      |
| `pistachio-swirl`    | `#BBFFDD` | Spring Greens               |
| `glacier-mist`       | `#ECF3FE` | Jazz Blues (Card only)      |
| `mochi-cream`        | `#FAEDFF` | Sweet Mochi (Card only)     |
| `matcha-foam`        | `#F3FAEA` | electrocute.io project grid |
| `petal-veil`         | `#FFF3F8` | electrocute.io project grid |
| `vanilla-glow`       | `#FFFEE9` | electrocute.io project grid |
| `seafoam-drop`       | `#F6FFFE` | electrocute.io project grid |
| `wisteria-dust`      | `#FAF6FF` | electrocute.io project grid |
| `cloud-shoes`        | `#F2F8FF` | electrocute.io project grid |
| `oat-swirl`          | `#FCF7EC` | electrocute.io project grid |
| `grape-frost`        | `#F4F0FF` | electrocute.io project grid |
| `blush-powder`       | `#FDF1F9` | electrocute.io project grid |
| `spearmint-fizz`     | `#ECFFF9` | electrocute.io project grid |
| `lilac-bloom`        | `#F5E6FD` | electrocute.io project grid |
| `periwinkle-shimmer` | `#E8E6FF` | electrocute.io project grid |
| `apricot-glaze`      | `#FFF4E8` | electrocute.io project grid |
| `butter-puff`        | `#FFFFD8` | electrocute.io project grid |
| `sage-whisper`       | `#F3F4EF` | electrocute.io project grid |
| `twilight-haze`      | `#C0C1DE` | electrocute.io project grid |
| `mint-sheen`         | `#EBFAF2` | electrocute.io project grid |
| `smoke-hush`         | `#F5F7F8` | electrocute.io project grid |

## Install

```bash
npm install electrocute-ui
```

## Usage

```tsx
import { Button, Card, Nav, color } from "electrocute-ui";

function App() {
  return (
    <Button tone="lavender-beam" variant="solid" size="lg">
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

Storybook's toolbar has a "Theme" dropdown (paintbrush icon) to preview any component in light, dark, or reader mode without wiring up `ThemeProvider` yourself.

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

- Retrofit remaining components (`Avatar`, `Input`, `Inkbloom`, `BloomOutline`) to the theme token system — currently only `Button`, `Card`, and `Badge` read `data-ecu-theme`
- `Nav`'s `light`/`outline`/`dark` prop predates the theme system and doesn't read `data-ecu-theme` yet — worth deciding whether it should switch to context-driven theming instead of its own prop
- Figma Tokens plugin sync so `tokens/` is generated, not hand-sampled
- Icon set as its own package or subpath export

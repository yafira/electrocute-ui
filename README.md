# electrocute-ui

[![npm version](https://img.shields.io/npm/v/electrocute-ui.svg)](https://www.npmjs.com/package/electrocute-ui)
[![license](https://img.shields.io/npm/l/electrocute-ui.svg)](https://github.com/yafira/electrocute-ui/blob/main/LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://ui.electrocute.io/storybook/)

The React component library and design system for [Electrocute Lab](https://electrocute.io) — design tokens, components (Button, Card, Field, Input, Badge, Nav, Toggle, Avatar), five themes, and a live Storybook.

## What's in v0.7

v0.7 is additive too: nothing from v0.5 was removed or renamed.

*Why no v0.6?* The 0.6 versions were tagged in git during development but never published to npm, so 0.7 is the release that follows 0.5.2. Nothing was skipped in between.

- **Two new themes: Mono and Mono dark** (`mono-light` / `mono-dark`). Dieter Rams-quiet: white or black, neutrals first, `peony-fizz` as the one hint of pastel, and IBM Plex Mono for everything. `ThemeSwitcher` now shows five options
- **Font variables.** Headings and body read `--ecu-font-display` and `--ecu-font-body` (falling back to Plex Sans Condensed and Plex Sans), so a theme can swap the typeface without touching components. If you use the mono themes, load `IBM Plex Mono` 400/500/600
- **`Nav`, `Toggle` and `Avatar` now follow the theme.** They read role tokens instead of their own hex values. `Nav`'s `dark` variant is now the inverse pill (ink fill, surface icons) and flips with the theme; `Toggle`'s thumb keeps an edge so it stays visible on dark themes; `Avatar` initials stay dark on its pastel tints, and reader mode drops the tint for a bordered surface
- **Disabled buttons use the disabled roles** (`disabled-surface` / `disabled-ink`) instead of dimming their colour. A `loading` button keeps its colour and dims
- **`themeNames`** is exported from `tokens`: the list of every theme, handy for your own switchers
- `Inkbloom` and `BloomOutline` are marks, not themed: the inkbloom is always black, and the outline takes `currentColor`

## What came in v0.5

v0.5 is additive: `tone` still works everywhere it worked in v0.4 — it just stops being the *primary* API. The new API is **roles, not tones** — components name what a color *means* (`accent`, `surface`, `ink.muted`), and the active theme resolves that to a hex value. Nothing from v0.4 was deleted; a role layer went on top.

- **`Button`** — `intent` (primary / neutral / success / danger) × `variant` (solid / outline / pill / ghost) × `size` (sm / md / lg), all meeting a 44px minimum tap target. `tone` still works but is deprecated — see the migration table below
- **`Card`** — `surface` (default / sunken / accent), optional `interactive` (focusable, keyboard-reachable, hover-accented). `tone` still works but is deprecated
- **`Field`** — new in v0.5: the shared label/hint/error/aria shell every form control uses. Most consumers won't reach for it directly — `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, and `Switch` already wrap it
- **`Input` / `Textarea` / `Select` / `Checkbox` / `Radio` / `Switch`** — text field, multiline, dropdown, and choice controls, all wired to `Field` for consistent labeling and error states
- **`Badge`** — `intent` (neutral / success / warning / danger / info). `tone` was removed entirely in v0.5, not deprecated — see migration below
- **`ThemeProvider` / `useTheme` / `ThemeSwitcher`** — light, dark, and reader (accessible/high-contrast) modes (mono and mono dark joined in v0.7), driven by `data-ecu-theme` and CSS custom properties. `ThemeSwitcher` is now context-aware: pass `theme`/`onThemeChange` explicitly, or omit them and it reads from the nearest `ThemeProvider`
- **`tokens`** — three layers now, in dependency order: `tone` (24 brand pastels, decorative source), `ink`/`status`/`accent` (functional ramps, new in v0.5), and `roles` (semantic names per theme — the only layer components are allowed to read)

### tone → intent migration

| v0.4                               | v0.5                |
| ----------------------------------- | -------------------- |
| `tone="lavender-beam"`              | `intent="primary"`   |
| `tone="pistachio-swirl"`            | `intent="success"`   |
| `tone="peony-fizz"` (destructive)   | `intent="danger"`    |
| `tone="marzipan-cloud"`             | `intent="neutral"`   |

### Things that look different in v0.5

- **Focus is now visible everywhere.** One rule in `theme.css` puts a ring on every interactive element. Delete any `outline: none` overrides you had.
- **Status colors are darker.** `intent="success"`/`"danger"` use the status ink pairs rather than pastel-on-pastel — pastel text was failing the 4.5:1 contrast floor.
- **Body type is IBM Plex Sans, not Plex Sans Condensed.** Condensed is now scoped to headings only. Add the `IBM Plex Sans` webfont alongside the condensed cut if you're not already loading it.
- **Reader mode adds hard borders** to buttons, cards, badges, and controls.

## Theming

```tsx
import { ThemeProvider, ThemeSwitcher, useTheme, Button } from "electrocute-ui";

function App() {
  return (
    <ThemeProvider target="document">
      <Controls />
    </ThemeProvider>
  );
}

function Controls() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {/* omit theme/onThemeChange and ThemeSwitcher reads from context instead */}
      <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
      <Button intent="primary">Themed button</Button>
    </>
  );
}
```

`ThemeProvider` defaults to the system color-scheme preference and persists the person's explicit choice to localStorage. Pass `target="document"` to apply `data-ecu-theme` to `<html>` instead of a wrapper div, if you're theming a whole app rather than an embedded widget.

Reader mode (`theme="accessible"`) is a deliberately blunt, high-contrast override — black text, white surfaces, visible borders, zero tint — rather than a themed variant of the pastel palette. It's a legibility floor for genuine accessibility needs, not a fourth color scheme.

Mono (`theme="mono-light"` / `theme="mono-dark"`) is the quiet one: white or black, neutrals first, `peony-fizz` as the single hint of pastel, and IBM Plex Mono for everything. Components pick up the face through `--ecu-font-display` and `--ecu-font-body`, so nothing else changes.

## Roles vs. tones

Roles are the layer you write against day to day — `accent`, `surface`, `surface.sunken`, `ink`, `ink.muted`, `line`, `focus` — and they resolve differently per theme:

| Role              | Light      | Dark       | Reader     | Mono       | Mono dark  |
| ------------------ | ---------- | ---------- | ---------- | ---------- | ---------- |
| `canvas`           | `#faf9fb`  | `#141218`  | `#ffffff`  | `#ffffff`  | `#000000`  |
| `surface`           | `#ffffff`  | `#1e1b24`  | `#ffffff`  | `#ffffff`  | `#000000`  |
| `surface.sunken`    | `#f5f7f8`  | `#171520`  | `#f2f2f2`  | `#f6f6f4`  | `#111111`  |
| `surface.accent`    | `#faf6ff`  | `#241f33`  | `#ffffff`  | `#fff3f8`  | `#1c171a`  |
| `ink`               | `#1a1720`  | `#f4f2f8`  | `#000000`  | `#111111`  | `#f5f5f3`  |
| `ink.muted`         | `#55505e`  | `#a9a3b8`  | `#000000`  | `#5c5c58`  | `#a3a3a0`  |
| `accent`            | `#baaeff`  | `#8a78f0`  | `#000000`  | `#f2b9e0`  | `#f2b9e0`  |
| `accent.ink`        | `#1a1720`  | `#0d0b12`  | `#ffffff`  | `#111111`  | `#111111`  |
| `line`              | `#e6e2ec`  | `#332e3f`  | `#000000`  | `#dcdcd8`  | `#2a2a2a`  |
| `focus`             | `#5b3fd6`  | `#b9a9ff`  | `#000000`  | `#111111`  | `#f5f5f3`  |

Tones are the 24 named pastels underneath — decoration, not semantics. Reach for a role first; use `tone` directly only for genuine one-off decoration, and say so in a comment.

| Tone name            | Hex       | Source                      |
| -------------------- | --------- | ---------------------------- |
| `lavender-beam`      | `#BAAEFF` | Digital Purple                |
| `peony-fizz`         | `#F2B9E0` | Sweet Mochi                   |
| `marzipan-cloud`     | `#FFFAE0` | Citrus                         |
| `pistachio-swirl`    | `#BBFFDD` | Spring Greens                  |
| `glacier-mist`       | `#ECF3FE` | Jazz Blues                     |
| `mochi-cream`        | `#FAEDFF` | Sweet Mochi                    |
| `matcha-foam`        | `#F3FAEA` | electrocute.io project grid   |
| `petal-veil`         | `#FFF3F8` | electrocute.io project grid   |
| `vanilla-glow`       | `#FFFEE9` | electrocute.io project grid   |
| `seafoam-drop`       | `#F6FFFE` | electrocute.io project grid   |
| `wisteria-dust`      | `#FAF6FF` | electrocute.io project grid   |
| `cloud-shoes`        | `#F2F8FF` | electrocute.io project grid   |
| `oat-swirl`          | `#FCF7EC` | electrocute.io project grid   |
| `grape-frost`        | `#F4F0FF` | electrocute.io project grid   |
| `blush-powder`       | `#FDF1F9` | electrocute.io project grid   |
| `spearmint-fizz`     | `#ECFFF9` | electrocute.io project grid   |
| `lilac-bloom`        | `#F5E6FD` | electrocute.io project grid   |
| `periwinkle-shimmer` | `#E8E6FF` | electrocute.io project grid   |
| `apricot-glaze`      | `#FFF4E8` | electrocute.io project grid   |
| `butter-puff`        | `#FFFFD8` | electrocute.io project grid   |
| `sage-whisper`       | `#F3F4EF` | electrocute.io project grid   |
| `twilight-haze`      | `#C0C1DE` | electrocute.io project grid   |
| `mint-sheen`         | `#EBFAF2` | electrocute.io project grid   |
| `smoke-hush`         | `#F5F7F8` | electrocute.io project grid   |

## Install

```bash
npm install electrocute-ui
```

## Usage

```tsx
import { Button, Card, Field, Input, Badge } from "electrocute-ui";

function App() {
  return (
    <Card surface="accent">
      <Button intent="primary" variant="pill" size="lg">
        Get started
      </Button>
      <Input label="Email" hint="We won't share this." />
      <Badge intent="success">shipped</Badge>
    </Card>
  );
}
```

## Local development

```bash
npm install
npm run dev              # Storybook at localhost:6006
npx vite --config vite.site.config.ts   # docs/landing site with live reload
npm run build             # builds the library to dist/
npm run build-storybook   # static Storybook site to storybook-static/
npm run build-site        # builds the docs site to site-dist/
```

`site/` is a small standalone React app (own Vite config: `vite.site.config.ts`) that imports components directly from `../src` — it's a live demo, not screenshots or mockups. It includes a theme-switchable component showcase, the full role and tone token reference, do/don't guidance, and short essays on the v0.5 design decisions. `npm run build-site` builds it, builds Storybook, and combines them so the landing page lives at `/` and Storybook at `/storybook/` in the same deploy.

Storybook's toolbar has a "Theme" dropdown (paintbrush icon) to preview any component in light, dark, or reader mode without wiring up `ThemeProvider` yourself.

## Publishing to npm

```bash
npm run build
npm login
npm publish
```

`publishConfig.access` is already set to `public` in `package.json`, so `--access` isn't needed. Bump the version first (`npm version patch|minor|major`).

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

`ink`, `status`, and `accent` values in v0.5 are *proposals*, derived from the v0.4 `tone` palette rather than sampled fresh from the Figma file — verify before treating them as canonical.

Separately, one inconsistency from v0.4 is still worth checking against the live Figma file: Digital Purple's 2nd and 3rd swatch labels (`363333`, `534D4D`) are identical to Goth Grunge's own values — likely a copy-paste labeling artifact from duplicating that frame, not an intentional value. `colors.ts` uses the visually-correct pale-lavender values for those two swatches with a comment flagging the discrepancy.

If the palette changes in Figma, `src/tokens` won't auto-sync — either hand-edit the files to match, or (better, queued for v0.7) wire up a Figma Tokens export so tokens are generated in CI rather than hand-maintained.

## Roadmap

- Generate `src/tokens` from a Figma Tokens export in CI; add automated contrast checks to PRs
- Verify the `ink`/`status`/`accent` proposal values against the live Figma file
- Icon set as its own package or subpath export

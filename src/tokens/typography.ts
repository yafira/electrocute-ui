/**
 * Typography tokens from the Electrocute Design System v0.1 Figma file.
 *
 * The Figma file shows three candidate type systems side by side (Skia,
 * IBM Plex Sans Condensed, Roboto) — a decision still being finalized.
 * Defaulting to IBM Plex Sans Condensed here since it matches the Plex
 * family already used across electrocute.io, tinytinker.tools, and the
 * rest of Yafira's web properties. Swap `fontFamily.display` below once
 * the Figma file locks in a final choice.
 */

export const fontFamily = {
  display: "'IBM Plex Sans Condensed', sans-serif",
  body: "'IBM Plex Sans Condensed', sans-serif",
  mono: "'IBM Plex Mono', 'Departure Mono', monospace",
} as const;

export const type = {
  h1: { fontSize: "60px", fontWeight: 700, lineHeight: 1.1 },
  h2: { fontSize: "40px", fontWeight: 700, lineHeight: 1.15 },
  h3: { fontSize: "30px", fontWeight: 600, lineHeight: 1.2 },
  h4: { fontSize: "24px", fontWeight: 700, lineHeight: 1.25 },
  h5: { fontSize: "20px", fontWeight: 700, lineHeight: 1.3 },
  h6: { fontSize: "18px", fontWeight: 600, lineHeight: 1.35 },
  body1: { fontSize: "18px", fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: "16px", fontWeight: 400, lineHeight: 1.5 },
  body3: { fontSize: "14px", fontWeight: 400, lineHeight: 1.5 },
  body4: { fontSize: "12px", fontWeight: 400, lineHeight: 1.45 },
  body5: { fontSize: "11px", fontWeight: 400, lineHeight: 1.4 },
} as const;

export type TypeToken = keyof typeof type;

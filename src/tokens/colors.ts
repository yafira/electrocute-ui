/**
 * Color tokens, sampled directly from the Electrocute Design System v0.1 Figma file.
 * Six named palettes, each running darkest/most saturated → lightest.
 *
 * NOTE: these hex values were extracted by pixel-sampling the exported Figma
 * screenshots, not copy-pasted from Figma's inspector. If you update the
 * palette in Figma, re-sync this file (or better — export tokens via a Figma
 * tokens plugin and pipe them in here directly).
 */

export const gothGrunge = [
  "#000000",
  "#353333",
  "#524D4D",
  "#686262",
  "#837B7B",
  "#C1B9B9",
  "#B4B1AD",
  "#E4E2DD",
  "#EEECE7",
  "#F0EFEC",
] as const;

export const digitalPurple = [
  "#E2DFFC",
  "#F4EFF8",
  "#F2EBFC",
  "#F6F3FC",
  "#F3F2FC",
  "#F8F5FC",
  "#FAF7FD",
  "#FBF9FF",
  "#F9F9FF",
] as const;

export const sweetMochi = [
  "#E9BBDE",
  "#F7E8EF",
  "#F6E6F2",
  "#F3E1FD",
  "#F0DCF7",
  "#F5E6FD",
] as const;

export const jazzBlues = [
  "#C4CDE5",
  "#F0F2F9",
  "#EDF3FD",
  "#EDFCFC",
  "#F8FFFE",
] as const;

export const springGreens = [
  "#C9FDDF",
  "#EDF9D6",
  "#F0FDDD",
  "#F4FAEB",
] as const;

export const citrus = [
  "#FAF3E3",
  "#F8EFE0",
  "#FDF6D0",
  "#F9FACA",
  "#FDFAE6",
  "#FCFAE1",
  "#FFFEEB",
  "#FFFFFA",
] as const;

export const palettes = {
  gothGrunge,
  digitalPurple,
  sweetMochi,
  jazzBlues,
  springGreens,
  citrus,
} as const;

export type PaletteName = keyof typeof palettes;

/** Semantic aliases — the tones components actually reach for. */
export const color = {
  ink: gothGrunge[0],
  inkSoft: gothGrunge[2],
  gray: gothGrunge[5],
  border: gothGrunge[6],
  paper: gothGrunge[9],

  purple: digitalPurple[0],
  purpleTint: digitalPurple[2],

  pink: sweetMochi[0],
  pinkTint: sweetMochi[3],

  blue: jazzBlues[0],
  blueTint: jazzBlues[2],

  green: springGreens[0],
  greenTint: springGreens[1],

  yellow: citrus[3],
  yellowTint: citrus[4],
} as const;

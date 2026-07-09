/**
 * Color tokens, read directly from the Electrocute Design System v0.1 Figma
 * export (Colors.png). Six named palettes, each running most saturated →
 * lightest.
 *
 * Note: in the source file, Digital Purple's 2nd and 3rd swatches carry the
 * text labels "363333" and "534D4D" — identical to Goth Grunge's own 2nd/3rd
 * values. Since those two Digital Purple swatches are visibly pale lavender,
 * not dark gray, this reads as a copy-paste labeling artifact in the Figma
 * frame (likely duplicated from Goth Grunge without updating the labels)
 * rather than an intentional value. Flagging here rather than silently
 * "fixing" it — worth a quick check against the live Figma file to confirm,
 * then this comment can go.
 */

export const gothGrunge = [
  "#000000",
  "#363333",
  "#534D4D",
  "#696262",
  "#857B7B",
  "#C3B9B9",
  "#B4B1AD",
  "#E5E2DC",
  "#EFECE6",
  "#F0EFEC",
] as const;

export const digitalPurple = [
  "#BAAEFF",
  "#E8E1FA", // labeled "363333" in source — see note above, using pixel value instead
  "#E1DFFB", // labeled "534D4D" in source — see note above, using pixel value instead
  "#E8E1FA",
  "#E1DFFB",
  "#EFE7FA",
  "#F3EBFD",
  "#F7E0FF",
  "#F1F0FF",
  "#FAF6FF",
] as const;

export const sweetMochi = [
  "#F2B9E0",
  "#FAE7EF",
  "#F9E5F3",
  "#F7E0FF",
  "#F4DBF9",
  "#FAEDFF",
] as const;

export const jazzBlues = [
  "#C2CDE7",
  "#F0F2FA",
  "#ECF3FE",
  "#EAFDFC",
  "#F6FFFE",
] as const;

export const springGreens = [
  "#BBFFDD",
  "#EAF9D2",
  "#EDFDDA",
  "#F3FAEA",
] as const;

export const citrus = [
  "#FCF3E1",
  "#FAEFDE",
  "#FEF6CC",
  "#F9FAC5",
  "#FDFAE4",
  "#FCFADE",
  "#FFFEE9",
  "#FFFFF9",
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

/** Semantic aliases — the tones components actually reach for, named as
 * their own cute mini-palette rather than generic color words. */
export const color = {
  ink: gothGrunge[0],
  inkSoft: gothGrunge[2],
  gray: gothGrunge[5],
  border: gothGrunge[6],
  paper: gothGrunge[9],

  lavenderBeam: digitalPurple[0],
  lavenderBeamTint: digitalPurple[3],

  peonyFizz: sweetMochi[0],
  peonyFizzTint: sweetMochi[3],

  glacierMist: jazzBlues[2],
  glacierMistTint: jazzBlues[3],

  pistachioSwirl: springGreens[0],
  pistachioSwirlTint: springGreens[1],

  marzipanCloud: citrus[2],
  marzipanCloudTint: citrus[4],

  mochiCream: sweetMochi[5],
} as const;


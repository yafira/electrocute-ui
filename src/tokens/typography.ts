/**
 * IBM Plex Sans Condensed is a DISPLAY face — it loses counter width at body
 * sizes. v0.5 splits the stack: condensed for headings, regular-width Plex
 * Sans for body, Plex Mono for labels and code.
 */
export const font = {
  display: "var(--ecu-font-display, 'IBM Plex Sans Condensed', system-ui, sans-serif)",
  body: "var(--ecu-font-body, 'IBM Plex Sans', system-ui, -apple-system, sans-serif)",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
} as const

export const fontWeight = { regular: 400, medium: 500, semibold: 600, bold: 700 } as const

/** 1.25 modular scale off a 16px base, rounded to whole px. */
export const fontSize = {
  display: '60px',
  h1: '40px',
  h2: '32px',
  h3: '24px',
  'body-lg': '19px',
  body: '16px',
  small: '14px',
  label: '12px',
} as const

export const lineHeight = { display: 0.98, heading: 1.12, tight: 1.2, body: 1.55 } as const

export const letterSpacing = {
  display: '-0.03em',
  h1: '-0.025em',
  h2: '-0.02em',
  h3: '-0.015em',
  body: '0',
  label: '0.14em',
} as const

export interface TypeStyle {
  fontFamily: string
  fontSize: string
  fontWeight: number
  lineHeight: number
  letterSpacing: string
  textTransform?: 'uppercase'
}

/** Spread into a style object: `style={{ ...textStyle.h2 }}` */
export const textStyle = {
  display: { fontFamily: font.display, fontSize: fontSize.display, fontWeight: 600, lineHeight: lineHeight.display, letterSpacing: letterSpacing.display },
  h1: { fontFamily: font.display, fontSize: fontSize.h1, fontWeight: 600, lineHeight: lineHeight.heading, letterSpacing: letterSpacing.h1 },
  h2: { fontFamily: font.display, fontSize: fontSize.h2, fontWeight: 600, lineHeight: lineHeight.heading, letterSpacing: letterSpacing.h2 },
  h3: { fontFamily: font.display, fontSize: fontSize.h3, fontWeight: 600, lineHeight: lineHeight.tight, letterSpacing: letterSpacing.h3 },
  bodyLg: { fontFamily: font.body, fontSize: fontSize['body-lg'], fontWeight: 400, lineHeight: lineHeight.body, letterSpacing: letterSpacing.body },
  body: { fontFamily: font.body, fontSize: fontSize.body, fontWeight: 400, lineHeight: lineHeight.body, letterSpacing: letterSpacing.body },
  small: { fontFamily: font.body, fontSize: fontSize.small, fontWeight: 400, lineHeight: 1.45, letterSpacing: letterSpacing.body },
  label: { fontFamily: font.mono, fontSize: fontSize.label, fontWeight: 500, lineHeight: 1.3, letterSpacing: letterSpacing.label, textTransform: 'uppercase' },
} as const satisfies Record<string, TypeStyle>

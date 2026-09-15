/**
 * electrocute-ui — color tokens (v0.5)
 *
 * Three layers, in dependency order:
 *   1. tone    — the 24 brand pastels. Decorative palette source.
 *   2. ink / status / accent — functional ramps. NEW in v0.5.
 *   3. roles   — semantic names, resolved per theme. The ONLY layer
 *                components are allowed to read (via CSS custom props).
 *
 * Rule: nothing in src/components imports from layer 1.
 * NOTE: ink/status/accent values are proposals — verify against Figma.
 */

export const tone = {
  'lavender-beam': '#BAAEFF',
  'peony-fizz': '#F2B9E0',
  'marzipan-cloud': '#FFFAE0',
  'pistachio-swirl': '#BBFFDD',
  'glacier-mist': '#ECF3FE',
  'mochi-cream': '#FAEDFF',
  'matcha-foam': '#F3FAEA',
  'petal-veil': '#FFF3F8',
  'vanilla-glow': '#FFFEE9',
  'seafoam-drop': '#F6FFFE',
  'wisteria-dust': '#FAF6FF',
  'cloud-shoes': '#F2F8FF',
  'oat-swirl': '#FCF7EC',
  'grape-frost': '#F4F0FF',
  'blush-powder': '#FDF1F9',
  'spearmint-fizz': '#ECFFF9',
  'lilac-bloom': '#F5E6FD',
  'periwinkle-shimmer': '#E8E6FF',
  'apricot-glaze': '#FFF4E8',
  'butter-puff': '#FFFFD8',
  'sage-whisper': '#F3F4EF',
  'twilight-haze': '#C0C1DE',
  'mint-sheen': '#EBFAF2',
  'smoke-hush': '#F5F7F8',
} as const

export type Tone = keyof typeof tone

/** Back-compat: v0.4 exported a flat `color` map. */
export const color = { ...tone }

/** Neutral text/border ramp. Ratios are against ink[50]. */
export const ink = {
  900: '#1A1720', // headings, primary text — 16.4:1
  700: '#3A3542', // body on tinted surfaces — 11.2:1
  500: '#55505E', // secondary text — 7.1:1
  300: '#8A8494', // labels + disabled ONLY, never body — 3.4:1
  100: '#E6E2EC', // borders, dividers
  50: '#FAF9FB',  // page canvas
} as const

/**
 * Status is always a PAIR. Shipping a surface without its ink is the bug
 * this token shape exists to prevent.
 */
export const status = {
  success: { surface: '#E7FBF0', ink: '#0E5E3C', ratio: 7.9 },
  warning: { surface: '#FFFAE0', ink: '#7A4F00', ratio: 8.4 },
  danger:  { surface: '#FFE4EC', ink: '#A8123A', ratio: 6.6 },
  info:    { surface: '#ECF3FE', ink: '#1B4FA8', ratio: 7.5 },
} as const

export type StatusName = keyof typeof status

/** lavender-beam is a surface, not an ink — focus rings and links need a darker cut. */
export const accent = {
  surface: tone['lavender-beam'],
  hover: '#A79AF5',
  strong: '#5B3FD6',      // focus ring, link text — 6.9:1 on canvas
  strongHover: '#3D269E',
  dark: '#8A78F0',        // accent surface in the dark theme
} as const

export type ThemeName = 'light' | 'dark' | 'accessible'

export interface RoleTokens {
  canvas: string
  surface: string
  'surface-sunken': string
  'surface-accent': string
  ink: string
  'ink-muted': string
  'ink-subtle': string
  accent: string
  'accent-hover': string
  'accent-ink': string
  line: string
  'line-strong': string
  focus: string
  'success-surface': string; 'success-ink': string
  'warning-surface': string; 'warning-ink': string
  'danger-surface': string;  'danger-ink': string
  'info-surface': string;    'info-ink': string
}

export const roles: Record<ThemeName, RoleTokens> = {
  light: {
    canvas: ink[50],
    surface: '#FFFFFF',
    'surface-sunken': tone['smoke-hush'],
    'surface-accent': tone['wisteria-dust'],
    ink: ink[900],
    'ink-muted': ink[500],
    'ink-subtle': ink[300],
    accent: accent.surface,
    'accent-hover': accent.hover,
    'accent-ink': ink[900],
    line: ink[100],
    'line-strong': ink[900],
    focus: accent.strong,
    'success-surface': status.success.surface, 'success-ink': status.success.ink,
    'warning-surface': status.warning.surface, 'warning-ink': status.warning.ink,
    'danger-surface': status.danger.surface,   'danger-ink': status.danger.ink,
    'info-surface': status.info.surface,       'info-ink': status.info.ink,
  },
  dark: {
    canvas: '#141218',
    surface: '#1E1B24',
    'surface-sunken': '#171520',
    'surface-accent': '#241F33',
    ink: '#F4F2F8',
    'ink-muted': '#A9A3B8',
    'ink-subtle': '#7C7690',
    accent: accent.dark,
    'accent-hover': '#9B8CF5',
    'accent-ink': '#0D0B12',
    line: '#332E3F',
    'line-strong': '#4A4458',
    focus: '#B9A9FF',
    // Pastel surfaces are unreadable on dark — surfaces go deep, inks go light.
    'success-surface': '#13301F', 'success-ink': '#7BE3AE',
    'warning-surface': '#302713', 'warning-ink': '#F0CE7B',
    'danger-surface': '#33131F',  'danger-ink': '#F79BB8',
    'info-surface': '#131F33',    'info-ink': '#9BC1F7',
  },
  /** Reader mode: a blunt legibility floor, not a third color scheme. */
  accessible: {
    canvas: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-sunken': '#F2F2F2',
    'surface-accent': '#FFFFFF',
    ink: '#000000',
    'ink-muted': '#000000',
    'ink-subtle': '#3D3D3D',
    accent: '#000000',
    'accent-hover': '#2B2B2B',
    'accent-ink': '#FFFFFF',
    line: '#000000',
    'line-strong': '#000000',
    focus: '#000000',
    'success-surface': '#FFFFFF', 'success-ink': '#00532F',
    'warning-surface': '#FFFFFF', 'warning-ink': '#5C3A00',
    'danger-surface': '#FFFFFF',  'danger-ink': '#8A0026',
    'info-surface': '#FFFFFF',    'info-ink': '#003C8F',
  },
}

/** Use in component styles: `{ background: cssVar('accent') }` */
export const cssVar = (role: keyof RoleTokens) => `var(--ecu-${role})`

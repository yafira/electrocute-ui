export { tone, color, ink, status, accent, roles, themeNames, cssVar } from './colors'
export type { Tone, StatusName, ThemeName, RoleTokens } from './colors'
export { font, fontWeight, fontSize, lineHeight, letterSpacing, textStyle } from './typography'
export type { TypeStyle } from './typography'
export { space, radius, elevation, focusRing, motion, minTarget } from './space'

import { tone, ink, status, accent, roles } from './colors'
import { font, fontSize, fontWeight, textStyle } from './typography'
import { space, radius, elevation, focusRing, motion } from './space'

/** Everything in one object, for consumers who want the whole bag. */
export const tokens = {
  tone, ink, status, accent, roles,
  font, fontSize, fontWeight, textStyle,
  space, radius, elevation, focusRing, motion,
} as const

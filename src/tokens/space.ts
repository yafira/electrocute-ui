/**
 * v0.4 had no spacing scale, and three unrelated radii (Button 30px + 10px,
 * Card 20px). Components consume these tokens, never raw px.
 */

/** 4px base. Keys are steps, not pixels — space[5] is 24px. */
export const space = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
  9: '96px',
} as const

export const radius = {
  sm: '8px',     // badges, chips, small controls
  md: '12px',    // buttons, inputs
  lg: '20px',    // cards, panels
  xl: '28px',    // modals, hero surfaces
  pill: '999px', // pill variant, avatars
} as const

/** Shadows are tinted with ink.900, never neutral black. */
export const elevation = {
  none: 'none',
  raised: '0 1px 3px rgba(26, 23, 32, 0.12)',
  hover: '0 8px 24px rgba(26, 23, 32, 0.10)',
  overlay: '0 24px 60px rgba(26, 23, 32, 0.25)',
  toast: '0 12px 32px rgba(26, 23, 32, 0.30)',
} as const

/**
 * ONE focus treatment for the whole library. A bare outline vanishes on
 * pastel surfaces, so the ring gets a surface-colored offset first.
 */
export const focusRing = {
  width: '2px',
  offset: '3px',
  boxShadow: '0 0 0 3px var(--ecu-surface), 0 0 0 5px var(--ecu-focus)',
} as const

export const motion = {
  fast: '120ms cubic-bezier(0.2, 0, 0.2, 1)',
  base: '180ms cubic-bezier(0.2, 0, 0.2, 1)',
  slow: '280ms cubic-bezier(0.2, 0, 0.2, 1)',
} as const

/** Minimum interactive target. Enforced by every control's size tokens. */
export const minTarget = '44px'

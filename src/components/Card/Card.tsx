import React, { forwardRef } from 'react'
import { radius, space, elevation, motion } from '../../tokens/space'
import type { Tone } from '../../tokens/colors'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Themed surface role. Preferred over `tone`. */
  surface?: 'default' | 'sunken' | 'accent'
  /**
   * Decorative pastel fill, bypassing the theme.
   * @deprecated since v0.5 — use `surface`. Removed in v1.0.
   */
  tone?: Tone
  /**
   * Makes the whole card an activatable, keyboard-reachable target.
   * v0.4's hover-accent state was mouse-only.
   */
  interactive?: boolean
  onActivate?: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

const surfaces = {
  default: 'var(--ecu-surface)',
  sunken: 'var(--ecu-surface-sunken)',
  accent: 'var(--ecu-surface-accent)',
} as const

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { surface = 'default', tone, interactive, onActivate, header, footer, children, style, ...rest },
  ref,
) {
  const [hover, setHover] = React.useState(false)

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive || !onActivate) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate() }
  }

  return (
    <div
      ref={ref}
      data-ecu-component="card"
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      onClick={interactive ? onActivate : rest.onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: tone ? `var(--ecu-tone-${tone})` : surfaces[surface],
        color: 'var(--ecu-ink)',
        border: '1px solid var(--ecu-line)',
        borderRadius: radius.lg,
        padding: space[5],
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        cursor: interactive ? 'pointer' : undefined,
        transform: interactive && hover ? 'translateY(-2px)' : undefined,
        boxShadow: interactive && hover ? elevation.hover : elevation.none,
        transition: `transform ${motion.base}, box-shadow ${motion.base}`,
        ...style,
      }}
      {...rest}
    >
      {header ? <div style={{ marginBottom: space[3] }}>{header}</div> : null}
      <div style={{ flex: 1 }}>{children}</div>
      {footer ? (
        <div style={{ marginTop: space[4], paddingTop: space[4], borderTop: '1px solid var(--ecu-line)' }}>{footer}</div>
      ) : null}
    </div>
  )
})

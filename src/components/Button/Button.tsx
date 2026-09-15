import React, { forwardRef } from 'react'
import { radius, space, motion, minTarget } from '../../tokens/space'
import type { Tone } from '../../tokens/colors'

export type ButtonIntent = 'primary' | 'neutral' | 'success' | 'danger'
export type ButtonVariant = 'solid' | 'outline' | 'pill' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** What the button MEANS. Themed. The API to reach for. */
  intent?: ButtonIntent
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  /**
   * Decorative one-off brand color, bypassing the theme. Was the primary API
   * in v0.4.
   * @deprecated since v0.5 — use `intent`. Removed in v1.0.
   */
  tone?: Tone
}

const sizes: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 14, padding: `${space[2]} ${space[4]}`, borderRadius: radius.sm, minHeight: minTarget },
  md: { fontSize: 16, padding: `${space[3]} ${space[5]}`, borderRadius: radius.md, minHeight: minTarget },
  lg: { fontSize: 18, padding: `${space[4]} ${space[6]}`, borderRadius: radius.lg, minHeight: 52 },
}

const intents: Record<ButtonIntent, { bg: string; hover: string; ink: string }> = {
  primary: { bg: 'var(--ecu-accent)', hover: 'var(--ecu-accent-hover)', ink: 'var(--ecu-accent-ink)' },
  neutral: { bg: 'var(--ecu-surface-sunken)', hover: 'var(--ecu-line)', ink: 'var(--ecu-ink)' },
  success: { bg: 'var(--ecu-success-surface)', hover: 'var(--ecu-success-surface)', ink: 'var(--ecu-success-ink)' },
  danger: { bg: 'var(--ecu-danger-surface)', hover: 'var(--ecu-danger-surface)', ink: 'var(--ecu-danger-ink)' },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { intent = 'primary', variant = 'solid', size = 'md', fullWidth, loading, tone, disabled, style, children, ...rest },
  ref,
) {
  if (process.env.NODE_ENV !== 'production' && tone) {
    console.warn(`[electrocute-ui] Button: tone="${tone}" is deprecated — use intent.`)
  }

  const [hover, setHover] = React.useState(false)
  const c = intents[intent]
  const isOff = disabled || loading

  // A tone override swaps only the accent role for this element.
  const toneVars = tone
    ? ({ ['--ecu-accent' as string]: `var(--ecu-tone-${tone})`, ['--ecu-accent-ink' as string]: 'var(--ecu-ink)' })
    : null

  const variantStyle: React.CSSProperties =
    variant === 'outline'
      ? { background: hover && !isOff ? 'var(--ecu-surface-accent)' : 'transparent', color: 'var(--ecu-ink)', border: '1.5px solid var(--ecu-line-strong)' }
      : variant === 'ghost'
        ? { background: hover && !isOff ? 'var(--ecu-surface-accent)' : 'transparent', color: 'var(--ecu-ink)', border: '1.5px solid transparent' }
        : { background: hover && !isOff ? c.hover : c.bg, color: c.ink, border: '1.5px solid transparent' }

  return (
    <button
      ref={ref}
      data-ecu-component="button"
      data-ecu-intent={intent}
      data-ecu-variant={variant}
      disabled={isOff}
      aria-busy={loading || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'inherit',
        fontWeight: 600,
        lineHeight: 1.2,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: space[2],
        cursor: isOff ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        opacity: isOff ? 0.55 : 1,
        transition: `background ${motion.fast}, transform ${motion.fast}`,
        ...sizes[size],
        ...(variant === 'pill' ? { borderRadius: radius.pill } : null),
        ...variantStyle,
        ...(toneVars as React.CSSProperties),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
})

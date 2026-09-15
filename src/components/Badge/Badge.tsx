import React from 'react'
import { radius, space } from '../../tokens/space'
import { font } from '../../tokens/typography'

export type BadgeIntent = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: BadgeIntent
}

const intents: Record<BadgeIntent, { bg: string; ink: string }> = {
  neutral: { bg: 'var(--ecu-surface-sunken)', ink: 'var(--ecu-ink-muted)' },
  success: { bg: 'var(--ecu-success-surface)', ink: 'var(--ecu-success-ink)' },
  warning: { bg: 'var(--ecu-warning-surface)', ink: 'var(--ecu-warning-ink)' },
  danger: { bg: 'var(--ecu-danger-surface)', ink: 'var(--ecu-danger-ink)' },
  info: { bg: 'var(--ecu-info-surface)', ink: 'var(--ecu-info-ink)' },
}

export function Badge({ intent = 'neutral', style, ...rest }: BadgeProps) {
  const c = intents[intent]
  return (
    <span
      data-ecu-component="badge"
      style={{
        fontFamily: font.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: space[2],
        padding: '5px 11px', borderRadius: radius.pill,
        border: '1.5px solid transparent', // becomes visible in reader mode
        background: c.bg, color: c.ink,
        ...style,
      }}
      {...rest}
    />
  )
}

import React, { useId } from 'react'
import { space, radius, motion } from '../../tokens/space'
import { font } from '../../tokens/typography'

/**
 * The shell every form control shares — label, hint, error, and the aria
 * wiring between them. v0.4 left this to the consumer, which is exactly
 * where accessibility bugs entered.
 */
export interface FieldProps {
  label: React.ReactNode
  /** Helper text. Suppressed when `error` is set — never show both. */
  hint?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  children: (aria: {
    id: string
    'aria-describedby'?: string
    'aria-invalid'?: true
    required?: boolean
  }) => React.ReactNode
}

export function Field({ label, hint, error, required, children }: FieldProps) {
  const base = useId()
  const id = `ecu-${base}`
  const hintId = hint && !error ? `${id}-hint` : undefined
  const errId = error ? `${id}-err` : undefined

  return (
    <div data-ecu-component="field" style={{ display: 'flex', flexDirection: 'column', gap: space[2] }}>
      <label htmlFor={id} style={{ fontFamily: font.body, fontSize: 14, fontWeight: 600, color: 'var(--ecu-ink)' }}>
        {label}
        {required ? <span aria-hidden="true" style={{ color: 'var(--ecu-danger-ink)', marginLeft: 4 }}>*</span> : null}
      </label>

      {children({ id, 'aria-describedby': errId ?? hintId, 'aria-invalid': error ? true : undefined, required })}

      {error ? (
        <span id={errId} role="alert" style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: 'var(--ecu-danger-ink)' }}>
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} style={{ fontFamily: font.body, fontSize: 13, color: 'var(--ecu-ink-muted)' }}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}

/** Shared visual shell for input / select / textarea. */
export const controlStyle = (invalid?: boolean): React.CSSProperties => ({
  fontFamily: font.body,
  fontSize: 16, // never below 16px — iOS zooms smaller inputs
  padding: `${space[3]} ${space[4]}`,
  minHeight: 44,
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: radius.md,
  border: `1.5px solid ${invalid ? 'var(--ecu-danger-ink)' : 'var(--ecu-line)'}`,
  background: invalid ? 'var(--ecu-danger-surface)' : 'var(--ecu-surface)',
  color: 'var(--ecu-ink)',
  outline: 'none',
  transition: `border-color ${motion.fast}, box-shadow ${motion.fast}`,
})

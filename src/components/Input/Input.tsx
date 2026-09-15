import React, { forwardRef } from 'react'
import { Field, controlStyle } from '../Field/Field'
import { space, radius } from '../../tokens/space'
import { font } from '../../tokens/typography'

type Shared = { label: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode }

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>, Shared {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, style, ...rest }, ref,
) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {(aria) => <input ref={ref} className="ecu-control" data-ecu-component="input" {...aria} style={{ ...controlStyle(!!error), ...style }} {...rest} />}
    </Field>
  )
})

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>, Shared {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, required, rows = 4, style, ...rest }, ref,
) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {(aria) => (
        <textarea ref={ref} className="ecu-control" data-ecu-component="textarea" rows={rows} {...aria}
          style={{ ...controlStyle(!!error), resize: 'vertical', lineHeight: 1.55, ...style }} {...rest} />
      )}
    </Field>
  )
})

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'>, Shared {
  options?: Array<{ value: string; label: string }>
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, required, options, children, style, ...rest }, ref,
) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {(aria) => (
        <select ref={ref} className="ecu-control" data-ecu-component="select" {...aria} style={{ ...controlStyle(!!error), ...style }} {...rest}>
          {options ? options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>) : children}
        </select>
      )}
    </Field>
  )
})

export interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode
  hint?: React.ReactNode
}

/** Checkbox and Radio share one shell: 44px row, 20px control, label is the target. */
function Choice({ type, label, hint, disabled, style, ...rest }: ChoiceProps & { type: 'checkbox' | 'radio' }) {
  return (
    <label
      data-ecu-component={type}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: space[3], minHeight: 44, padding: `${space[2]} 0`,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1,
        fontFamily: font.body, fontSize: 16, color: 'var(--ecu-ink)',
      }}
    >
      <input
        type={type}
        disabled={disabled}
        style={{
          width: 20, height: 20, marginTop: 2, flex: 'none', accentColor: 'var(--ecu-focus)',
          borderRadius: type === 'checkbox' ? radius.sm : undefined, ...style,
        }}
        {...rest}
      />
      <span>
        {label}
        {hint ? <span style={{ display: 'block', fontSize: 13, color: 'var(--ecu-ink-muted)', marginTop: 2 }}>{hint}</span> : null}
      </span>
    </label>
  )
}

export const Checkbox = (p: ChoiceProps) => <Choice type="checkbox" {...p} />
export const Radio = (p: ChoiceProps) => <Choice type="radio" {...p} />

export interface SwitchProps {
  checked: boolean
  onCheckedChange: (next: boolean) => void
  /** Required — a switch with no accessible name is unusable by screen readers. */
  label: string
  disabled?: boolean
}

export function Switch({ checked, onCheckedChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      data-ecu-component="switch"
      style={{
        width: 54, height: 30, padding: 3, borderRadius: radius.pill, border: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: checked ? 'flex-end' : 'flex-start',
        background: checked ? 'var(--ecu-focus)' : 'var(--ecu-line)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1,
        transition: 'background 180ms cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      <span style={{ width: 24, height: 24, borderRadius: radius.pill, background: 'var(--ecu-surface)', display: 'block' }} />
    </button>
  )
}

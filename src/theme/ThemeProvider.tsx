import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { tone, themeNames, type ThemeName } from '../tokens/colors'
import './theme.css'

const STORAGE_KEY = 'ecu-theme'

interface ThemeContextValue {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

function systemTheme(): ThemeName {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function storedTheme(): ThemeName | null {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  return themeNames.includes(v as ThemeName) ? (v as ThemeName) : null
}

export interface ThemeProviderProps {
  children: React.ReactNode
  /** 'document' sets data-ecu-theme on <html>; 'wrapper' (default) scopes to a div. */
  target?: 'wrapper' | 'document'
  defaultTheme?: ThemeName
}

export function ThemeProvider({ children, target = 'wrapper', defaultTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => storedTheme() ?? defaultTheme ?? systemTheme())

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t)
    try { window.localStorage.setItem(STORAGE_KEY, t) } catch { /* private mode */ }
  }, [])

  useEffect(() => {
    if (target !== 'document') return
    const root = document.documentElement
    const prev = root.getAttribute('data-ecu-theme')
    root.setAttribute('data-ecu-theme', theme)
    return () => { prev ? root.setAttribute('data-ecu-theme', prev) : root.removeAttribute('data-ecu-theme') }
  }, [theme, target])

  // Follow the OS only while the user hasn't made an explicit choice.
  useEffect(() => {
    if (storedTheme() || typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setThemeState(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Expose the 24 tones as vars too, so `tone` props resolve in CSS not JS.
  const toneVars = useMemo(() => {
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(tone)) out[`--ecu-tone-${k}`] = v
    return out as React.CSSProperties
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      {target === 'document' ? (
        <div style={toneVars}>{children}</div>
      ) : (
        <div data-ecu-theme={theme} style={{ ...toneVars, background: 'var(--ecu-canvas)', color: 'var(--ecu-ink)' }}>
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  )
}

const LABELS: Record<ThemeName, string> = {
  light: 'Light', dark: 'Dark', accessible: 'Reader', 'mono-light': 'Mono', 'mono-dark': 'Mono dark',
}

export interface ThemeSwitcherProps {
  theme?: ThemeName
  onThemeChange?: (t: ThemeName) => void
}

/** v0.4 took theme/onThemeChange as props; v0.5 falls back to context. */
export function ThemeSwitcher({ theme: themeProp, onThemeChange }: ThemeSwitcherProps) {
  const ctx = useContext(ThemeContext)
  const theme = themeProp ?? ctx?.theme ?? 'light'
  const set = onThemeChange ?? ctx?.setTheme ?? (() => {})

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      style={{ display: 'inline-flex', gap: 4, padding: 4, borderRadius: 999, background: 'var(--ecu-surface-sunken)' }}
    >
      {(Object.keys(LABELS) as ThemeName[]).map((t) => (
        <button
          key={t}
          type="button"
          role="radio"
          aria-checked={theme === t}
          onClick={() => set(t)}
          style={{
            font: 'inherit', fontSize: 14, fontWeight: 600, padding: '9px 18px', borderRadius: 999,
            border: 'none', cursor: 'pointer',
            background: theme === t ? 'var(--ecu-surface)' : 'transparent',
            color: theme === t ? 'var(--ecu-ink)' : 'var(--ecu-ink-muted)',
          }}
        >
          {LABELS[t]}
        </button>
      ))}
    </div>
  )
}

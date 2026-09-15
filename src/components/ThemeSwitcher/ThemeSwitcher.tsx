// v0.5: ThemeSwitcher now lives in theme/ThemeProvider.tsx and is context-aware
// (falls back to useTheme() when theme/onThemeChange aren't passed). This file
// re-exports it so existing imports from this folder keep working.
export { ThemeSwitcher } from '../../theme/ThemeProvider'
export type { ThemeSwitcherProps } from '../../theme/ThemeProvider'

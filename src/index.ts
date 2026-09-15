export { Button } from "./components/Button/Button";
export type {
  ButtonProps,
  ButtonIntent,
  ButtonVariant,
  ButtonSize,
} from "./components/Button/Button";

export { Card } from "./components/Card/Card";
export type { CardProps } from "./components/Card/Card";

export { Field, controlStyle } from "./components/Field/Field";
export type { FieldProps } from "./components/Field/Field";

export { Input, Textarea, Select, Checkbox, Radio, Switch } from "./components/Input/Input";
export type {
  InputProps,
  TextareaProps,
  SelectProps,
  ChoiceProps,
  SwitchProps,
} from "./components/Input/Input";

export { Badge } from "./components/Badge/Badge";
export type { BadgeProps, BadgeIntent } from "./components/Badge/Badge";

export { Nav } from "./components/Nav/Nav";
export type { NavProps, NavItem, NavTheme } from "./components/Nav/Nav";

export { Toggle } from "./components/Toggle/Toggle";
export type { ToggleProps } from "./components/Toggle/Toggle";

export { Avatar } from "./components/Avatar/Avatar";
export type {
  AvatarProps,
  AvatarSize,
  AvatarTone,
} from "./components/Avatar/Avatar";

export { Inkbloom } from "./components/Inkbloom/Inkbloom";
export type {
  InkbloomProps,
  InkbloomSize,
} from "./components/Inkbloom/Inkbloom";

export { BloomOutline } from "./components/BloomOutline/BloomOutline";
export type {
  BloomOutlineProps,
  BloomOutlineSize,
} from "./components/BloomOutline/BloomOutline";

// v0.5: ThemeSwitcher moved into theme/ThemeProvider.tsx (context-aware).
// Re-exported from its old folder too — see components/ThemeSwitcher/ThemeSwitcher.tsx.
export { ThemeProvider, ThemeSwitcher, useTheme } from "./theme/ThemeProvider";
export type { ThemeProviderProps, ThemeSwitcherProps } from "./theme/ThemeProvider";
// theme.css is imported by ThemeProvider.tsx itself — no separate side-effect import needed here.

export * from "./tokens";

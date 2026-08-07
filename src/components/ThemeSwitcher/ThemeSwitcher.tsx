import { forwardRef, HTMLAttributes } from "react";
import { EcuTheme } from "../../theme/ThemeProvider";
import "./ThemeSwitcher.css";

export interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  theme: EcuTheme;
  onThemeChange: (theme: EcuTheme) => void;
}

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
const ReaderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="6" cy="15" r="3.5" />
    <circle cx="18" cy="15" r="3.5" />
    <path d="M9.5 15h5M2 12l1.5-4.5A2 2 0 015.4 6h.2M22 12l-1.5-4.5A2 2 0 0018.6 6h-.2" />
  </svg>
);

const OPTIONS: { value: EcuTheme; label: string; icon: JSX.Element }[] = [
  { value: "light", label: "Light mode", icon: <SunIcon /> },
  { value: "dark", label: "Dark mode", icon: <MoonIcon /> },
  { value: "accessible", label: "Reader mode", icon: <ReaderIcon /> },
];

/**
 * ThemeSwitcher — three-way light/dark/reader control. Toggle stays
 * boolean-only (its own spec), so this is a separate component.
 *
 *   const { theme, setTheme } = useTheme();
 *   <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
 */
export const ThemeSwitcher = forwardRef<HTMLDivElement, ThemeSwitcherProps>(
  ({ theme, onThemeChange, className, ...rest }, ref) => {
    const classes = ["ecu-theme-switcher"]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Color theme"
        className={classes}
        {...rest}
      >
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={theme === opt.value}
            aria-label={opt.label}
            className={`ecu-theme-switcher__option ${
              theme === opt.value ? "ecu-theme-switcher__option--active" : ""
            }`}
            onClick={() => onThemeChange(opt.value)}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    );
  },
);

ThemeSwitcher.displayName = "ThemeSwitcher";

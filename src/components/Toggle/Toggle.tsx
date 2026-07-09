import { ButtonHTMLAttributes, forwardRef } from "react";
import "./Toggle.css";

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Renders moon/sun icons in the track, matching the Controls row in the Figma Icons panel */
  showIcons?: boolean;
  label?: string;
}

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

/**
 * Toggle — light/dark style switch matching the moon/sun Controls icons
 * shown in the Figma Icons panel.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onChange, showIcons = true, label, className, ...rest }, ref) => {
    const classes = ["ecu-toggle", checked ? "ecu-toggle--on" : ""]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ?? "Toggle dark mode"}
        className={classes}
        onClick={() => onChange(!checked)}
        {...rest}
      >
        <span className="ecu-toggle__track">
          {showIcons && (
            <>
              <span className="ecu-toggle__icon ecu-toggle__icon--sun"><SunIcon /></span>
              <span className="ecu-toggle__icon ecu-toggle__icon--moon"><MoonIcon /></span>
            </>
          )}
          <span className="ecu-toggle__thumb" />
        </span>
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

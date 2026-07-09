import { InputHTMLAttributes, forwardRef, useId } from "react";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Input — text field with 14px radius, matching the "article images and
 * input fields" spec from the Border Radius panel.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const classes = ["ecu-input"]
      .concat(error ? ["ecu-input--error"] : [])
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <div className="ecu-field">
        {label && (
          <label className="ecu-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={classes}
          aria-invalid={!!error}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          {...rest}
        />
        {hint && !error && (
          <span id={hintId} className="ecu-field__hint">
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} className="ecu-field__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

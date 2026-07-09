import { ButtonHTMLAttributes, forwardRef } from "react";
import "./Button.css";

export type ButtonTone = "purple" | "pink" | "yellow" | "green";
export type ButtonVariant = "solid" | "outline" | "pill";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  tone?: ButtonTone;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Button — the 4-tone x 3-variant grid from the Electrocute design system,
 * plus large primary/secondary CTA sizes (30px / 10px radius per the
 * Border Radius spec).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { tone = "purple", variant = "solid", size = "md", className, children, ...rest },
    ref
  ) => {
    const classes = ["ecu-button", `ecu-button--${tone}`, `ecu-button--${variant}`, `ecu-button--${size}`]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

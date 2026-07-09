import { HTMLAttributes, ReactNode, forwardRef } from "react";
import "./Card.css";

export type CardTone = "green" | "yellow" | "pink" | "mint" | "purple" | "mochi";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  /** Shows the filled hover-state avatar circle, matching the Figma "on hover" cards */
  hoverAccent?: boolean;
  children?: ReactNode;
}

/**
 * Card — pastel-tinted content card, 20px radius per the Border Radius spec.
 * Four tones match the palette rows shown in the Figma cards panel.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ tone = "green", hoverAccent = false, className, children, ...rest }, ref) => {
    const classes = ["ecu-card", `ecu-card--${tone}`]
      .concat(hoverAccent ? ["ecu-card--hover-accent"] : [])
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {hoverAccent && <div className="ecu-card__accent" aria-hidden="true" />}
        <div className="ecu-card__body">{children ?? "Some usage of information."}</div>
      </div>
    );
  }
);

Card.displayName = "Card";

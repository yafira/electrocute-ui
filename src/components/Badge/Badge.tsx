import { HTMLAttributes, ReactNode, forwardRef } from "react";
import "./Badge.css";

export type BadgeTone = "lavender-beam" | "peony-fizz" | "marzipan-cloud" | "pistachio-swirl" | "gray";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  children?: ReactNode;
}

/**
 * Badge — small pill label, reusing the same tone palette as Button and Card
 * so tags stay visually consistent with the rest of the system.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = "lavender-beam", className, children, ...rest }, ref) => {
    const classes = ["ecu-badge", `ecu-badge--${tone}`]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <span ref={ref} className={classes} {...rest}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

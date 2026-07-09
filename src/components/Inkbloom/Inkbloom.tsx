import { HTMLAttributes, forwardRef } from "react";
import { inkbloomDataUri } from "./inkbloom-data";
import "./Inkbloom.css";

export type InkbloomSize = "sm" | "md" | "lg";

export interface InkbloomProps extends Omit<HTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  size?: InkbloomSize;
}

/**
 * Inkbloom — the black blossom signature mark: the flower is Yafira
 * (all-black, always), set against the pastel world around it. Used the
 * same way the mark sits beside section titles in the Figma design system
 * file — a small accent, not a decoration to scatter everywhere.
 *
 * Inlined as a base64 data URI (not a file import) so this component works
 * regardless of the consumer's bundler/asset config.
 */
export const Inkbloom = forwardRef<HTMLImageElement, InkbloomProps>(
  ({ size = "md", className, ...rest }, ref) => {
    const classes = ["ecu-inkbloom", `ecu-inkbloom--${size}`]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <img
        ref={ref}
        src={inkbloomDataUri}
        alt=""
        className={classes}
        {...rest}
      />
    );
  }
);

Inkbloom.displayName = "Inkbloom";

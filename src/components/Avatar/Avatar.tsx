import { HTMLAttributes, forwardRef, useState } from "react";
import "./Avatar.css";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarTone = "lavender-beam" | "peony-fizz" | "marzipan-cloud" | "pistachio-swirl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  /** Shown when there's no image, or the image fails to load */
  initials?: string;
  size?: AvatarSize;
  tone?: AvatarTone;
}

/**
 * Avatar — circular image/initials, echoing the filled hover-accent circle
 * from the Figma Cards panel.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = "", initials, size = "md", tone = "lavender-beam", className, ...rest }, ref) => {
    const [errored, setErrored] = useState(false);
    const showImage = src && !errored;

    const classes = ["ecu-avatar", `ecu-avatar--${size}`, `ecu-avatar--${tone}`]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {showImage ? (
          <img
            className="ecu-avatar__img"
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="ecu-avatar__initials" aria-hidden={!!alt}>
            {initials ?? "?"}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

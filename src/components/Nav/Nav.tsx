import { HTMLAttributes, ReactNode, forwardRef } from "react";
import "./Nav.css";

export type NavTheme = "light" | "outline" | "dark";

export interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface NavProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  theme?: NavTheme;
}

/**
 * Nav — icon-only navigation bar with three themes (light / outline / dark),
 * matching the three Nav variants shown in the Figma file. The active item
 * gets a filled circle behind its icon, same as the dark-theme example.
 */
export const Nav = forwardRef<HTMLElement, NavProps>(
  ({ items, activeId, onSelect, theme = "light", className, ...rest }, ref) => {
    const classes = ["ecu-nav", `ecu-nav--${theme}`]
      .concat(className ? [className] : [])
      .join(" ");

    return (
      <nav ref={ref} className={classes} {...rest}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              className={["ecu-nav__item", isActive ? "ecu-nav__item--active" : ""].join(" ")}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>
    );
  }
);

Nav.displayName = "Nav";

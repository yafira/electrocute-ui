import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./theme.css";

export type EcuTheme = "light" | "dark" | "accessible";

const STORAGE_KEY = "ecu-theme";
const THEMES: EcuTheme[] = ["light", "dark", "accessible"];

interface ThemeContextValue {
  theme: EcuTheme;
  setTheme: (theme: EcuTheme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDefault(): EcuTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Controlled theme value. Omit to let ThemeProvider manage its own state. */
  theme?: EcuTheme;
  onThemeChange?: (theme: EcuTheme) => void;
  /**
   * "self" (default) sets data-ecu-theme on this component's wrapper
   * div. "document" sets it on document.documentElement instead.
   */
  target?: "self" | "document";
  /** Skip localStorage persistence — useful in controlled mode. */
  disablePersistence?: boolean;
}

/**
 * ThemeProvider — drives light/dark/accessible mode. Defaults to
 * system color-scheme preference, then remembers the person's choice
 * in localStorage. Works uncontrolled or controlled (pass `theme` +
 * `onThemeChange`).
 */
export function ThemeProvider({
  children,
  theme: controlledTheme,
  onThemeChange,
  target = "self",
  disablePersistence = false,
}: ThemeProviderProps) {
  const [internalTheme, setInternalTheme] = useState<EcuTheme>(() => {
    if (controlledTheme) return controlledTheme;
    if (!disablePersistence && typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.includes(stored as EcuTheme)) {
        return stored as EcuTheme;
      }
    }
    return getSystemDefault();
  });

  const theme = controlledTheme ?? internalTheme;

  const setTheme = useCallback(
    (next: EcuTheme) => {
      if (!controlledTheme) {
        setInternalTheme(next);
        if (!disablePersistence && typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, next);
        }
      }
      onThemeChange?.(next);
    },
    [controlledTheme, disablePersistence, onThemeChange],
  );

  const cycleTheme = useCallback(() => {
    const nextIndex = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  }, [theme, setTheme]);

  useEffect(() => {
    if (target === "document" && typeof document !== "undefined") {
      document.documentElement.setAttribute("data-ecu-theme", theme);
    }
  }, [theme, target]);

  const value = useMemo(
    () => ({ theme, setTheme, cycleTheme }),
    [theme, setTheme, cycleTheme],
  );

  if (target === "document") {
    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      <div data-ecu-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

/** useTheme — read/update the current theme from within a ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}

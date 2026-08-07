import { useState } from "react";
import {
  Button,
  Card,
  Nav,
  Input,
  Badge,
  Avatar,
  ThemeProvider,
  ThemeSwitcher,
  useTheme,
  type NavItem,
} from "../src";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2 0 3.5 1.2 6 4 2.5-2.8 4-4 6-4 4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z" />
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
  </svg>
);

const navItems: NavItem[] = [
  { id: "home", icon: <HomeIcon />, label: "Home" },
  { id: "favorites", icon: <HeartIcon />, label: "Favorites" },
  { id: "settings", icon: <GearIcon />, label: "Settings" },
];

const components = [
  {
    name: "Button",
    tone: "lavender-beam" as const,
    desc: "4 tones × solid / outline / pill, plus large CTA sizes",
  },
  {
    name: "Card",
    tone: "peony-fizz" as const,
    desc: "6 pastel tones with an optional hover-accent state",
  },
  {
    name: "Nav",
    tone: "marzipan-cloud" as const,
    desc: "Icon nav bar — light / outline / dark themes",
  },
  {
    name: "Input",
    tone: "pistachio-swirl" as const,
    desc: "Text field with hint and error states",
  },
  {
    name: "Toggle",
    tone: "lavender-beam" as const,
    desc: "Light/dark switch with moon/sun icons",
  },
  {
    name: "Badge",
    tone: "peony-fizz" as const,
    desc: "Small pill label in five tones",
  },
  {
    name: "Avatar",
    tone: "marzipan-cloud" as const,
    desc: "Image or initials, four tinted fallbacks",
  },
  {
    name: "Inkbloom",
    tone: "pistachio-swirl" as const,
    desc: "Animated ink-bloom mark, three sizes",
  },
  {
    name: "BloomOutline",
    tone: "lavender-beam" as const,
    desc: "Outline variant of the Inkbloom mark",
  },
  {
    name: "ThemeSwitcher",
    tone: "peony-fizz" as const,
    desc: "Light / dark / reader mode control",
  },
];

/**
 * DemoFrame — lives inside its own ThemeProvider so it can preview
 * light/dark/reader independently of the rest of the page. Replaces
 * the old hand-rolled boolean + .demo-frame--dark class, which only
 * covered light/dark and didn't use the real theme system at all.
 */
function DemoFrame() {
  const { theme } = useTheme();
  const [active, setActive] = useState("home");

  return (
    <section className="demo-frame">
      <div className="demo-frame__top">
        <Nav
          items={navItems}
          activeId={active}
          onSelect={setActive}
          theme={theme === "dark" ? "dark" : "light"}
        />
        <ThemeSwitcherControls />
      </div>

      <div className="demo-frame__grid">
        <div className="demo-frame__col">
          <div className="demo-frame__row">
            <Button tone="lavender-beam" variant="solid">
              Button
            </Button>
            <Button tone="peony-fizz" variant="outline">
              Button
            </Button>
            <Button tone="pistachio-swirl" variant="pill">
              Button
            </Button>
          </div>
          <Input
            label="Email"
            placeholder="you@electrocute.io"
            hint="Try typing — it's a real input."
          />
          <div className="demo-frame__row">
            <Badge tone="lavender-beam">soft circuits</Badge>
            <Badge tone="peony-fizz">e-textiles</Badge>
            <Badge tone="marzipan-cloud">poetronics</Badge>
            <Badge tone="pistachio-swirl">calm tech</Badge>
          </div>
        </div>

        <div className="demo-frame__col">
          <Card tone="mochi-cream">
            <div className="demo-frame__card-body">
              <span className="demo-frame__avatar-halo">
                <Avatar
                  src="/inkbloom.png"
                  alt="Electrocute Lab"
                  tone="lavender-beam"
                  size="sm"
                />
              </span>
              <div>
                <p className="demo-frame__card-title">Electrocute Lab</p>
                <p className="demo-frame__card-sub">
                  design engineering · creative tech · NYC
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ThemeSwitcherControls() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="demo-frame__toggle">
      <span className="demo-frame__toggle-label">{theme}</span>
      <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
    </div>
  );
}

export function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">
          <img src="/inkbloom.png" alt="" className="eyebrow__mark" />
          design system · electrocute lab
        </p>
        <h1 className="wordmark">electrocute-ui</h1>
        <p className="tagline">
          The React component library behind Electrocute Lab and electrocute.io
          — design tokens, ten components, light/dark/reader theming, and a live
          Storybook.
        </p>
        <div className="cta-row">
          <a href="/storybook/" className="cta-link">
            <Button tone="lavender-beam" variant="pill">
              View Storybook
            </Button>
          </a>
          <a
            href="https://www.npmjs.com/package/electrocute-ui"
            className="cta-link"
            target="_blank"
            rel="noreferrer"
          >
            <Button tone="peony-fizz" variant="outline">
              View on npm
            </Button>
          </a>
          <a
            href="https://github.com/yafira/electrocute-ui"
            className="cta-link"
            target="_blank"
            rel="noreferrer"
          >
            <Button tone="marzipan-cloud" variant="outline">
              GitHub
            </Button>
          </a>
        </div>
        <code className="install-snippet">npm install electrocute-ui</code>
      </header>

      {/* SIGNATURE ELEMENT: a live, working demo panel built from the real
          components — not screenshots. The ThemeSwitcher genuinely flips
          this panel's own light/dark/reader state via data-ecu-theme. */}
      <ThemeProvider>
        <DemoFrame />
      </ThemeProvider>

      <section className="components-list">
        <h2>What's inside</h2>
        <ul>
          {components.map((c) => (
            <li key={c.name}>
              <Badge tone={c.tone}>{c.name}</Badge>
              <span>{c.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <p>
          Built from the Electrocute Design System Figma file · MIT licensed ·{" "}
          <a href="https://electrocute.io" target="_blank" rel="noreferrer">
            electrocute.io
          </a>
        </p>
        <div className="footer-links">
          <a href="/storybook/">Storybook</a>
          <a
            href="https://www.npmjs.com/package/electrocute-ui"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
          <a
            href="https://github.com/yafira/electrocute-ui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

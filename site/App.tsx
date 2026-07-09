import { useState } from "react";
import {
  Button,
  Card,
  Nav,
  Input,
  Toggle,
  Badge,
  Avatar,
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
  { name: "Button", tone: "purple" as const, desc: "4 tones × solid / outline / pill, plus large CTA sizes" },
  { name: "Card", tone: "pink" as const, desc: "6 pastel tones with an optional hover-accent state" },
  { name: "Nav", tone: "yellow" as const, desc: "Icon nav bar — light / outline / dark themes" },
  { name: "Input", tone: "green" as const, desc: "Text field with hint and error states" },
  { name: "Toggle", tone: "purple" as const, desc: "Light/dark switch with moon/sun icons" },
  { name: "Badge", tone: "pink" as const, desc: "Small pill label in five tones" },
  { name: "Avatar", tone: "yellow" as const, desc: "Image or initials, four tinted fallbacks" },
];

export function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("home");

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">design system · electrocute lab</p>
        <h1 className="wordmark">electrocute-ui</h1>
        <p className="tagline">
          The React component library behind Electrocute Lab and electrocute.io —
          design tokens, seven components, and a live Storybook.
        </p>
        <div className="cta-row">
          <a href="/storybook/" className="cta-link">
            <Button tone="purple" variant="pill">View Storybook</Button>
          </a>
          <a href="https://www.npmjs.com/package/electrocute-ui" className="cta-link" target="_blank" rel="noreferrer">
            <Button tone="pink" variant="outline">View on npm</Button>
          </a>
          <a href="https://github.com/yafira/electrocute-ui" className="cta-link" target="_blank" rel="noreferrer">
            <Button tone="yellow" variant="outline">GitHub</Button>
          </a>
        </div>
        <code className="install-snippet">npm install electrocute-ui</code>
      </header>

      {/* SIGNATURE ELEMENT: a live, working demo panel built from the real
          components — not screenshots. The Toggle genuinely flips this
          panel's own light/dark state. */}
      <section className={`demo-frame ${dark ? "demo-frame--dark" : ""}`}>
        <div className="demo-frame__top">
          <Nav items={navItems} activeId={active} onSelect={setActive} theme={dark ? "dark" : "light"} />
          <div className="demo-frame__toggle">
            <span className="demo-frame__toggle-label">{dark ? "dark" : "light"}</span>
            <Toggle checked={dark} onChange={setDark} label="Toggle light/dark preview" />
          </div>
        </div>

        <div className="demo-frame__grid">
          <div className="demo-frame__col">
            <div className="demo-frame__row">
              <Button tone="purple" variant="solid">Button</Button>
              <Button tone="pink" variant="outline">Button</Button>
              <Button tone="green" variant="pill">Button</Button>
            </div>
            <Input label="Email" placeholder="you@electrocute.io" hint="Try typing — it's a real input." />
            <div className="demo-frame__row">
              <Badge tone="purple">soft circuits</Badge>
              <Badge tone="pink">e-textiles</Badge>
              <Badge tone="yellow">poetronics</Badge>
              <Badge tone="green">calm tech</Badge>
            </div>
          </div>

          <div className="demo-frame__col">
            <Card tone="mochi" hoverAccent>
              <div className="demo-frame__card-body">
                <Avatar initials="YM" tone="purple" size="sm" />
                <span>Hover this card</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

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
          <a href="https://electrocute.io" target="_blank" rel="noreferrer">electrocute.io</a>
        </p>
        <div className="footer-links">
          <a href="/storybook/">Storybook</a>
          <a href="https://www.npmjs.com/package/electrocute-ui" target="_blank" rel="noreferrer">npm</a>
          <a href="https://github.com/yafira/electrocute-ui" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

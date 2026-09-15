import { useState } from "react";
import {
  Button,
  Card,
  Badge,
  Input,
  Switch,
  Checkbox,
  Inkbloom,
  tone,
} from "../src";
import "../src/theme/theme.css";

/**
 * electrocute-ui docs site — "design system, actually running."
 *
 * The Components section below sets data-ecu-theme on its own wrapper and
 * lets the real component CSS vars cascade — same mechanism ThemeProvider
 * uses, just scoped to this one panel so switching it doesn't also flip
 * the rest of the page.
 */

const THEMES = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "accessible", label: "Reader" },
] as const;

type ThemeKey = (typeof THEMES)[number]["key"];

// Mirrors theme.css exactly — for the side-by-side role comparison table,
// where all three themes need to be visible on screen at once.
const ROLE_ROWS: { role: string; light: string; dark: string; reader: string }[] = [
  { role: "canvas", light: "#faf9fb", dark: "#141218", reader: "#ffffff" },
  { role: "surface", light: "#ffffff", dark: "#1e1b24", reader: "#ffffff" },
  { role: "surface.sunken", light: "#f5f7f8", dark: "#171520", reader: "#f2f2f2" },
  { role: "surface.accent", light: "#faf6ff", dark: "#241f33", reader: "#ffffff" },
  { role: "ink", light: "#1a1720", dark: "#f4f2f8", reader: "#000000" },
  { role: "ink.muted", light: "#55505e", dark: "#a9a3b8", reader: "#000000" },
  { role: "accent", light: "#baaeff", dark: "#8a78f0", reader: "#000000" },
  { role: "accent.ink", light: "#1a1720", dark: "#0d0b12", reader: "#ffffff" },
  { role: "line", light: "#e6e2ec", dark: "#332e3f", reader: "#000000" },
  { role: "focus", light: "#5b3fd6", dark: "#b9a9ff", reader: "#000000" },
];

const GUIDANCE = [
  {
    title: "Text on pastel",
    doText: "Pair every tinted surface with ink.900 or ink.700 at full opacity.",
    dontText:
      "Set body text in a pastel, or fade ink with opacity to soften it — that's how 3:1 copy happens.",
  },
  {
    title: "Choosing a tone",
    doText: "Reach for a role. If you need decoration, use tone and say so in a comment.",
    dontText:
      "Pick between wisteria-dust and grape-frost by eye — they differ by 4% and nobody will notice but you.",
  },
  {
    title: "Status color",
    doText: "Use the four status pairs. Surface and ink always travel together.",
    dontText: "Invent a red. Peony-fizz is not an error state, however pink it looks.",
  },
  {
    title: "Reader mode",
    doText: "Treat it as an override: black ink, white surface, visible borders, no tints.",
    dontText: "Try to make reader mode pretty. It's a legibility floor, not a fourth theme.",
  },
];

const ESSAYS = [
  {
    kicker: "Decision 01",
    title: "Keep all 24 names",
    body: "Cutting the palette to a tidy eight was the obvious move, and it was wrong. The names are the reason anyone remembers this system — mochi-cream is a thing you can ask for out loud. What was actually broken was that tones were the API, so every component author had to be a color designer.",
    punch: "So the tones stayed and a role layer went on top. Nothing was deleted; something was added.",
    bg: "var(--ecu-surface-accent)",
  },
  {
    kicker: "Decision 02",
    title: "Reader mode isn't a color scheme",
    body: "The temptation with a high-contrast mode is to make it an on-brand variant — slightly deeper pastels, a bit more border. That produces something that fails contrast checks and looks worse than either alternative.",
    punch: "Reader mode is deliberately blunt: black, white, hard borders, zero tint. It has one job and it does it.",
    bg: "#ECFFF9",
  },
  {
    kicker: "Decision 03",
    title: "Tokens should be build output",
    body: "src/tokens was hand-sampled from Figma, and it already carries a comment flagging two swatches that look like a copy-paste artifact. Hand-maintained tokens drift the moment anyone touches the file they came from.",
    punch: "v0.7 generates tokens from a Figma Tokens export in CI. Until then, the comment stays — an honest note beats a silent wrong value.",
    bg: "#FFF4E8",
  },
];

function CopyInstall() {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText("npm install electrocute-ui");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={onCopy}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 18px",
        borderRadius: 12,
        border: "1px solid var(--ecu-line)",
        background: "var(--ecu-surface)",
        color: "var(--ecu-ink)",
        cursor: "pointer",
      }}
    >
      <span style={{ color: "var(--ecu-ink-subtle)" }}>$</span>
      <span>npm install electrocute-ui</span>
      <span
        style={{
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ecu-focus)",
          fontWeight: 600,
        }}
      >
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}

/** The live, theme-switchable panel — sets data-ecu-theme locally so the
 * real component CSS reacts, same as it would under a real ThemeProvider. */
function ComponentsShowcase() {
  const [theme, setTheme] = useState<ThemeKey>("light");
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <h2 style={sectionHeadingStyle}>Components, actually running</h2>
          <p style={sectionBodyStyle}>
            Not screenshots. Switch the theme and watch every component below follow — that's
            the role layer doing its job.
          </p>
        </div>
        <div style={{ display: "flex", gap: 4, padding: 4, background: "#F2F0F6", borderRadius: 999 }}>
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              style={{
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                padding: "9px 18px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: theme === t.key ? "#FFFFFF" : "transparent",
                color: theme === t.key ? "#1A1720" : "#55505E",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        data-ecu-theme={theme}
        style={{
          borderRadius: 24,
          padding: "clamp(20px, 4vw, 36px)",
          border: "1px solid var(--ecu-line)",
          background: "var(--ecu-canvas)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 20,
          }}
        >
          <ShowcaseTile label="Button">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Button intent="primary" variant="solid">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button intent="neutral" variant="pill">Pill</Button>
            </div>
          </ShowcaseTile>

          <ShowcaseTile label="Field">
            <Input label="Email" placeholder="you@electrocute.io" hint="Hint text lives in the field shell." />
          </ShowcaseTile>

          <ShowcaseTile label="Card · interactive" accent>
            <Card interactive surface="accent">
              <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 8 }}>
                Inkbloom covers
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: "var(--ecu-ink-muted)" }}>
                Focusable, keyboard-reachable, hover-accented.
              </p>
            </Card>
          </ShowcaseTile>

          <ShowcaseTile label="Badge · status pairs">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Badge intent="success">shipped</Badge>
              <Badge intent="warning">beta</Badge>
              <Badge intent="danger">deprecated</Badge>
              <Badge intent="info">info</Badge>
            </div>
          </ShowcaseTile>

          <ShowcaseTile label="Nav">
            <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 999, background: "var(--ecu-surface-sunken)" }}>
              {["Aa", "Bb", "Cc", "Dd"].map((glyph, i) => (
                <div
                  key={glyph}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 13,
                    fontWeight: 600,
                    background: i === 0 ? "var(--ecu-accent)" : "transparent",
                    color: i === 0 ? "var(--ecu-accent-ink)" : "var(--ecu-ink-muted)",
                  }}
                >
                  {glyph}
                </div>
              ))}
            </div>
          </ShowcaseTile>

          <ShowcaseTile label="Inkbloom · BloomOutline" badge="not themed yet">
            <div
              style={{
                borderRadius: 14,
                height: 132,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 14,
                border: "1px dashed var(--ecu-line)",
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(186,174,255,0.22) 0 6px, transparent 6px 12px)",
              }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, lineHeight: 1.5, color: "var(--ecu-ink-muted)" }}>
                live Inkbloom render
                <br />
                drops in here
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.5, margin: "14px 0 0", color: "var(--ecu-ink-muted)" }}>
              The generative pair still paints its own colors instead of reading{" "}
              <code style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>--ecu-accent</code>. Retrofit
              lands in v0.7.
            </p>
          </ShowcaseTile>

          <ShowcaseTile label="Switch · Checkbox">
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} label="Themed" />
              <Checkbox label="Themed" defaultChecked />
            </div>
          </ShowcaseTile>
        </div>

        <div
          style={{
            marginTop: 20,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            lineHeight: 1.6,
            padding: "16px 18px",
            borderRadius: 14,
            background: "var(--ecu-surface-sunken)",
            color: "var(--ecu-ink-muted)",
          }}
        >
          data-ecu-theme="{theme}" &nbsp;·&nbsp; --ecu-accent: var(--ecu-accent) &nbsp;·&nbsp; --ecu-ink: var(--ecu-ink)
          &nbsp;·&nbsp; --ecu-surface: var(--ecu-surface)
        </div>
      </div>
    </div>
  );
}

function ShowcaseTile({
  label,
  children,
  badge,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: accent ? "var(--ecu-surface-accent)" : "var(--ecu-surface)",
        border: "1px solid var(--ecu-line)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 18 }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ecu-ink-muted)",
          }}
        >
          {label}
        </div>
        {badge && (
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: 999,
              background: "#FFFAE0",
              color: "#7A4F00",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Sans Condensed', sans-serif",
  fontSize: 38,
  fontWeight: 600,
  letterSpacing: "-0.025em",
  margin: "0 0 12px",
};

const sectionBodyStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.55,
  color: "#3A3542",
  margin: 0,
  maxWidth: 640,
};

export function App() {
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", color: "#1A1720", background: "#FAF9FB", textWrap: "pretty" as any }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px clamp(20px, 5vw, 56px)",
          borderBottom: "1px solid #E6E2EC",
          background: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: tone["lavender-beam"], border: "1.5px solid #1A1720" }}>
            <Inkbloom size="sm" />
          </div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
            electrocute-ui
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 999,
              background: "#F4F0FF",
              color: "#3D269E",
              fontWeight: 600,
            }}
          >
            v0.5
          </span>
        </div>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <a href="#components" style={navLinkStyle}>Components</a>
          <a href="#tokens" style={navLinkStyle}>Tokens</a>
          <a href="#guidance" style={navLinkStyle}>Guidance</a>
          <a href="#thinking" style={navLinkStyle}>Thinking</a>
          <a href="/storybook/" style={{ ...navLinkStyle, fontWeight: 600, padding: "9px 18px", borderRadius: 999, background: "#1A1720", color: "#FFFFFF", marginLeft: 6 }}>
            Storybook →
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 56px) 72px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#55505E", marginBottom: 20 }}>
            Electrocute Lab · design system
          </div>
          <h1
            style={{
              fontFamily: "'IBM Plex Sans Condensed', sans-serif",
              fontSize: "clamp(44px, 7vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              fontWeight: 600,
              margin: "0 0 22px",
            }}
          >
            A cute palette with rules.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#3A3542", margin: "0 0 32px", maxWidth: 520 }}>
            Twenty-four named pastels, a semantic role layer that tells you which one to reach for,
            and thirteen React components that theme themselves. Built for the lab's own sites —
            documented like it's for someone else.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 26 }}>
            <a href="#components" style={{ textDecoration: "none" }}>
              <Button intent="primary" variant="pill" size="lg">Browse components</Button>
            </a>
            <a href="/storybook/" style={{ textDecoration: "none" }}>
              <Button intent="neutral" variant="outline" size="lg">Open Storybook</Button>
            </a>
          </div>
          <CopyInstall />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { name: "lavender-beam", role: "accent" },
            { name: "marzipan-cloud", role: "warning" },
            { name: "pistachio-swirl", role: "success" },
            { name: "peony-fizz", role: "accent.alt" },
          ].map((s) => (
            <div
              key={s.name}
              style={{
                background: tone[s.name as keyof typeof tone],
                borderRadius: 24,
                padding: 24,
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1.5px solid #1A1720",
              }}
            >
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.name}
              </div>
              <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                {s.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E6E2EC", borderBottom: "1px solid #E6E2EC" }}>
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "64px clamp(20px, 5vw, 56px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 40,
          }}
        >
          <Stat
            big="10 roles"
            body={
              <>
                Components name a role — <Code>accent</Code>, <Code>surface</Code>,{" "}
                <Code>ink.muted</Code> — never a tone. The theme does the mapping.
              </>
            }
          />
          <Stat
            big="3 themes"
            body="Light, dark, and reader — a blunt high-contrast mode for genuine accessibility needs, not a third color scheme."
          />
          <Stat
            big="4.5:1 floor"
            body="Every status colour ships as a surface/ink pair that clears WCAG AA. Contrast is checked in CI, not by eye."
          />
        </div>
      </section>

      {/* COMPONENTS */}
      <section id="components" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px clamp(20px, 5vw, 56px) 0", scrollMarginTop: 20 }}>
        <ComponentsShowcase />
      </section>

      {/* TOKENS */}
      <section id="tokens" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px clamp(20px, 5vw, 56px) 0", scrollMarginTop: 20 }}>
        <h2 style={sectionHeadingStyle}>Tokens</h2>
        <p style={{ ...sectionBodyStyle, marginBottom: 32 }}>
          Roles first, because that's the layer you actually write against. The tones are underneath,
          and they keep their silly names on purpose.
        </p>

        <div style={{ background: "#FFFFFF", border: "1px solid #E6E2EC", borderRadius: 20, padding: 8, overflowX: "auto", marginBottom: 22 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "190px 1fr 1fr 1fr",
              gap: 1,
              minWidth: 700,
              background: "#E6E2EC",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {["Role", "Light", "Dark", "Reader"].map((h) => (
              <div key={h} style={{ background: "#FAF9FB", padding: "13px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#55505E" }}>
                {h}
              </div>
            ))}
            {ROLE_ROWS.map((r) => (
              <div key={r.role} style={{ display: "contents" }}>
                <div style={{ background: "#FFFFFF", padding: "13px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 500 }}>
                  {r.role}
                </div>
                <div style={{ background: "#FFFFFF", padding: "13px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#55505E" }}>
                  {r.light}
                </div>
                <div style={{ background: "#FFFFFF", padding: "13px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#55505E" }}>
                  {r.dark}
                </div>
                <div style={{ background: "#FFFFFF", padding: "13px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#55505E" }}>
                  {r.reader}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#55505E", margin: "34px 0 14px" }}>
          All 24 tones
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 148px), 1fr))", gap: 10 }}>
          {Object.entries(tone).map(([name, hex]) => (
            <div key={name} style={{ border: "1px solid #E6E2EC", borderRadius: 14, overflow: "hidden", background: "#FFFFFF" }}>
              <div style={{ height: 52, background: hex }} />
              <div style={{ padding: "9px 11px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: 600 }}>{name}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#8A8494", marginTop: 2 }}>{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDANCE */}
      <section id="guidance" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px clamp(20px, 5vw, 56px) 0", scrollMarginTop: 20 }}>
        <h2 style={sectionHeadingStyle}>Guidance</h2>
        <p style={{ ...sectionBodyStyle, marginBottom: 32 }}>
          The part prop tables can't tell you. Each pair is a real mistake the old palette made easy.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 18 }}>
          {GUIDANCE.map((g) => (
            <div key={g.title} style={{ background: "#FFFFFF", border: "1px solid #E6E2EC", borderRadius: 20, padding: 24 }}>
              <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", margin: "0 0 16px" }}>
                {g.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={pillLabelStyle("#E7FBF0", "#0E5E3C")}>DO</span>
                  <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: "#3A3542" }}>{g.doText}</p>
                </div>
                <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={pillLabelStyle("#FFE4EC", "#A8123A")}>DON'T</span>
                  <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: "#3A3542" }}>{g.dontText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THINKING */}
      <section id="thinking" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px clamp(20px, 5vw, 56px) 0", scrollMarginTop: 20 }}>
        <h2 style={sectionHeadingStyle}>The thinking</h2>
        <p style={{ ...sectionBodyStyle, marginBottom: 32 }}>
          Three decisions worth arguing about, and why they went the way they did.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {ESSAYS.map((e) => (
            <article
              key={e.kicker}
              style={{
                borderRadius: 24,
                padding: "clamp(24px, 4vw, 40px)",
                background: e.bg,
                border: "1px solid rgba(26,23,32,0.08)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: 28,
                alignItems: "start",
              }}
            >
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#55505E", marginBottom: 12 }}>
                  {e.kicker}
                </div>
                <h3 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.08, margin: 0 }}>
                  {e.title}
                </h3>
              </div>
              <div>
                <p style={{ fontSize: 16.5, lineHeight: 1.6, margin: "0 0 14px", color: "#3A3542" }}>{e.body}</p>
                <p style={{ fontSize: 16.5, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{e.punch}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1240, margin: "80px auto 0", padding: "0 clamp(20px, 5vw, 56px)" }}>
        <div
          style={{
            background: "#1A1720",
            borderRadius: 28,
            padding: "clamp(32px, 6vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.02, margin: "0 0 14px", color: "#FFFFFF" }}>
              Install it, theme it, ship.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0, color: "#B8B2C4" }}>
              One provider, one data attribute, and every component follows. Reader mode included.
            </p>
          </div>
          <pre
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13.5,
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: "pre-wrap",
              color: "#E9E6F2",
              background: "#241F2E",
              padding: 22,
              borderRadius: 16,
            }}
          >
{`npm i electrocute-ui

import { ThemeProvider, Button }
  from "electrocute-ui";

<ThemeProvider target="document">
  <Button intent="primary">
    Get started
  </Button>
</ThemeProvider>`}
          </pre>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ maxWidth: 1240, margin: "0 auto", padding: "44px clamp(20px, 5vw, 56px) 64px", display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: "#8A8494" }}>
          electrocute-ui · Electrocute Lab
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 }}>
          <a href="https://github.com/yafira/electrocute-ui">GitHub</a>
          <a href="https://www.npmjs.com/package/electrocute-ui">npm</a>
          <a href="/storybook/">Storybook</a>
          <a href="https://electrocute.io">electrocute.io</a>
        </div>
      </footer>
    </div>
  );
}

function Stat({ big, body }: { big: string; body: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {big}
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: "#3A3542", margin: "12px 0 0" }}>{body}</p>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, background: "#F4F0FF", padding: "1px 5px", borderRadius: 4 }}>
      {children}
    </code>
  );
}

function pillLabelStyle(bg: string, ink: string): React.CSSProperties {
  return {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
    padding: "4px 8px",
    borderRadius: 999,
    background: bg,
    color: ink,
    flex: "none",
  };
}

const navLinkStyle: React.CSSProperties = {
  fontSize: 15,
  padding: "8px 12px",
  borderRadius: 10,
  color: "#1A1720",
  textDecoration: "none",
};

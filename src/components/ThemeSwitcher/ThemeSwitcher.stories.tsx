import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { EcuTheme } from "../../theme/ThemeProvider";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Playground: Story = {
  render: () => {
    const [theme, setTheme] = useState<EcuTheme>("light");
    return (
      <div data-ecu-theme={theme} style={{ padding: 24 }}>
        <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
      </div>
    );
  },
};

// pairs the switcher with the three retrofitted components so the
// token wiring is visible directly, not just trusted from the build.
// Note: the Storybook canvas background is separately controlled by
// the global "Theme" toolbar (see .storybook/preview.tsx) — this
// story's own switcher only affects the box below it.
export const WithComponents: Story = {
  render: () => {
    const [theme, setTheme] = useState<EcuTheme>("light");
    return (
      <div
        data-ecu-theme={theme}
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          background: "var(--ecu-surface)",
        }}
      >
        <ThemeSwitcher theme={theme} onThemeChange={setTheme} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button tone="lavender-beam" variant="solid">
            Solid
          </Button>
          <Button tone="peony-fizz" variant="pill">
            Pill
          </Button>
          <Button variant="outline">Outline</Button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Badge tone="lavender-beam">design</Badge>
          <Badge tone="pistachio-swirl">code</Badge>
          <Badge tone="gray">hardware</Badge>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <Card tone="lavender-beam">electrocute-ui</Card>
          <Card tone="pistachio-swirl">Soft Components</Card>
        </div>
      </div>
    );
  },
};

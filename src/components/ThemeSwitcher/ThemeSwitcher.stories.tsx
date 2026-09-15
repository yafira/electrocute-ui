import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import type { ThemeName } from "../../tokens/colors";
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
    const [theme, setTheme] = useState<ThemeName>("light");
    return (
      <div data-ecu-theme={theme} style={{ padding: 24 }}>
        <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
      </div>
    );
  },
};

// pairs the switcher with three retrofitted components so the token wiring
// is visible directly. Uses the v0.5 intent/surface API, not the deprecated
// tone prop.
export const WithComponents: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>("light");
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
          <Button intent="primary" variant="solid">
            Solid
          </Button>
          <Button intent="success" variant="pill">
            Pill
          </Button>
          <Button variant="outline">Outline</Button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Badge intent="info">design</Badge>
          <Badge intent="success">code</Badge>
          <Badge intent="neutral">hardware</Badge>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <Card surface="accent">electrocute-ui</Card>
          <Card surface="sunken">Soft Components</Card>
        </div>
      </div>
    );
  },
};

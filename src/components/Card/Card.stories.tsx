import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    surface: { control: "select", options: ["default", "sunken", "accent"] },
  },
  args: { surface: "default" },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <Card {...args}>Card content</Card>
    </div>
  ),
};

export const AllSurfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 160px)", gap: 16 }}>
      {(["default", "sunken", "accent"] as const).map((surface) => (
        <Card key={surface} surface={surface}>
          {surface}
        </Card>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <Card interactive onActivate={() => alert("activated")}>
        Click or press Enter/Space
      </Card>
    </div>
  ),
};

export const ToolCardPattern: Story = {
  name: "Real-world: tool card (tinytinker.tools pattern)",
  parameters: {
    docs: {
      description: {
        story:
          "The title + category badge + description pattern used across tinytinker.tools' tool grid — Card composes Badge directly as a child rather than needing its own badge prop.",
      },
    },
  },
  render: () => (
    <div style={{ width: 240 }}>
      <Card surface="sunken">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>resistor decoder</div>
          <Badge intent="info">decode</Badge>
          <div style={{ fontWeight: 400, fontSize: 13, color: "var(--ecu-ink-muted)" }}>
            color band → resistance value
          </div>
        </div>
      </Card>
    </div>
  ),
};

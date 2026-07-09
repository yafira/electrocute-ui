import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["pistachio-swirl", "marzipan-cloud", "peony-fizz", "glacier-mist", "lavender-beam", "mochi-cream"],
    },
  },
  args: { tone: "pistachio-swirl" },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <Card {...args} />
    </div>
  ),
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 160px)", gap: 16 }}>
      {(["pistachio-swirl", "marzipan-cloud", "peony-fizz", "glacier-mist", "lavender-beam", "mochi-cream"] as const).map(
        (tone) => (
          <Card key={tone} tone={tone} />
        )
      )}
    </div>
  ),
};

export const HoverAccentGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 160px)", gap: 16 }}>
      {(["pistachio-swirl", "marzipan-cloud", "peony-fizz", "glacier-mist", "lavender-beam", "mochi-cream"] as const).map(
        (tone) => (
          <Card key={tone} tone={tone} hoverAccent />
        )
      )}
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
      <Card tone="glacier-mist">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>resistor decoder</div>
          <Badge tone="peony-fizz">decode</Badge>
          <div style={{ fontWeight: 400, fontSize: 13, color: "#696262" }}>
            color band → resistance value
          </div>
        </div>
      </Card>
    </div>
  ),
};

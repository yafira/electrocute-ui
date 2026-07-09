import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

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

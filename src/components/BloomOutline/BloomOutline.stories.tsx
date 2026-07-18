import type { Meta, StoryObj } from "@storybook/react";
import { BloomOutline } from "./BloomOutline";

const meta: Meta<typeof BloomOutline> = {
  title: "Components/BloomOutline",
  component: BloomOutline,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The line-drawn sibling of Inkbloom: same five-petal blossom, traced as an open outline. Recolor it with `color` to pick up the palette around it — a corner mark, a divider, a hover state. Use sparingly, and don't reach for both marks on the same page without a reason.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "color" },
  },
  args: { size: "md" },
};
export default meta;

type Story = StoryObj<typeof BloomOutline>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <BloomOutline size="sm" />
      <BloomOutline size="md" />
      <BloomOutline size="lg" />
    </div>
  ),
};

export const OnPalette: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ background: "#fff3f8", padding: 12, borderRadius: 8 }}>
        <BloomOutline size="lg" color="#f2b9e0" />
      </div>
      <div style={{ background: "#f3faea", padding: 12, borderRadius: 8 }}>
        <BloomOutline size="lg" color="#b7dcae" />
      </div>
      <div style={{ background: "#f4f0ff", padding: 12, borderRadius: 8 }}>
        <BloomOutline size="lg" color="#d5c8fa" />
      </div>
    </div>
  ),
};

export const AsDivider: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 13,
        color: "#000",
      }}
    >
      <span>soft interfaces</span>
      <BloomOutline size="sm" color="#c3b9b9" />
      <span>the soft computer</span>
    </div>
  ),
};

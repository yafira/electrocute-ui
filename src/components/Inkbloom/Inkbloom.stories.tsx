import type { Meta, StoryObj } from "@storybook/react";
import { Inkbloom } from "./Inkbloom";

const meta: Meta<typeof Inkbloom> = {
  title: "Components/Inkbloom",
  component: Inkbloom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The signature mark: a black blossom against a pastel world. Use sparingly — next to a title or eyebrow, not scattered as decoration.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { size: "md" },
};
export default meta;

type Story = StoryObj<typeof Inkbloom>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Inkbloom size="sm" />
      <Inkbloom size="md" />
      <Inkbloom size="lg" />
    </div>
  ),
};

export const NextToTitle: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Inkbloom size="sm" />
      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 13 }}>Colors</span>
    </div>
  ),
};

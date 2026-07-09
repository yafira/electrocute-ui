import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["purple", "pink", "yellow", "green"] },
    variant: { control: "select", options: ["solid", "outline", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    children: "Button",
    tone: "purple",
    variant: "solid",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} tone="purple">Button</Button>
      <Button {...args} tone="pink">Button</Button>
      <Button {...args} tone="yellow">Button</Button>
      <Button {...args} tone="green">Button</Button>
    </div>
  ),
};

export const ToneByVariantGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 12 }}>
      {(["purple", "pink", "yellow", "green"] as const).flatMap((tone) =>
        (["solid", "outline", "ghost"] as const).map((variant) => (
          <Button key={`${tone}-${variant}`} tone={tone} variant={variant}>
            Button
          </Button>
        ))
      )}
    </div>
  ),
};

export const PrimaryAndSecondaryCTA: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <Button tone="purple" variant="solid" size="lg">Button</Button>
      <Button tone="purple" variant="outline" size="sm">Button</Button>
    </div>
  ),
};

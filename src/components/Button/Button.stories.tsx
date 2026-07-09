import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["lavender-beam", "peony-fizz", "marzipan-cloud", "pistachio-swirl"] },
    variant: { control: "select", options: ["solid", "outline", "pill"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    children: "Button",
    tone: "lavender-beam",
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
      <Button {...args} tone="lavender-beam">Button</Button>
      <Button {...args} tone="peony-fizz">Button</Button>
      <Button {...args} tone="marzipan-cloud">Button</Button>
      <Button {...args} tone="pistachio-swirl">Button</Button>
    </div>
  ),
};

export const ToneByVariantGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 12 }}>
      {(["lavender-beam", "peony-fizz", "marzipan-cloud", "pistachio-swirl"] as const).flatMap((tone) =>
        (["solid", "outline", "pill"] as const).map((variant) => (
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
      <Button tone="lavender-beam" variant="pill" size="lg">Button</Button>
      <Button tone="lavender-beam" variant="outline" size="lg">Button</Button>
    </div>
  ),
};

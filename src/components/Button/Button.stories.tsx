import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    intent: { control: "select", options: ["primary", "neutral", "success", "danger"] },
    variant: { control: "select", options: ["solid", "outline", "pill", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    children: "Button",
    intent: "primary",
    variant: "solid",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllIntents: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} intent="primary">Button</Button>
      <Button {...args} intent="neutral">Button</Button>
      <Button {...args} intent="success">Button</Button>
      <Button {...args} intent="danger">Button</Button>
    </div>
  ),
};

export const IntentByVariantGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 12 }}>
      {(["primary", "neutral", "success", "danger"] as const).flatMap((intent) =>
        (["solid", "outline", "pill", "ghost"] as const).map((variant) => (
          <Button key={`${intent}-${variant}`} intent={intent} variant={variant}>
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
      <Button intent="primary" variant="pill" size="lg">Button</Button>
      <Button intent="primary" variant="outline" size="lg">Button</Button>
    </div>
  ),
};

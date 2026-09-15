import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    intent: { control: "select", options: ["neutral", "success", "warning", "danger", "info"] },
  },
  args: { intent: "neutral", children: "Badge" },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["neutral", "success", "warning", "danger", "info"] as const).map((intent) => (
        <Badge key={intent} intent={intent}>
          Badge
        </Badge>
      ))}
    </div>
  ),
};

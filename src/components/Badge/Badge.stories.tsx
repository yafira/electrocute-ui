import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["purple", "pink", "yellow", "green", "gray"] },
  },
  args: { tone: "purple", children: "Badge" },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["purple", "pink", "yellow", "green", "gray"] as const).map((tone) => (
        <Badge key={tone} tone={tone}>
          Badge
        </Badge>
      ))}
    </div>
  ),
};

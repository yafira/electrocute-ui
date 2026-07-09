import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["purple", "pink", "yellow", "green"] },
  },
  args: { initials: "YM", size: "md", tone: "purple" },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar initials="YM" size="sm" />
      <Avatar initials="YM" size="md" />
      <Avatar initials="YM" size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {(["purple", "pink", "yellow", "green"] as const).map((tone) => (
        <Avatar key={tone} initials="YM" tone={tone} />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/100?img=47",
    alt: "Example user",
  },
};

export const BrokenImageFallback: Story = {
  args: {
    src: "https://broken-url-that-does-not-exist.example/avatar.png",
    initials: "YM",
  },
};

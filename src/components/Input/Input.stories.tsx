import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const WithHint: Story = {
  args: { hint: "We'll never share this with anyone." },
};

export const WithError: Story = {
  args: { error: "Please enter a valid email address.", defaultValue: "not-an-email" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "locked@example.com" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 280 }}>
      <Input label="Default" placeholder="you@example.com" />
      <Input label="With hint" placeholder="you@example.com" hint="We'll never share this." />
      <Input label="Error" defaultValue="not-an-email" error="Please enter a valid email address." />
      <Input label="Disabled" defaultValue="locked@example.com" disabled />
    </div>
  ),
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { checked: false, showIcons: true },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
};

export const WithoutIcons: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onChange={setChecked} showIcons={false} />;
  },
};

export const BothStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <Toggle checked={false} onChange={() => {}} />
      <Toggle checked={true} onChange={() => {}} />
    </div>
  ),
};

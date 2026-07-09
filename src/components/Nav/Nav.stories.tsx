import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Nav, NavItem } from "./Nav";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2 0 3.5 1.2 6 4 2.5-2.8 4-4 6-4 4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z" />
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
  </svg>
);

const sampleItems: NavItem[] = [
  { id: "home", icon: <HomeIcon />, label: "Home" },
  { id: "profile", icon: <UserIcon />, label: "Profile" },
  { id: "favorites", icon: <HeartIcon />, label: "Favorites" },
  { id: "settings", icon: <GearIcon />, label: "Settings" },
];

const meta: Meta<typeof Nav> = {
  title: "Components/Nav",
  component: Nav,
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "select", options: ["light", "outline", "dark"] },
  },
  args: { items: sampleItems, activeId: "home", theme: "light" },
};
export default meta;

type Story = StoryObj<typeof Nav>;

export const Playground: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.activeId ?? "home");
    return <Nav {...args} activeId={active} onSelect={setActive} />;
  },
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
      <Nav items={sampleItems} activeId="home" theme="light" />
      <Nav items={sampleItems} activeId="home" theme="outline" />
      <Nav items={sampleItems} activeId="home" theme="dark" />
    </div>
  ),
};

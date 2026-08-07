import type { Preview } from "@storybook/react";
import "../src/theme/theme.css";

const BG_BY_THEME: Record<string, string> = {
  light: "#F0EFEC",
  dark: "#16151c",
  accessible: "#ffffff",
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "paper",
      values: [
        { name: "paper", value: "#F0EFEC" },
        { name: "white", value: "#FFFFFF" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    ecuTheme: {
      name: "Theme",
      description: "electrocute-ui color theme",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "accessible", title: "Reader" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.ecuTheme ?? "light";
      return (
        <div
          data-ecu-theme={theme}
          style={{
            background: BG_BY_THEME[theme],
            minHeight: "100vh",
            padding: 24,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
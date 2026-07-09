/**
 * Border radius tokens from the Electrocute Design System v0.1 Figma file.
 * Each value is tied to a specific use case, not just a generic scale.
 */
export const radius = {
  /** Secondary buttons */
  sm: "10px",
  /** Article images and input fields */
  md: "14px",
  /** Cards */
  lg: "20px",
  /** Primary buttons */
  xl: "30px",
} as const;

export type RadiusToken = keyof typeof radius;

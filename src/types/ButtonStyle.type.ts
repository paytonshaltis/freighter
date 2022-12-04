type ButtonStyle = {
  // Button size and positioning.
  width?: string;
  height?: string;
  position?: "top" | "center" | "bottom";

  // Button borders.
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;

  // Button radii.
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomLeftRadius?: string;

  // Button colors.
  backgroundColor?: string;
  color?: string;

  // Misc. styles.
  cursor?: string;
  transition?: string;
};

export default ButtonStyle;

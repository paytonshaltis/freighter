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

export function equalButtonStyles(
  buttonStyle1: ButtonStyle,
  buttonStyle2: ButtonStyle
): boolean {
  return (
    buttonStyle1.width === buttonStyle2.width &&
    buttonStyle1.height === buttonStyle2.height &&
    buttonStyle1.position === buttonStyle2.position &&
    buttonStyle1.border === buttonStyle2.border &&
    buttonStyle1.borderTop === buttonStyle2.borderTop &&
    buttonStyle1.borderRight === buttonStyle2.borderRight &&
    buttonStyle1.borderBottom === buttonStyle2.borderBottom &&
    buttonStyle1.borderLeft === buttonStyle2.borderLeft &&
    buttonStyle1.borderRadius === buttonStyle2.borderRadius &&
    buttonStyle1.borderTopLeftRadius === buttonStyle2.borderTopLeftRadius &&
    buttonStyle1.borderTopRightRadius === buttonStyle2.borderTopRightRadius &&
    buttonStyle1.borderBottomRightRadius ===
      buttonStyle2.borderBottomRightRadius &&
    buttonStyle1.borderBottomLeftRadius ===
      buttonStyle2.borderBottomLeftRadius &&
    buttonStyle1.backgroundColor === buttonStyle2.backgroundColor &&
    buttonStyle1.color === buttonStyle2.color &&
    buttonStyle1.cursor === buttonStyle2.cursor &&
    buttonStyle1.transition === buttonStyle2.transition
  );
}

export default ButtonStyle;

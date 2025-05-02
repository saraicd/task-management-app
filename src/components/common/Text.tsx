import React from "react";

interface TextProps {
  children: React.ReactNode;
  fontWeight?: string;
  fontSize?: string;
  color?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  fontWeight = "700",
  fontSize = "14px",
  color = "white",
}) => {
  return (
    <span
      className="font-inter leading-[22px] tracking-normal"
      style={{ fontWeight, fontSize, color }}
    >
      {children}
    </span>
  );
};

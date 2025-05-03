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
}) => {
  return (
    <span
      className="font-inter text-primary  "
      style={{ fontWeight, fontSize }}
    >
      {children}
    </span>
  );
};

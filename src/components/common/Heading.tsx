import { JSX } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
};

export function Heading({ level = 1, children }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseStyles = "font-bold text-primary ";

  const sizeStyles = {
    1: "text-4xl md:text-5xl font-bold leading-[32px] tracking-[0%] font-inter",
    2: "text-xl md:text-2xl font-bold leading-[100%] tracking-[0%] font-inter",
    3: "text-base md:text-lg font-bold leading-[100%] tracking-[0%] font-inter",
  };

  return <Tag className={`${baseStyles} ${sizeStyles[level]}`}>{children}</Tag>;
}

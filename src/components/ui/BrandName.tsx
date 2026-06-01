import type { ReactNode } from "react";

export const BRAND_MAK_COLOR = "#2563eb";
export const BRAND_CLEAN_COLOR = "#16a34a";

const BRAND_REGEX = /Mak\s*[Cc]lean/g;

export function titleContainsBrand(text: string) {
  return BRAND_REGEX.test(text);
}

const ON_DARK = {
  mak: "#60a5fa",
  clean: "#4ade80",
} as const;

type BrandNameProps = {
  variant?: "default" | "onDark";
  className?: string;
  style?: React.CSSProperties;
};

export default function BrandName({
  variant = "default",
  className,
  style,
}: BrandNameProps) {
  const makColor = variant === "onDark" ? ON_DARK.mak : BRAND_MAK_COLOR;
  const cleanColor = variant === "onDark" ? ON_DARK.clean : BRAND_CLEAN_COLOR;

  return (
    <span className={className} style={style}>
      <span style={{ color: makColor }}>Mak</span>
      <span style={{ color: cleanColor }}>clean</span>
    </span>
  );
}

export function isBrandNameHighlight(highlight: string) {
  return /^mak\s*clean$/i.test(highlight.replace(/\s/g, ""));
}

export function injectBrandName(
  text: string,
  variant: BrandNameProps["variant"] = "default",
): ReactNode {
  if (!titleContainsBrand(text)) return text;

  const parts = text.split(BRAND_REGEX);
  const matches = text.match(BRAND_REGEX) ?? [];
  const nodes: ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part) nodes.push(part);
    if (i < matches.length) {
      nodes.push(<BrandName key={`brand-${i}`} variant={variant} />);
    }
  });

  return nodes;
}

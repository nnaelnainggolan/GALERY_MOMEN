interface HeroTypographyProps {
  lines: string[];
  outlinedLine?: string;
}

export function HeroTypography({ lines, outlinedLine }: HeroTypographyProps) {
  return (
    <h1 className="font-sans font-extrabold leading-[0.88] tracking-tight text-[clamp(2.25rem,8.5vw,8.5rem)]">
      {lines.map((line) => (
        <span
          key={line}
          className={line === outlinedLine ? "outline-text block" : "block"}
        >
          {line}
        </span>
      ))}
    </h1>
  );
}

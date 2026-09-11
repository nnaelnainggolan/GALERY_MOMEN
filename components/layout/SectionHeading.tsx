interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  heading,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95]">
        {heading}
      </h2>
    </div>
  );
}

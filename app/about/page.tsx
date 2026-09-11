import { Section } from "@/components/layout/Section";
import { TranslatedHeading } from "@/components/layout/TranslatedHeading";
import { AboutParagraph } from "@/components/about/AboutParagraph";
import { MemoryTimeline } from "@/components/timeline/MemoryTimeline";
import { Eyebrow } from "@/components/i18n/Eyebrow";

export default function AboutPage() {
  return (
    <>
      <Section className="pb-24 pt-40 md:pt-48">
        <TranslatedHeading section="about" />
        <AboutParagraph />
      </Section>

      <Section className="pb-32">
        <p className="eyebrow mb-6">
          <Eyebrow section="timeline" />
        </p>
        <MemoryTimeline />
      </Section>
    </>
  );
}

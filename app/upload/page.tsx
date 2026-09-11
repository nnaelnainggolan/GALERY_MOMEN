import { Section } from "@/components/layout/Section";
import { UploadModal } from "@/components/upload/UploadModal";

export default function UploadPage() {
  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <UploadModal />
    </Section>
  );
}

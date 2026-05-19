import FaqContent from "./FaqContent";
import { getFaqStructuredData } from "@/lib/faq-schema";

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqStructuredData()),
        }}
      />
      <FaqContent />
    </>
  );
}

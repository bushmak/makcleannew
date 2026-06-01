import FaqContent from "./FaqContent";
import { getFaqStructuredData } from "@/lib/faq-schema";

export default function FaqPage() {
  return (
    <>
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: getFaqStructuredData(),
          }),
        }}
      />

      {/* H1 SEO local */}
      <h1 className="sr-only">
        FAQ Makclean — Questions fréquentes sur nos services de nettoyage à Tournai et dans le Hainaut
      </h1>

      <FaqContent />
    </>
  );
}

import { getFaqFlat } from "@/app/faq/faq-data";

export function getFaqStructuredData() {
  return getFaqFlat().map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));
}

import { getFaqFlat } from "@/app/faq/faq-data";

const SITE = "https://www.makclean.be";
const FAQ_URL = `${SITE}/faq`;

export function getFaqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${FAQ_URL}#webpage`,
        url: FAQ_URL,
        name: "FAQ — Nettoyage professionnel Tournai & Hainaut",
        description:
          "Questions fréquentes sur les devis, prestations, délais et zone d'intervention de Makclean.",
        inLanguage: "fr-BE",
        breadcrumb: { "@id": `${FAQ_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${FAQ_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: "FAQ", item: FAQ_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${FAQ_URL}#faq`,
        url: FAQ_URL,
        mainEntity: getFaqFlat().map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}

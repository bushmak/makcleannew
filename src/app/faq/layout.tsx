import type { Metadata } from "next";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

export const metadata: Metadata = {
  title: `FAQ — Questions fréquentes sur nos services de nettoyage à ${INTERVENTION_BASE_CITY} | Makclean`,
  description: `Toutes les réponses à vos questions sur nos services de nettoyage à ${INTERVENTION_BASE_CITY}, Frasnes, Ath, Celles, Renaix et dans toute la ${INTERVENTION_AREA_LABEL}. Devis gratuit sous 24 h.`,
  alternates: {
    canonical: "https://www.makclean.be/faq",
  },
  openGraph: {
    title: `FAQ — Makclean`,
    description: `Questions fréquentes sur nos services de nettoyage à ${INTERVENTION_BASE_CITY} et dans la ${INTERVENTION_AREA_LABEL}.`,
    url: "https://www.makclean.be/faq",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.webp",
        width: 1200,
        height: 630,
        alt: "Makclean — FAQ sur le nettoyage professionnel à Tournai et dans le Hainaut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `FAQ — Makclean`,
    description: `Toutes les réponses sur nos prestations et notre zone d'intervention (${INTERVENTION_AREA_LABEL}).`,
    images: ["/1200x630.webp"],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}

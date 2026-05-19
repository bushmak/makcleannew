import type { Metadata } from "next";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

export const metadata: Metadata = {
  title: "FAQ — Nettoyage professionnel Tournai & Hainaut",
  description: `Plus de 25 réponses : devis gratuit, bureaux, vitres, fin de chantier, bail, zones depuis ${INTERVENTION_BASE_CITY} et dans la ${INTERVENTION_AREA_LABEL}.`,
  keywords: [
    "FAQ nettoyage Tournai",
    "devis nettoyage Hainaut",
    "fin de bail nettoyage",
    "nettoyage bureaux questions",
    "Makclean",
  ],
  alternates: {
    canonical: "https://www.makclean.be/faq",
  },
  openGraph: {
    title: "FAQ | Makclean — Tournai & Hainaut",
    description: "Devis, prestations, délais et zone d'intervention — réponses détaillées avec liens vers nos services.",
    url: "https://www.makclean.be/faq",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.png",
        width: 1200,
        height: 630,
        alt: "Makclean — FAQ nettoyage professionnel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ Makclean — Nettoyage pro",
    description: `Questions sur nos prestations et la ${INTERVENTION_AREA_LABEL}.`,
    images: ["/1200x630.png"],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}

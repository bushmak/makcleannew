import type { Metadata } from "next";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

export const metadata: Metadata = {
  title: `Nos réalisations de nettoyage à ${INTERVENTION_BASE_CITY} et dans la ${INTERVENTION_AREA_LABEL} | Makclean`,
  description: `Découvrez les réalisations Makclean : interventions de nettoyage professionnel à ${INTERVENTION_BASE_CITY}, Frasnes, Ath, Celles, Renaix et dans toute la ${INTERVENTION_AREA_LABEL}. Avant / après, résultats garantis.`,
  alternates: {
    canonical: "https://www.makclean.be/realisations",
  },
  openGraph: {
    title: `Réalisations — Makclean`,
    description: `Avant / après : interventions réelles de nettoyage professionnel à ${INTERVENTION_BASE_CITY} et dans la ${INTERVENTION_AREA_LABEL}.`,
    url: "https://www.makclean.be/realisations",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.webp",
        width: 1200,
        height: 630,
        alt: "Makclean — Réalisations de nos services de nettoyage professionnel à Tournai et dans le Hainaut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Réalisations — Makclean`,
    description: `Avant / après de nos interventions de nettoyage professionnel dans la ${INTERVENTION_AREA_LABEL}.`,
    images: ["/1200x630.webp"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

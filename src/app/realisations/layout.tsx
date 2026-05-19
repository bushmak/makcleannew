import type { Metadata } from "next";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

export const metadata: Metadata = {
  title: "Nos réalisations — Avant / après nettoyage Tournai & Hainaut",
  description: `Photos avant/après de chantiers Makclean : vitres, fin de bail, panneaux solaires, extérieurs et remises en état dans la ${INTERVENTION_AREA_LABEL}, depuis ${INTERVENTION_BASE_CITY}.`,
  keywords: [
    "réalisations nettoyage",
    "avant après nettoyage",
    "nettoyage Tournai photos",
    "fin de bail Tournai",
    "nettoyage vitres Hainaut",
    "Makclean",
  ],
  alternates: {
    canonical: "https://www.makclean.be/realisations",
  },
  openGraph: {
    title: "Réalisations | Makclean — Tournai & Hainaut",
    description: `Galerie de chantiers réels : nettoyage professionnel dans la ${INTERVENTION_AREA_LABEL}.`,
    url: "https://www.makclean.be/realisations",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.png",
        width: 1200,
        height: 630,
        alt: "Makclean — Réalisations nettoyage professionnel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Réalisations Makclean — Avant / après",
    description: `Chantiers de nettoyage dans la ${INTERVENTION_AREA_LABEL}.`,
    images: ["/1200x630.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

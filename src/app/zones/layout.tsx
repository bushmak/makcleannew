import type { Metadata } from "next";
import {
  INTERVENTION_AREA_LABEL,
  INTERVENTION_BASE_CITY,
  INTERVENTION_ZONES_META_DESCRIPTION,
} from "@/lib/intervention-area";
import { getZonesStructuredData } from "@/lib/zones-schema";

export const metadata: Metadata = {
  title: "Zones d'intervention — Nettoyage Tournai & Hainaut",
  description: INTERVENTION_ZONES_META_DESCRIPTION,
  keywords: [
    "nettoyage Tournai",
    "entreprise nettoyage Hainaut",
    "nettoyage professionnel Tournai",
    "société nettoyage Ath",
    "nettoyage Mouscron",
    "nettoyage Lessines",
    "nettoyage Montroeul-au-Bois",
    "zones intervention nettoyage",
    "Makclean",
  ],
  alternates: {
    canonical: "https://www.makclean.be/zones",
  },
  openGraph: {
    title: "Zones d'intervention — Nettoyage Tournai & Hainaut | Makclean",
    description: `Carte et communes desservies depuis ${INTERVENTION_BASE_CITY} : nettoyage pro dans la ${INTERVENTION_AREA_LABEL}. Devis gratuit.`,
    url: "https://www.makclean.be/zones",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.png",
        width: 1200,
        height: 630,
        alt: "Makclean — Zones d'intervention Tournai et Hainaut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zones d'intervention | Makclean — Tournai & Hainaut",
    description: INTERVENTION_ZONES_META_DESCRIPTION,
    images: ["/1200x630.png"],
  },
};

export default function ZonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getZonesStructuredData()),
        }}
      />
      {children}
    </>
  );
}

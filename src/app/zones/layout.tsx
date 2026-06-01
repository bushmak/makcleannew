import type { Metadata } from "next";
import {
  INTERVENTION_AREA_LABEL,
  INTERVENTION_BASE_CITY,
  INTERVENTION_ZONES_META_DESCRIPTION,
} from "@/lib/intervention-area";
import { getZonesStructuredData } from "@/lib/zones-schema";

export const metadata: Metadata = {
  title: `Makclean — Zones d’intervention | Nettoyage professionnel à ${INTERVENTION_BASE_CITY} & dans la ${INTERVENTION_AREA_LABEL}`,
  description: `${INTERVENTION_ZONES_META_DESCRIPTION} — Makclean, entreprise de nettoyage professionnel à ${INTERVENTION_BASE_CITY}.`,
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
    title: `Makclean — Zones d’intervention | Nettoyage professionnel à ${INTERVENTION_BASE_CITY} & dans la ${INTERVENTION_AREA_LABEL}`,
    description: `Carte et communes desservies depuis ${INTERVENTION_BASE_CITY} : nettoyage professionnel dans la ${INTERVENTION_AREA_LABEL}. Devis gratuit.`,
    url: "https://www.makclean.be/zones",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.webp",
        width: 1200,
        height: 630,
        alt: "Makclean — zones d’intervention pour le nettoyage professionnel à Tournai et dans le Hainaut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Makclean — Zones d’intervention | Nettoyage professionnel`,
    description: `${INTERVENTION_ZONES_META_DESCRIPTION}`,
    images: ["/1200x630.webp"],
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

import type { Metadata } from "next";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

export const metadata: Metadata = {
  title: "Nos prestations de nettoyage",
  description: `Bureaux, vitres, fin de chantier, immeubles et particuliers dans la ${INTERVENTION_AREA_LABEL}. Basés à ${INTERVENTION_BASE_CITY}, devis gratuit sous 24 h.`,
  alternates: {
    canonical: "https://www.makclean.be/services",
  },
  openGraph: {
    title: "Services de nettoyage | Makclean",
    description: "Catalogue des prestations : cliquez sur un service pour la fiche détaillée et un devis.",
    url: "https://www.makclean.be/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

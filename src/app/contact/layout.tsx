import type { Metadata } from "next";
import { INTERVENTION_SHORT } from "@/lib/intervention-area";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contactez Makclean — Nettoyage professionnel à Tournai et dans le Hainaut",
  description: `Contactez Makclean pour un devis gratuit sous 24 h. ${INTERVENTION_SHORT}`,
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

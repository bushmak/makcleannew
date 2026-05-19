import type { Metadata } from "next";
import { INTERVENTION_SHORT } from "@/lib/intervention-area";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contactez MakClean — Devis gratuit sous 24h",
  description: `Demandez votre devis gratuit sous 24 h. ${INTERVENTION_SHORT}`,
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente MakClean — tarifs, paiement, droit de rétractation, responsabilité et médiation. Conforme au droit belge.",
  path: "/cgv",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
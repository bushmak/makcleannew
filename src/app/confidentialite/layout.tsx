import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de MakClean conforme au RGPD — collecte, traitement et protection de vos données personnelles.",
  path: "/confidentialite",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
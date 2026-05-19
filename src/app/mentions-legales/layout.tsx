import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Mentions Légales",
  description: "Mentions légales de MakClean — informations sur l'entreprise, hébergement, propriété intellectuelle et protection des données.",
  path: "/mentions-legales",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
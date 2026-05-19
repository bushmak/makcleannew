import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description: "Votre demande de devis a bien été envoyée à Makclean.",
  robots: { index: false, follow: true },
};

export default function MerciDevisLayout({ children }: { children: React.ReactNode }) {
  return children;
}

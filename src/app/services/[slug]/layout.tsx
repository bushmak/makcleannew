import type { Metadata } from "next";
import { SERVICES_DETAIL } from "@/lib/data";
import { INTERVENTION_AREA_LABEL } from "@/lib/intervention-area";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service de nettoyage professionnel — Makclean",
      description: `Makclean propose des services de nettoyage professionnel dans toute la ${INTERVENTION_AREA_LABEL}.`,
      alternates: {
        canonical: `https://www.makclean.be/services/${slug}`,
      },
    };
  }

  return {
    title: `${service.title} à Tournai — Makclean | Nettoyage professionnel dans le Hainaut`,
    description: `${service.accroche} Intervention à Tournai, Frasnes-lez-Anvaing, Ath, Celles, Renaix et dans tout le Hainaut.`,
    alternates: {
      canonical: `https://www.makclean.be/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} — Makclean`,
      description: service.accroche,
      url: `https://www.makclean.be/services/${slug}`,
      type: "website",
      images: [
        {
          url: service.imageSrc,
          width: 1200,
          height: 630,
          alt: `Makclean — ${service.title} à Tournai et dans le Hainaut`,
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

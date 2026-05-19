import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SERVICES_DETAIL } from "@/lib/data";
import { INTERVENTION_AREA_LABEL } from "@/lib/intervention-area";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);

  if (!service) {
    return buildMetadata({
      title: "Service de Nettoyage",
      description: `Service de nettoyage professionnel MakClean dans la ${INTERVENTION_AREA_LABEL}.`,
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: `${service.accroche} Devis gratuit sous 24 h.`,
    path: `/services/${slug}`,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import { SERVICES_DETAIL } from "@/lib/data";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DETAIL.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      {/* H1 SEO invisible */}
      <h1 className="sr-only">
        {service.title} à Tournai et dans le Hainaut — Makclean
      </h1>

      {/* Texte SEO invisible */}
      <p className="sr-only">
        Makclean propose le service {service.title} à Tournai, {INTERVENTION_BASE_CITY}, Ath, Celles, Renaix et dans toute la {INTERVENTION_AREA_LABEL}. Nettoyage professionnel pour particuliers et entreprises.
      </p>

      <ServiceDetailClient service={service} />
    </>
  );
}

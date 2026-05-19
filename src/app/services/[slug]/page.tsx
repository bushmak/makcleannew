import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
import { SERVICES_DETAIL } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Makclean`,
    description: service.accroche,
  };
}

export async function generateStaticParams() {
  return SERVICES_DETAIL.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}

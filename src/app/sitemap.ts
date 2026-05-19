import { MetadataRoute } from "next";
import { SERVICES_DETAIL } from "@/lib/data";

// Nécessaire pour `output: "export"` : sitemap généré en statique
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://www.makclean.be";

  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/realisations`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/zones`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/faq`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/mentions-legales`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/confidentialite`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/cgv`, priority: 0.3, changeFrequency: "yearly" },
  ] as MetadataRoute.Sitemap;

  const servicePages = SERVICES_DETAIL.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages];
}
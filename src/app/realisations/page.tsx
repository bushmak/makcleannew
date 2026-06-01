import RealisationsClient from "./RealisationsClient";
import { getRealisations } from "@/lib/realisations";
import { getRealisationsStructuredData } from "@/lib/realisations-schema";

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const photos = await getRealisations();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getRealisationsStructuredData(photos)),
        }}
      />

      {/* H1 SEO invisible */}
      <h1 className="sr-only">
        Réalisations Makclean — Nettoyage professionnel à Tournai et dans le Hainaut
      </h1>

      <RealisationsClient photos={photos} />
    </>
  );
}

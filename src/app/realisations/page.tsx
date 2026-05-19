import RealisationsClient from "./RealisationsClient";
import { getRealisations } from "@/lib/realisations";
import { getRealisationsStructuredData } from "@/lib/realisations-schema";

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const photos = await getRealisations();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getRealisationsStructuredData(photos)),
        }}
      />
      <RealisationsClient photos={photos} />
    </>
  );
}

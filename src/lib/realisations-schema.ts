import type { Realisation } from "@/lib/realisations";

const SITE = "https://www.makclean.be";
const PAGE_URL = `${SITE}/realisations`;

export function getRealisationsStructuredData(photos: Realisation[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Nos réalisations — Nettoyage professionnel Tournai & Hainaut",
        description:
          "Galerie avant/après : nettoyage de vitres, fin de bail, panneaux solaires, extérieurs et remises en état par Makclean.",
        inLanguage: "fr-BE",
        isPartOf: { "@id": `${SITE}#website` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: "Réalisations", item: PAGE_URL },
        ],
      },
      {
        "@type": "ImageGallery",
        "@id": `${PAGE_URL}#gallery`,
        name: "Réalisations Makclean",
        url: PAGE_URL,
        image: photos.slice(0, 20).map((photo) => ({
          "@type": "ImageObject",
          contentUrl: photo.src.startsWith("http") ? photo.src : `${SITE}${photo.src}`,
          name: photo.title,
          description: [photo.caption, photo.location].filter(Boolean).join(" — "),
        })),
      },
    ],
  };
}

import {
  INTERVENTION_BASE_CITY,
  INTERVENTION_ZONES_META_DESCRIPTION,
  ZONES_COMMUNES,
} from "@/lib/intervention-area";

const SITE = "https://www.makclean.be";
const ZONES_URL = `${SITE}/zones`;

export function getZonesStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ZONES_URL}#webpage`,
        url: ZONES_URL,
        name: "Zones d'intervention — Nettoyage à Tournai et dans le Hainaut",
        description: INTERVENTION_ZONES_META_DESCRIPTION,
        inLanguage: "fr-BE",
        isPartOf: { "@id": `${SITE}#website` },
        about: { "@id": SITE },
        breadcrumb: { "@id": `${ZONES_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${ZONES_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Zones d'intervention",
            item: ZONES_URL,
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        name: "Makclean — Nettoyage professionnel",
        url: ZONES_URL,
        provider: {
          "@type": "LocalBusiness",
          "@id": SITE,
          name: "Makclean",
          url: SITE,
        },
        areaServed: ZONES_COMMUNES.map((name) => ({
          "@type": "City",
          name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Province de Hainaut",
            containedInPlace: { "@type": "Country", name: "Belgique" },
          },
        })),
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 50.6567,
            longitude: 3.6167,
            name: INTERVENTION_BASE_CITY,
          },
          geoRadius: 35000,
        },
      },
    ],
  };
}

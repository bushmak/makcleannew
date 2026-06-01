import type { Metadata } from "next";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Makclean — Nettoyage professionnel à Tournai et dans le Hainaut",
  description: `Entreprise de nettoyage à ${INTERVENTION_BASE_CITY} : devis gratuit sous 24 h. Bureaux, immeubles, vitres et chantiers dans la ${INTERVENTION_AREA_LABEL}.`,
  alternates: {
    canonical: "https://www.makclean.be",
  },
  openGraph: {
    title: "Makclean — Nettoyage professionnel à Tournai et dans le Hainaut",
    description:
      "Marque locale · Devis rapide · Bureaux, immeubles, vitres et chantiers · Équipe certifiée",
    url: "https://www.makclean.be",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.makclean.be/#webpage",
    name: "Makclean — Accueil",
    url: "https://www.makclean.be",
    description:
      "Page d'accueil officielle : présentation des prestations Makclean pour professionnels et particuliers.",
    isPartOf: {
      "@type": "WebSite",
      name: "Makclean",
      url: "https://www.makclean.be",
    },
    about: {
      "@id": "https://www.makclean.be",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Makclean",
    description: "Entreprise de nettoyage professionnel à Tournai et dans le Hainaut",
    url: "https://www.makclean.be",
    telephone: "+32489125099",
    email: "info@makclean.be",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Place de Montroeul(MB) 22/D",
      addressLocality: "Frasnes-lez-Anvaing",
      postalCode: "7911",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.6076,
      longitude: 3.5628,
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-14:00"],
    priceRange: "€€",
    areaServed: "Hainaut, Belgique",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61586183621567",
      "https://www.instagram.com/makclean.officiel",
    ],
  };

  return (
    <main>
      {/* JSON-LD WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      {/* H1 SEO invisible */}
      <h1 className="sr-only">
        Makclean — Nettoyage professionnel à Tournai et dans le Hainaut
      </h1>

      <Navbar />
      <Hero />
      <About />

      <section aria-labelledby="services-title">
        <h2 id="services-title" className="sr-only">
          Nos prestations : nettoyage de bureaux, vitres, fin de chantier, immeubles et plus
        </h2>
        <Services />
      </section>

      <section aria-labelledby="process-title">
        <h2 id="process-title" className="sr-only">Notre méthode de travail</h2>
        <Process />
      </section>

      <section aria-labelledby="testimonials-title">
        <h2 id="testimonials-title" className="sr-only">Avis de nos clients</h2>
        <Testimonials />
      </section>
    </main>
  );
}

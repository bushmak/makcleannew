import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import ScrollToTop from "@/components/ui/ScrollToTop";
import PageTransition from "@/components/ui/PageTransition";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

import Script from "next/script";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY, INTERVENTION_MUNICIPALITY } from "@/lib/intervention-area";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.makclean.be"),
  title: {
    default: "Makclean — Nettoyage professionnel à Tournai et dans le Hainaut",
    template: "%s | Makclean",
  },
  description: `Entreprise de nettoyage basée à ${INTERVENTION_BASE_CITY} : prestations pro pour entreprises, copropriétés et particuliers dans la ${INTERVENTION_AREA_LABEL}.`,
  keywords: [
    "Makclean",
    "nettoyage professionnel Hainaut",
    "entreprise de nettoyage Tournai",
    "société de nettoyage Tournai",
    "nettoyage industriel Hainaut",
    "nettoyage bureaux",
    "nettoyage fin de chantier",
    "nettoyage vitres",
  ],
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.makclean.be",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Makclean — Nettoyage professionnel à Tournai et dans le Hainaut",
    description: `Prestations pour bureaux, chantiers, vitres, immeubles et extérieurs dans la ${INTERVENTION_AREA_LABEL}.`,
    url: "https://www.makclean.be",
    siteName: "Makclean",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/1200x630.webp",
        width: 1200,
        height: 630,
        alt: "Makclean — entreprise de nettoyage professionnel à Tournai et dans le Hainaut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makclean — Nettoyage professionnel à Tournai et dans le Hainaut",
    description: `Makclean · Nettoyage pro · ${INTERVENTION_BASE_CITY} · Tournai · Hainaut`,
    images: ["/1200x630.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.makclean.be",
    name: "MakClean",
    url: "https://www.makclean.be",
    logo: "https://www.makclean.be/logo/logo.webp",
    image: "https://www.makclean.be/1200x630.webp",
    description: `Prestataire de propreté basé à ${INTERVENTION_BASE_CITY} (${INTERVENTION_MUNICIPALITY}) : bureaux, immeubles, chantiers et vitres dans la ${INTERVENTION_AREA_LABEL}.`,
    telephone: "+32489125099",
    email: "info@makclean.be",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Bank Transfer",
    openingHours: "Mo-Sa 08:00-18:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Place de Montroeul(MB) 22/D",
      addressLocality: "Frasnes-lez-Anvaing",
      postalCode: "7911",
      addressRegion: "Hainaut",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.6567,
      longitude: 3.6167,
    },
    areaServed: [
      "Montroeul-au-Bois", "Frasnes-lez-Anvaing", "Tournai", "Ath", "Leuze-en-Hainaut",
      "Lessines", "Enghien", "Mouscron", "Renaix", "Comines-Warneton", "Péruwelz",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de nettoyage",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage de bureaux" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage de vitres" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fin de chantier" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entretien d'immeubles" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage particuliers" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fin de bail" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage de terrasse" } },
      ],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61586183621567",
      "https://www.instagram.com/makclean.officiel?igsh=eGV4N3c3MDE0cmRj",
    ],
  };

  return (
    <html lang="fr" className={jakarta.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />

        {/* CookieConsent (gratuit, RGPD) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
        />

        <Script
          src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
          strategy="afterInteractive"
        />

        {/* Initialisation CookieConsent */}
        <Script
          id="cookieconsent-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("load", function(){
                window.cookieconsent.initialise({
                  palette: {
                    popup: { background: "#1e293b" },
                    button: { background: "#2563eb" }
                  },
                  theme: "classic",
                  position: "bottom",
                  type: "opt-in",
                  content: {
                    message: "Nous utilisons des cookies pour améliorer votre expérience.",
                    dismiss: "Refuser",
                    allow: "Accepter",
                    link: "En savoir plus",
                    href: "/confidentialite"
                  }
                });
              });
            `,
          }}
        />

        {/* GTM chargé uniquement après consentement */}
        <Script
          id="gtm-optin"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("cookieconsent:allow", function() {
                const gtm = document.createElement("script");
                gtm.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PFZCWHVD";
                gtm.async = true;
                document.head.appendChild(gtm);
              });
            `,
          }}
        />

        {/* Google Ads — bloqué tant que GTM n'est pas chargé */}
        <Script
          id="google-ads-optin"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("cookieconsent:allow", function() {
                const ads = document.createElement("script");
                ads.src = "https://www.googletagmanager.com/gtag/js?id=AW-17955915734";
                ads.async = true;
                document.head.appendChild(ads);

                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17955915734');
              });
            `,
          }}
        />
      </head>

      <body className={jakarta.className}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFZCWHVD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ScrollToTop />
        <ScrollToTopButton />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <PageTransition>
          {children}
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}

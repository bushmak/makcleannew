"use client";

import Script from "next/script";

function loadTracking() {
  if ((window as any)._trackingLoaded) return;
  (window as any)._trackingLoaded = true;

  const gtm = document.createElement("script");
  gtm.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PFZCWHVD";
  gtm.async = true;
  document.head.appendChild(gtm);

  const ads = document.createElement("script");
  ads.src = "https://www.googletagmanager.com/gtag/js?id=AW-17955915734";
  ads.async = true;
  document.head.appendChild(ads);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  gtag("js", new Date());
  gtag("config", "AW-17955915734");
}

export default function CookieConsent() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        (window as any).cookieconsent.initialise({
          palette: {
            popup: { background: "#1e293b" },
            button: { background: "#2563eb" },
          },
          theme: "classic",
          position: "bottom",
          type: "opt-in",
          content: {
            message: "Nous utilisons des cookies pour améliorer votre expérience.",
            dismiss: "Refuser",
            allow: "Accepter",
            link: "En savoir plus",
            href: "/confidentialite",
          },
          onStatusChange: function (status: string) {
            if (status === "allow") loadTracking();
          },
          onInitialise: function (status: string) {
            if (status === "allow") loadTracking();
          },
        });
      }}
    />
  );
}
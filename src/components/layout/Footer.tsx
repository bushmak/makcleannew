"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { INTERVENTION_SUMMARY } from "@/lib/intervention-area";
import { Phone, Mail, MapPin } from "lucide-react";
import { SERVICES } from "@/lib/data";
import BrandName from "@/components/ui/BrandName";
import Image from "next/image";

const LINKS_PAGES = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Zones", href: "/zones" },
  { label: "Réalisations", href: "/realisations" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "CGV", href: "/cgv" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook Makclean",
    href: "https://www.facebook.com/profile.php?id=61586183621567",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram Makclean",
    href: "https://www.instagram.com/makclean.officiel?igsh=eGV4N3c3MDE0cmRj",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Pied de page Makclean — informations, services et contact"
      style={{ backgroundColor: "#0a0f1e", color: "#FFFFFF", position: "relative", overflow: "hidden" }}
    >
      {/* SEO invisible */}
      <p className="sr-only">
        Pied de page Makclean : coordonnées, services, liens rapides, zones d’intervention et pages légales.
        Entreprise de nettoyage professionnel basée à Frasnes-lez-Anvaing et active dans tout le Hainaut.
      </p>

      {/* Schema.org SiteNavigationElement */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: LINKS_PAGES.map((l) => l.label),
            url: LINKS_PAGES.map((l) => `https://www.makclean.be${l.href}`),
          }),
        }}
      />

      {/* Ligne animée en haut */}
      <div aria-hidden="true" style={{ position: "relative", height: "3px", overflow: "hidden" }}>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "60%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, #2563eb, #3b82f6, transparent)",
            borderRadius: "999px",
          }}
          animate={{ left: ["-100%", "150%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.25), transparent)",
          }}
        />
      </div>

      {/* Déco fond */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Contenu */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 24px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: "48px" }}
          className="footer-grid"
        >
          {/* Col 1 : Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Link
              href="/"
              style={{ textDecoration: "none", width: "fit-content" }}
              aria-label="Retour à l'accueil Makclean"
            >
              <motion.div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/logo/logo.webp"
                  alt="Logo Makclean — entreprise de nettoyage professionnel à Tournai et dans le Hainaut"
                  width={120}
                  height={40}
                  style={{
                    height: "40px",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                  priority
                />
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                  <span style={{ fontWeight: 800, fontSize: "22px", letterSpacing: "-0.5px" }}>
                    <BrandName variant="onDark" />
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "rgba(148,163,184,0.7)",
                      marginTop: "2px",
                    }}
                  >
                    Nettoyage Pro
                  </span>
                </div>
              </motion.div>
            </Link>

            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.8, maxWidth: "280px" }}>
              {INTERVENTION_SUMMARY}
            </p>

            {/* Badge assuré */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                width: "fit-content",
              }}
              aria-label="Makclean est assuré RC Pro"
            >
              <motion.span
                aria-hidden="true"
                style={{ fontSize: "14px" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🛡️
              </motion.span>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
                RC Pro · Assurance incluse
              </span>
            </div>

            {/* Réseaux sociaux */}
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (nouvelle fenêtre)`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                  whileHover={{
                    backgroundColor: "rgba(59,130,246,0.2)",
                    borderColor: "rgba(59,130,246,0.4)",
                    color: "#bfdbfe",
                    scale: 1.08,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 : Liens rapides */}
          <nav aria-label="Liens rapides">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#2563eb",
                marginBottom: "20px",
              }}
            >
              Liens Rapides
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {LINKS_PAGES.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} style={{ textDecoration: "none" }}>
                    <motion.span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "#94a3b8",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                      whileHover={{ color: "#FFFFFF", x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "#1d4ed8",
                          flexShrink: 0,
                        }}
                      />
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 : Services */}
          <nav aria-label="Nos services de nettoyage">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#2563eb",
                marginBottom: "20px",
              }}
            >
              Nos Services
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {SERVICES.map((service, i) => (
                <li key={i}>
                  <Link
                    href={`/services/${service.slug}`}
                    style={{ textDecoration: "none" }}
                    aria-label={`Voir le service : ${service.title}`}
                  >
                    <motion.span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "#94a3b8",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                      whileHover={{ color: "#FFFFFF", x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "#1d4ed8",
                          flexShrink: 0,
                        }}
                      />
                      {service.title}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 : Contact */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#2563eb",
                marginBottom: "20px",
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <motion.a
                href="tel:+32489125099"
                aria-label="Appeler Makclean au +32 489 125 099"
                style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
                whileHover={{ x: 3 }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(29,78,216,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone aria-hidden="true" style={{ width: "15px", height: "15px", color: "#bfdbfe" }} />
                </div>
                <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: 500 }}>
                  +32 489 125 099
                </span>
              </motion.a>

              <motion.a
                href="mailto:info@makclean.be"
                aria-label="Envoyer un email à Makclean"
                style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
                whileHover={{ x: 3 }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(29,78,216,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail aria-hidden="true" style={{ width: "15px", height: "15px", color: "#bfdbfe" }} />
                </div>
                <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: 500 }}>
                  info@makclean.be
                </span>
              </motion.a>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(29,78,216,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <MapPin aria-hidden="true" style={{ width: "15px", height: "15px", color: "#bfdbfe" }} />
                </div>
                <address
                  style={{
                    fontSize: "14px",
                    color: "#e2e8f0",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    fontStyle: "normal",
                  }}
                >
                  Place de Montroeul(MB) 22/D,
                  <br />
                  7911 Frasnes-lez-Anvaing
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)",
            margin: "48px 0 28px",
          }}
        />

        {/* Bas de footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0 }}>
            © {year} <BrandName variant="onDark" />. Tous droits réservés.
          </p>

          <nav
            aria-label="Liens légaux"
            style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}
          >
            {LEGAL_LINKS.map((link, i) => (
              <Link key={i} href={link.href} style={{ textDecoration: "none" }}>
                <motion.span
                  style={{ fontSize: "12px", color: "#94a3b8", cursor: "pointer" }}
                  whileHover={{ color: "#e2e8f0" }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Lunaris Web */}
          <motion.a
            href="https://lunarisweb.be"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visiter le site du développeur Lunaris Web (nouvelle fenêtre)"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            whileHover={{
              backgroundColor: "rgba(29,78,216,0.12)",
              borderColor: "rgba(59,130,246,0.25)",
            }}
          >
            <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>Développé par</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              LUNARIS WEB
            </span>
          </motion.a>
        </div>
      </div>

      <style jsx global>{`
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

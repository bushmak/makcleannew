"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";

const SECTIONS = [
  {
    number: "01",
    title: "Informations sur l'entreprise",
    content: null,
    infos: [
      { label: "Raison sociale", value: "MakClean" },
      { label: "Siège social", value: "Place de Montroeul(MB) 22/D, 7911 Frasnes-lez-Anvaing, Belgique" },
      { label: "Téléphone", value: "+32 489 125 099" },
      { label: "Email", value: "info@makclean.be" },
      { label: "Activité", value: "Services de nettoyage professionnel" },
    ],
  },
  {
    number: "02",
    title: "Hébergement du site",
    content:
      "Le site web www.makclean.be est hébergé par Hostinger. L'hébergeur assure la disponibilité et la maintenance technique du site.",
    infos: null,
  },
  {
    number: "03",
    title: "Développement du site",
    content: null,
    infos: [
      { label: "Développeur web", value: "Lunaris Web" },
      { label: "Site", value: "lunarisweb.be" },
    ],
    lunaris: true,
  },
  {
    number: "04",
    title: "Propriété intellectuelle",
    content:
      "L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive de MakClean, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite. Les marques, logos et signes distinctifs reproduits sur ce site sont protégés par le droit de la propriété intellectuelle.",
    infos: null,
  },
  {
    number: "05",
    title: "Protection des données personnelles",
    content:
      "MakClean s'engage à protéger la vie privée de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations sur la collecte et le traitement de vos données personnelles, consultez notre Politique de Confidentialité.",
    infos: null,
  },

  // ⭐ SECTION COOKIES — VERSION RGPD COMPLÈTE
  {
    number: "06",
    title: "Cookies",
    content: `
Ce site utilise des cookies afin d’assurer son bon fonctionnement, d’améliorer l’expérience utilisateur et, uniquement après votre consentement, de mesurer l’audience ou d’activer certaines fonctionnalités marketing.

Conformément au RGPD et à la législation belge, aucun cookie non essentiel (Google Analytics, Google Ads, etc.) n’est déposé sans votre accord explicite via le bandeau de consentement.

Types de cookies utilisés :

• Cookies strictement nécessaires (fonctionnement du site)
  - Finalité : assurer la sécurité, l’affichage et la navigation
  - Durée : variable (session ou 6 mois)
  - Émetteur : makclean.be

• Cookies de mesure d’audience (soumis à consentement)
  - Finalité : analyser la fréquentation et les performances du site
  - Durée : 13 mois
  - Émetteur : Google Analytics / Google Tag Manager

• Cookies marketing (soumis à consentement)
  - Finalité : mesurer les conversions et optimiser les campagnes publicitaires
  - Durée : 3 à 13 mois
  - Émetteur : Google Ads

Gestion du consentement :
Vous pouvez accepter ou refuser les cookies non essentiels via le bandeau affiché lors de votre première visite. Vous pouvez également modifier votre choix à tout moment en supprimant les cookies dans les paramètres de votre navigateur.

Pour plus d’informations, consultez notre Politique de Confidentialité.
`,
    infos: null,
  },

  {
    number: "07",
    title: "Responsabilité",
    content:
      "MakClean met tout en œuvre pour fournir des informations exactes et à jour sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. MakClean ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.",
    infos: null,
  },
  {
    number: "08",
    title: "Liens externes",
    content:
      "Ce site peut contenir des liens vers des sites externes. MakClean n'est pas responsable du contenu de ces sites et ne peut être tenu responsable des dommages résultant de leur utilisation.",
    infos: null,
  },
  {
    number: "09",
    title: "Droit applicable",
    content:
      "Les présentes mentions légales sont régies par le droit belge. Tout litige relatif à l'utilisation de ce site sera soumis à la compétence exclusive des tribunaux belges.",
    infos: null,
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <PageHero
          title="Mentions Légales"
          highlight="Légales"
          subtitle="Informations légales relatives au site www.makclean.be"
          breadcrumbs={[{ label: "Mentions légales" }]}
        />

        <section style={{ backgroundColor: "#f8fafc", padding: "80px 0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "36px 40px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                    border: "1px solid #f1f5f9",
                    display: "flex",
                    gap: "24px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#2563eb",
                      flexShrink: 0,
                      paddingTop: "4px",
                      width: "32px",
                    }}
                  >
                    {section.number}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontSize: "17px",
                        fontWeight: 800,
                        color: "#0f172a",
                        marginBottom: "16px",
                      }}
                    >
                      {section.title}
                    </h2>

                    {section.content && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#475569",
                          whiteSpace: "pre-line",
                          lineHeight: 1.85,
                          margin: 0,
                        }}
                      >
                        {section.content}
                      </p>
                    )}

                    {section.infos && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {section.infos.map((info, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              gap: "16px",
                              padding: "12px 16px",
                              borderRadius: "10px",
                              backgroundColor: "#f8fafc",
                              border: "1px solid #f1f5f9",
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#64748b",
                                minWidth: "160px",
                                flexShrink: 0,
                              }}
                            >
                              {info.label}
                            </span>

                            {section.lunaris && info.label === "Site" ? (
                              <a
                                href="https://lunarisweb.be"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                              >
                                <motion.span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                  whileHover={{ gap: "8px" }}
                                >
                                  {info.value}
                                  <ArrowRight
                                    style={{ width: "12px", height: "12px", color: "#2563eb" }}
                                  />
                                </motion.span>
                              </a>
                            ) : (
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: "#334155",
                                  fontWeight: 500,
                                }}
                              >
                                {info.value}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              style={{
                marginTop: "20px",
                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                borderRadius: "20px",
                padding: "40px",
                color: "#FFFFFF",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "24px" }}>
                09. Contact
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#bfdbfe",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  {
                    icon: <Mail style={{ width: "15px", height: "15px" }} />,
                    text: "info@makclean.be",
                    href: "mailto:info@makclean.be",
                  },
                  {
                    icon: <Phone style={{ width: "15px", height: "15px" }} />,
                    text: "+32 489 125 099",
                    href: "tel:+32489125099",
                  },
                  {
                    icon: <MapPin style={{ width: "15px", height: "15px" }} />,
                    text: "Place de Montroeul(MB) 22/D, 7911 Frasnes-lez-Anvaing, Belgique",
                    href: null,
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>

                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontSize: "14px",
                          color: "#bfdbfe",
                          fontWeight: 500,
                          textDecoration: "none",
                          paddingTop: "6px",
                        }}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#bfdbfe",
                          fontWeight: 500,
                          paddingTop: "6px",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#64748b",
                marginTop: "32px",
                fontStyle: "italic",
              }}
            >
              Dernière mise à jour : Février 2025
            </p>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

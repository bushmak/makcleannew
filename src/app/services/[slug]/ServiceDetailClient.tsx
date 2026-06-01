"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/ui/PageWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ServiceDetail } from "@/types";
import { SERVICES } from "@/lib/data";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";
import { getServiceDisplayTitle } from "@/lib/service-utils";

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const displayTitle = getServiceDisplayTitle(service.title);
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const complementaryServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 2);
  const ctaHeading = service.ctaTitle ?? "Prêt à profiter d'un espace impeccable ?";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.accroche,
    image: service.imageSrc,
    url: `https://www.makclean.be/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Makclean",
      url: "https://www.makclean.be",
      telephone: "+32489125099",
      email: "info@makclean.be",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Place de Montroeul(MB) 22/D",
        addressLocality: "Frasnes-lez-Anvaing",
        postalCode: "7911",
        addressRegion: "Hainaut",
        addressCountry: "BE",
      },
      sameAs: [
        "https://www.facebook.com/makclean",
        "https://www.instagram.com/makclean",
      ],
    },
    areaServed: INTERVENTION_AREA_LABEL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations de ${service.title}`,
      itemListElement: service.prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: p,
        },
      })),
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />
      <PageWrapper>

        {/* ─────────────────────────────── */}
        {/* HERO */}
        {/* ─────────────────────────────── */}
        <section
          style={{
            position: "relative",
            backgroundColor: "#0f172a",
            padding: "80px 0 0",
            overflow: "hidden",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src={service.imageSrc}
              alt={`Makclean — ${service.title} à Tournai et dans le Hainaut`}
              fill
              style={{ objectFit: "cover", opacity: 0.25 }}
              priority
            />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0f172a 30%, rgba(15,23,42,0.7) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px 60px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Breadcrumbs */}
            <motion.nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href="/" style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}>
                Accueil
              </Link>
              <span style={{ color: "#475569", fontSize: "13px" }}>›</span>
              <Link href="/services" style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}>
                Services
              </Link>
              <span style={{ color: "#475569", fontSize: "13px" }}>›</span>
              <span style={{ color: "#60a5fa", fontSize: "13px", fontWeight: 600 }}>
                {displayTitle}
              </span>
            </motion.nav>

            {/* Title */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                }}
              >
                {service.icon}
              </div>

              <h2
                style={{
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  margin: 0,
                }}
              >
                {displayTitle}
              </h2>
            </motion.div>

            {/* Badges */}
            <motion.div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#93c5fd",
                }}
              >
                Tournai · Hainaut
              </span>

              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#93c5fd",
                }}
              >
                {INTERVENTION_BASE_CITY}
              </span>
            </motion.div>

            {/* Accroche */}
            <motion.p
              style={{
                fontSize: "clamp(15px, 2vw, 19px)",
                color: "#94a3b8",
                maxWidth: "600px",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {service.accroche}  
              <br />
              <Link href="/contact" style={{ color: "#60a5fa", fontWeight: 600 }}>
                Contactez-nous
              </Link>{" "}
              pour un devis gratuit.
            </motion.p>

            {/* CTA */}
            <motion.div
              style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <motion.div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    backgroundColor: "#1d4ed8",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "15px",
                    boxShadow: "0 8px 24px rgba(29,78,216,0.4)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Discuter de mon projet
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </motion.div>
              </Link>

              <motion.a
                href="tel:+32489125099"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.18)", scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone style={{ width: "16px", height: "16px" }} />
                Appeler Makclean
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────── */}
        {/* CONTENU PRINCIPAL */}
        {/* ─────────────────────────────── */}
        <section style={{ backgroundColor: "#f8fafc", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 380px",
                gap: "48px",
                alignItems: "start",
              }}
              className="service-detail-grid"
            >
              {/* ─────────────────────────────── */}
              {/* COLONNE GAUCHE */}
              {/* ─────────────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

                {/* À propos */}
                <ScrollReveal direction="up">
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "24px",
                      padding: "40px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "#0f172a",
                        marginBottom: "20px",
                      }}
                    >
                      À propos de ce service
                    </h3>

                    {service.description.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontSize: "15px",
                          color: "#475569",
                          lineHeight: 1.85,
                          marginBottom:
                            i < service.description.length - 1 ? "16px" : 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}

                    {/* Lien interne SEO */}
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#2563eb",
                        marginTop: "12px",
                        fontWeight: 600,
                      }}
                    >
                      <Link href="/zones">Voir nos zones d’intervention</Link>
                    </p>
                  </div>
                </ScrollReveal>

                {/* Ce que nous nettoyons */}
                <ScrollReveal direction="up" delay={0.1}>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "24px",
                      padding: "40px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "#0f172a",
                        marginBottom: "24px",
                      }}
                    >
                      Ce que nous nettoyons
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px",
                      }}
                      className="prestations-grid"
                    >
                      {service.prestations.map((item, i) => (
                        <motion.div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "14px 16px",
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #f1f5f9",
                            fontSize: "14px",
                            color: "#334155",
                            fontWeight: 500,
                          }}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{
                            backgroundColor: "#eff6ff",
                            borderColor: "#bfdbfe",
                          }}
                        >
                          <CheckCircle2
                            style={{
                              width: "16px",
                              height: "16px",
                              color: "#2563eb",
                              flexShrink: 0,
                            }}
                          />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Avantages */}
                <ScrollReveal direction="up" delay={0.2}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
                      borderRadius: "24px",
                      padding: "40px",
                      boxShadow: "0 12px 40px rgba(29,78,216,0.25)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        marginBottom: "24px",
                      }}
                    >
                      Nos avantages
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {service.avantages.map((item, i) => (
                        <motion.div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            fontSize: "15px",
                            color: "#bfdbfe",
                            fontWeight: 500,
                          }}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(255,255,255,0.15)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <CheckCircle2
                              style={{
                                width: "14px",
                                height: "14px",
                                color: "#FFFFFF",
                              }}
                            />
                          </div>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Processus */}
                {service.processus && (
                  <ScrollReveal direction="up" delay={0.3}>
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "24px",
                        padding: "40px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                        border: "1px solid #f1f5f9",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 800,
                          color: "#0f172a",
                          marginBottom: "32px",
                        }}
                      >
                        Notre processus d'intervention
                      </h3>
                                            <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0px",
                        }}
                      >
                        {service.processus.map((step, i) => (
                          <motion.div
                            key={i}
                            style={{
                              display: "flex",
                              gap: "20px",
                              paddingBottom:
                                i < service.processus!.length - 1 ? "28px" : "0",
                              position: "relative",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {i < service.processus!.length - 1 && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: "19px",
                                  top: "44px",
                                  width: "2px",
                                  height: "calc(100% - 16px)",
                                  background:
                                    "linear-gradient(to bottom, #2563eb, #bfdbfe)",
                                }}
                              />
                            )}

                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFFFFF",
                                fontSize: "13px",
                                fontWeight: 800,
                                flexShrink: 0,
                                zIndex: 1,
                                boxShadow:
                                  "0 4px 12px rgba(29,78,216,0.3)",
                              }}
                            >
                              {step.number}
                            </div>

                            <div style={{ paddingTop: "8px" }}>
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 700,
                                  color: "#0f172a",
                                  marginBottom: "4px",
                                }}
                              >
                                {step.title}
                              </div>
                              <div
                                style={{
                                  fontSize: "14px",
                                  color: "#64748b",
                                  lineHeight: 1.6,
                                }}
                              >
                                {step.description}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {service.frequence && (
                        <motion.div
                          style={{
                            marginTop: "28px",
                            padding: "16px 20px",
                            borderRadius: "14px",
                            backgroundColor: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#1d4ed8",
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          🔄 Fréquence : {service.frequence}
                        </motion.div>
                      )}
                    </div>
                  </ScrollReveal>
                )}
              </div>

              {/* ─────────────────────────────── */}
              {/* COLONNE DROITE STICKY */}
              {/* ─────────────────────────────── */}
              <div
                style={{
                  position: "sticky",
                  top: "100px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Devis */}
                <ScrollReveal direction="right">
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "24px",
                      padding: "32px",
                      boxShadow: "0 8px 40px rgba(29,78,216,0.12)",
                      border: "2px solid #eff6ff",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                      💬
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#0f172a",
                        marginBottom: "8px",
                      }}
                    >
                      Devis gratuit & rapide
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        lineHeight: 1.6,
                        marginBottom: "24px",
                      }}
                    >
                      Réponse sous 24h · Sans engagement · Tarif transparent
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Link href="/contact" style={{ textDecoration: "none" }}>
                        <motion.div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "14px",
                            borderRadius: "14px",
                            backgroundColor: "#1d4ed8",
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "15px",
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "#1e40af",
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Discuter de mon projet
                          <ArrowRight
                            style={{ width: "16px", height: "16px" }}
                          />
                        </motion.div>
                      </Link>

                      <motion.a
                        href="tel:+32489125099"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "14px",
                          borderRadius: "14px",
                          backgroundColor: "#f8fafc",
                          color: "#334155",
                          fontWeight: 700,
                          fontSize: "15px",
                          textDecoration: "none",
                          border: "1px solid #e2e8f0",
                        }}
                        whileHover={{
                          backgroundColor: "#eff6ff",
                          borderColor: "#bfdbfe",
                        }}
                      >
                        <Phone
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#2563eb",
                          }}
                        />
                        +32 489 125 099
                      </motion.a>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Zone d'intervention */}
                <ScrollReveal direction="right" delay={0.1}>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "20px",
                      padding: "24px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      📍 Zone d'intervention
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#64748b",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      Basés à {INTERVENTION_BASE_CITY}, nous intervenons dans
                      toute la {INTERVENTION_AREA_LABEL}.
                    </p>
                    <Link href="/zones" style={{ textDecoration: "none" }}>
                      <motion.div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "12px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#2563eb",
                        }}
                        whileHover={{ gap: "10px" }}
                      >
                        Voir toutes les zones
                        <ArrowRight
                          style={{ width: "13px", height: "13px" }}
                        />
                      </motion.div>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Pourquoi Makclean */}
                <ScrollReveal direction="right" delay={0.2}>
                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      borderRadius: "20px",
                      padding: "24px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "16px",
                      }}
                    >
                      Pourquoi Makclean ?
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {[
                        { icon: "⭐", text: "5.0 sur Google" },
                        { icon: "✓", text: "98 % de satisfaction" },
                        { icon: "⚡", text: "Réponse sous 24 h" },
                        { icon: "🛡️", text: "Assurance RC Pro" },
                      ].map((item) => (
                        <li
                          key={item.text}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "13px",
                            color: "#475569",
                            fontWeight: 500,
                          }}
                        >
                          <span aria-hidden="true">{item.icon}</span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/realisations"
                      style={{ textDecoration: "none" }}
                    >
                      <motion.div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "16px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#2563eb",
                        }}
                        whileHover={{ gap: "10px" }}
                      >
                        Voir nos réalisations
                        <ArrowRight
                          style={{ width: "13px", height: "13px" }}
                        />
                      </motion.div>
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Autres prestations */}
            {relatedServices.length > 0 && (
              <ScrollReveal direction="up">
                <div style={{ marginTop: "64px" }}>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "24px",
                      textAlign: "center",
                    }}
                  >
                    Découvrez aussi nos autres prestations
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "20px",
                    }}
                    className="related-services-grid"
                  >
                    {relatedServices.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/services/${related.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <motion.div
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "16px",
                            padding: "24px",
                            border: "1px solid #e2e8f0",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                          whileHover={{
                            y: -4,
                            boxShadow:
                              "0 12px 32px rgba(29,78,216,0.1)",
                            borderColor: "#bfdbfe",
                          }}
                        >
                          <span
                            style={{ fontSize: "24px" }}
                            aria-hidden="true"
                          >
                            {related.icon}
                          </span>
                          <h4
                            style={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            {related.title}
                          </h4>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#64748b",
                              lineHeight: 1.6,
                              margin: 0,
                              flex: 1,
                            }}
                          >
                            {related.description}
                          </p>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#2563eb",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            En savoir plus
                            <ArrowRight
                              style={{ width: "14px", height: "14px" }}
                            />
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
            padding: "80px 0",
          }}
        >
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <motion.h3
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {ctaHeading}
            </motion.h3>

            <motion.p
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Devis gratuit sous 24 h — contactez-nous via le formulaire ou par
              téléphone.
            </motion.p>

            <motion.div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <motion.div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "16px 32px",
                    borderRadius: "999px",
                    backgroundColor: "#1d4ed8",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "16px",
                    boxShadow: "0 8px 30px rgba(29,78,216,0.4)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Discuter de mon projet
                  <ArrowRight
                    style={{ width: "18px", height: "18px" }}
                  />
                </motion.div>
              </Link>

              <motion.a
                href="tel:+32489125099"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 32px",
                  borderRadius: "999px",
                  border: "2px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "16px",
                  textDecoration: "none",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  scale: 1.03,
                }}
              >
                <Phone
                  style={{ width: "18px", height: "18px" }}
                />
                Appeler Makclean
              </motion.a>
            </motion.div>
          </div>
        </section>
      </PageWrapper>

      <style jsx global>{`
        .service-detail-grid {
          grid-template-columns: 1fr 380px;
        }
        .prestations-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .related-services-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .service-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .related-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .prestations-grid {
            grid-template-columns: 1fr !important;
          }
          .related-services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

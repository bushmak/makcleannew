"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";
import { SERVICES } from "@/lib/data";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <PageHero
          title="Nos services de nettoyage"
          highlight="nettoyage"
          subtitle={`Des solutions professionnelles pour bureaux, logements, vitres et extérieurs — ${INTERVENTION_BASE_CITY}, ${INTERVENTION_AREA_LABEL}.`}
          breadcrumbs={[{ label: "Services" }]}
        />

        <section style={{ backgroundColor: "#f8fafc", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

            <p style={{
              maxWidth: "720px", margin: "0 auto 48px", textAlign: "center",
              fontSize: "16px", color: "#64748b", lineHeight: 1.75,
            }}>
              Chaque prestation dispose d&apos;une fiche détaillée : prestations incluses, avantages, processus
              et demande de devis gratuit sous 24 h.
            </p>

            {/* Grille services */}
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}
              className="services-page-grid"
            >
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(29,78,216,0.12)" }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(15,23,42,0.4) 0%, transparent 60%)",
                    }} />
                    <div style={{
                      position: "absolute", top: "16px", left: "16px",
                      width: "42px", height: "42px", borderRadius: "12px",
                      backgroundColor: "rgba(255,255,255,0.95)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px",
                    }}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                    <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {service.title}
                    </h2>
                    <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                      {service.description}
                    </p>

                    <div style={{ height: "1px", backgroundColor: "#f1f5f9" }} />

                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                      {service.features.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#475569" }}>
                          <CheckCircle2 style={{ width: "14px", height: "14px", color: "#2563eb", flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      style={{ textDecoration: "none", marginTop: "auto" }}
                    >
                      <motion.div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          backgroundColor: "#eff6ff",
                          color: "#1d4ed8",
                          fontSize: "14px",
                          fontWeight: 700,
                          marginTop: "8px",
                        }}
                        whileHover={{ backgroundColor: "#dbeafe" }}
                      >
                        Découvrir ce service
                        <ArrowRight style={{ width: "16px", height: "16px" }} />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA bas */}
            <motion.div
              style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "16px 36px", borderRadius: "999px",
                  backgroundColor: "#1d4ed8", color: "#FFFFFF",
                  fontWeight: 700, fontSize: "16px", textDecoration: "none",
                  boxShadow: "0 8px 30px rgba(29,78,216,0.3)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Demander un devis gratuit
                <ArrowRight style={{ width: "18px", height: "18px" }} />
              </motion.a>
            </motion.div>

          </div>
        </section>
      </PageWrapper>

      <style jsx global>{`
        .services-page-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1100px) {
          .services-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

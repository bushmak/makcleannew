"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { SERVICES } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Catalogue de nos prestations de nettoyage"
      style={{
        backgroundColor: "#f8fafc",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2 className="sr-only">Catalogue des prestations Makclean</h2>
      <p className="sr-only">
        Chaque carte mène vers une page dédiée : détail des missions, avantages et demande de devis pour cette prestation.
      </p>

      {/* Schema.org ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Services de nettoyage Makclean",
            description: "Liste des prestations Makclean avec lien vers la fiche détaillée de chaque service.",
            itemListElement: SERVICES.map((service, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: service.title,
              description: service.description,
              url: `https://www.makclean.be/services/${service.slug}`,
            })),
          }),
        }}
      />

      {/* Déco fond */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "350px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <SectionTitle
          badge="Nos Services"
          title="Des solutions pro pour chaque besoin"
          highlight="chaque besoin"
          subtitle="Bureaux, vitres, fin de chantier, immeubles, particuliers, fin de bail, terrasses ou panneaux solaires — une offre complète, un interlocuteur unique, un devis sur mesure."
          align="center"
        />

        {/* Grille cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "24px",
          }}
          className="services-grid"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA bas */}
        <motion.div
          style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="/realisations"
            aria-label="Visualiser les réalisations de nettoyage professionnel de Makclean en région de Tournai et du Hainaut"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "16px 36px", borderRadius: "999px",
              backgroundColor: "#1d4ed8", color: "#FFFFFF",
              fontWeight: 700, fontSize: "16px", textDecoration: "none",
              boxShadow: "0 8px 30px rgba(29,78,216,0.3)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(29,78,216,0.45)" }}
            whileTap={{ scale: 0.97 }}
          >
            Visualiser nos réalisations
            <ArrowRight aria-hidden="true" style={{ width: "18px", height: "18px" }} />
          </motion.a>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .service-card:last-child:nth-child(odd) {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .service-card:last-child:nth-child(odd) {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  return (
    <motion.div
      className="service-card"
      style={{
        backgroundColor: "#FFFFFF", borderRadius: "20px",
        overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column", cursor: "pointer",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(29,78,216,0.15)" }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <Image
          src={service.imageSrc}
          alt={`Service de nettoyage : ${service.title}`}
          fill
          style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 60%)",
          }}
        />

        {/* Icône badge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", top: "16px", left: "16px",
            width: "44px", height: "44px", borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {service.icon}
        </div>

        {/* Tag hover */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute", bottom: "16px", right: "16px",
            display: "flex", alignItems: "center", gap: "6px",
            padding: "6px 14px", borderRadius: "999px",
            backgroundColor: "#1d4ed8", color: "#FFFFFF",
            fontSize: "12px", fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 6 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          En savoir plus
          <ArrowRight aria-hidden="true" style={{ width: "12px", height: "12px" }} />
        </motion.div>
      </div>

      {/* Texte */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>
          {service.title}
        </h3>

        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
          {service.description}
        </p>

        <div aria-hidden="true" style={{ height: "1px", backgroundColor: "#f1f5f9" }} />

        {/* Features */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {service.features.map((feature, i) => (
            <li
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#475569", fontWeight: 500 }}
            >
              <CheckCircle2
                aria-hidden="true"
                style={{ width: "15px", height: "15px", color: "#2563eb", flexShrink: 0 }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Lien bas */}
        <motion.a
          href={`/services/${service.slug}`}
          aria-label={`Découvrir le service : ${service.title}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            marginTop: "auto", paddingTop: "12px",
            fontSize: "14px", fontWeight: 700, color: "#1d4ed8",
            textDecoration: "none", borderTop: "1px solid #eff6ff",
          }}
          whileHover={{ gap: "10px" }}
          transition={{ duration: 0.2 }}
        >
          Découvrir ce service
          <ArrowRight aria-hidden="true" style={{ width: "15px", height: "15px" }} />
        </motion.a>
      </div>
    </motion.div>
  );
}

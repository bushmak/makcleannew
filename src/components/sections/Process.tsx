"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileText, Sparkles, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const STEPS = [
  {
    number: "01",
    icon: <MessageCircle style={{ width: "28px", height: "28px", color: "#FFFFFF" }} />,
    title: "Contactez-nous",
    description: "Demandez votre devis en ligne ou par téléphone — réponse garantie sous 24 h.",
    color: "#1d4ed8",
    light: "#eff6ff",
  },
  {
    number: "02",
    icon: <FileText style={{ width: "28px", height: "28px", color: "#FFFFFF" }} />,
    title: "Devis gratuit",
    description: "Proposition tarifaire claire, détaillée et sans engagement.",
    color: "#0891b2",
    light: "#ecfeff",
  },
  {
    number: "03",
    icon: <Sparkles style={{ width: "28px", height: "28px", color: "#FFFFFF" }} />,
    title: "On intervient",
    description: "Équipe qualifiée sur site — résultat professionnel dès la première visite.",
    color: "#16a34a",
    light: "#f0fdf4",
  },
];

export default function Process() {
  return (
    <section
      aria-label="Processus de nettoyage professionnel Makclean en trois étapes"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SEO invisible */}
      <h2 className="sr-only">
        Comment fonctionne notre service de nettoyage professionnel en trois étapes simples
      </h2>
      <p className="sr-only">
        Les trois étapes pour commander une prestation : contact, devis personnalisé, intervention sur site.
      </p>

      {/* Schema.org HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Processus de nettoyage Makclean",
            description: "Réserver un nettoyage Makclean en trois étapes : prise de contact, devis, intervention.",
            step: STEPS.map((step, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: step.title,
              text: step.description,
            })),
          }),
        }}
      />

      {/* Déco fond */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <SectionTitle
          badge="Comment ça marche"
          title="Votre devis en 24 h, intervention rapide"
          highlight="intervention rapide"
          subtitle="Un processus optimisé pour gagner du temps et obtenir des résultats immédiats."
          align="center"
        />

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            position: "relative",
            marginTop: "24px",
          }}
          className="process-grid"
        >
          {/* Ligne connectrice */}
          <div
            aria-hidden="true"
            className="process-line"
            style={{
              position: "absolute",
              top: "40px",
              left: "calc(16.66% + 24px)",
              right: "calc(16.66% + 24px)",
              height: "2px",
              background: "linear-gradient(90deg, #1d4ed8, #0891b2, #16a34a)",
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", textAlign: "center",
                position: "relative", zIndex: 1,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Cercle icône */}
              <motion.div
                aria-hidden="true"
                style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  backgroundColor: step.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "24px",
                  boxShadow: `0 12px 32px ${step.color}40`,
                  position: "relative", flexShrink: 0,
                }}
                whileHover={{ scale: 1.08, boxShadow: `0 20px 48px ${step.color}50` }}
                transition={{ duration: 0.3 }}
              >
                {step.icon}

                {/* Numéro badge */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute", top: "-6px", right: "-6px",
                    width: "26px", height: "26px", borderRadius: "50%",
                    backgroundColor: "#FFFFFF", border: `2px solid ${step.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 800, color: step.color,
                  }}
                >
                  {i + 1}
                </div>

                {/* Pulse ring */}
                <motion.div
                  aria-hidden="true"
                  style={{
                    position: "absolute", inset: "-8px", borderRadius: "50%",
                    border: `2px solid ${step.color}`, opacity: 0,
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                />
              </motion.div>

              {/* Contenu */}
              <motion.div
                style={{
                  backgroundColor: "#FFFFFF", borderRadius: "20px",
                  padding: "28px 24px", border: `1px solid ${step.light}`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)", width: "100%",
                }}
                whileHover={{ y: -6, boxShadow: `0 20px 60px ${step.color}15`, borderColor: step.color + "40" }}
                transition={{ duration: 0.3 }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "36px", height: "36px", borderRadius: "10px",
                    backgroundColor: step.light, marginBottom: "14px",
                    fontSize: "14px", fontWeight: 800, color: step.color,
                  }}
                >
                  {step.number}
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          style={{ display: "flex", justifyContent: "center", marginTop: "56px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/contact"
            aria-label="Demander un devis gratuit pour une intervention de nettoyage"
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
            Demander mon devis gratuit
            <ArrowRight aria-hidden="true" style={{ width: "18px", height: "18px" }} />
          </motion.a>
        </motion.div>
      </div>

      <style jsx global>{`
        .process-grid { grid-template-columns: repeat(3, 1fr); }
        .process-line { display: block; }
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .process-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
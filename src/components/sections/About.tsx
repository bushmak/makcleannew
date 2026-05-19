"use client";

import { motion } from "framer-motion";
import { Award, Clock, Leaf, Shield, ThumbsUp, Users } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";

const TRUSTED_CLIENT = {
  name: "Centre du bienvenu",
  logo: "/clients/centre-du-bienvenu.png",
  description:
    "Nous assurons l'entretien hebdomadaire de leurs locaux — une collaboration régulière qui témoigne de leur confiance en Makclean.",
};

const VALUES = [
  {
    icon: <Shield style={{ width: "22px", height: "22px", color: "#2563eb" }} />,
    title: "Fiabilité",
    description: "Ponctualité et sérieux à chaque intervention, sans exception.",
  },
  {
    icon: <Leaf style={{ width: "22px", height: "22px", color: "#16a34a" }} />,
    title: "Écologie",
    description: "Produits certifiés éco-labellisés, respectueux de l'environnement.",
  },
  {
    icon: <ThumbsUp style={{ width: "22px", height: "22px", color: "#2563eb" }} />,
    title: "Satisfaction",
    description: "Résultat garanti ou on revient. Votre satisfaction est notre priorité.",
  },
  {
    icon: <Clock style={{ width: "22px", height: "22px", color: "#2563eb" }} />,
    title: "Réactivité",
    description: "Intervention sous 24h, disponible 7j/7 pour vos urgences.",
  },
];

const STATS = [
  { value: 5.0, suffix: "", label: "Etoiles google", icon: <Users style={{ width: "20px", height: "20px" }} /> },
  { value: 10, suffix: "+", label: "Communes & alentours", icon: <Award style={{ width: "20px", height: "20px" }} /> },
  { value: 98, suffix: "%", label: "Taux de satisfaction", icon: <ThumbsUp style={{ width: "20px", height: "20px" }} /> },
  { value: 24, suffix: "h", label: "Réponse rapide", icon: <Clock style={{ width: "20px", height: "20px" }} /> },
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="À propos de Makclean — qui sommes-nous"
      style={{
      backgroundColor: "#FFFFFF",       
      padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SEO invisible */}
      <h2 className="sr-only">
        Entreprise de nettoyage professionnel à Tournai et dans le Hainaut — Makclean
      </h2>
      <p className="sr-only">
        Makclean, société de nettoyage basée à Montroeul-au-Bois : bureaux, immeubles, vitres, fin de chantier et particuliers dans la région de Tournai et du Hainaut.
      </p>

      {/* Schema.org AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "À propos de MakClean",
            url: "https://www.makclean.be/#about",
            description:
              `Makclean, entreprise de nettoyage professionnel basée à ${INTERVENTION_BASE_CITY}, intervient à Tournai et dans tout le Hainaut : bureaux, immeubles, vitres, fin de chantier et particuliers.`,
          }),
        }}
      />

      {/* Déco fond */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-150px",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Layout 2 colonnes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* ── Colonne gauche : Visuel ── */}
          <ScrollReveal direction="left">
            <div style={{ position: "relative" }}>
              <motion.div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  height: "500px",
                  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  boxShadow: "0 30px 80px rgba(29,78,216,0.25)",
                }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                aria-label="Visuel représentant l'équipe Makclean au travail"
              >
                <div
  style={{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "16px",
  }}
>
  <img
    src="/about/makclean-equipe.png"
    alt="Équipe Makclean — accueil client devant une habitation, camionnette de nettoyage professionnel"
    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
  />
</div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* ── Colonne droite : Texte ── */}
          <ScrollReveal direction="right">
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <SectionTitle
                badge="À propos"
                title="Makclean, c'est nous."
                highlight="nous"
                subtitle="Une équipe locale, engagée et à l'écoute de vos besoins."
                align="left"
              />

              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>
                Installés à {INTERVENTION_BASE_CITY}, nous sommes une équipe de professionnels convaincus qu&apos;un
                bon service passe par l&apos;écoute, la rigueur et le respect de chaque client. Particuliers, commerces
                ou copropriétés : nous mettons la même exigence dans chaque intervention, avec des produits adaptés et
                une vraie disponibilité dans toute la {INTERVENTION_AREA_LABEL}.
              </p>

              {/* Valeurs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {VALUES.map((value, i) => (
                  <motion.div
                    key={i}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "12px",
                      padding: "16px", borderRadius: "14px",
                      backgroundColor: "#f8fafc", border: "1px solid #f1f5f9",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    whileHover={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe", y: -2 }}
                    aria-label={`Valeur Makclean : ${value.title} — ${value.description}`}
                  >
                    <div
                      style={{
                        width: "40px", height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        flexShrink: 0,
                      }}
                    >
                      {value.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                        {value.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>
                        {value.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <motion.a
                  href="/contact"
                  aria-label="Demander un devis gratuit de nettoyage professionnel à Makclean"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "14px 28px", borderRadius: "999px",
                    backgroundColor: "#1d4ed8", color: "#FFFFFF",
                    fontWeight: 700, fontSize: "15px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(29,78,216,0.3)",
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(29,78,216,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Demander un devis
                </motion.a>

                <motion.a
                  href="#services"
                  aria-label="Voir les services de nettoyage proposés par Makclean"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "14px 28px", borderRadius: "999px",
                    backgroundColor: "rgba(0,0,0,0)", color: "#1d4ed8",
                    fontWeight: 700, fontSize: "15px",
                    textDecoration: "none",
                    border: "2px solid #bfdbfe",
                  }}
                  whileHover={{ backgroundColor: "#eff6ff", scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Nos services
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bande stats ── */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            marginTop: "80px",
            backgroundColor: "#e2e8f0",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="stats-grid"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "32px 24px",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "8px",
                textAlign: "center",
              }}
              whileHover={{ backgroundColor: "#eff6ff" }}
              transition={{ duration: 0.2 }}
              aria-label={`${stat.label} : ${stat.value}${stat.suffix}`}
            >
              <div style={{ color: "#2563eb", marginBottom: "4px" }} aria-hidden="true">
                {stat.icon}
              </div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client de confiance */}
        <motion.div
          className="trusted-client-block"
          style={{
            marginTop: "32px",
            padding: "32px 36px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
            border: "1px solid #dbeafe",
            boxShadow: "0 4px 24px rgba(29,78,216,0.06)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          aria-label={`Client de confiance : ${TRUSTED_CLIENT.name}`}
        >
          <div className="trusted-client-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1d4ed8", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Ils nous font confiance
              </div>
              <p style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", lineHeight: 1.35, margin: 0 }}>
                {TRUSTED_CLIENT.name}
              </p>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, margin: 0, maxWidth: "520px" }}>
                Ils nous confient l&apos;entretien de leurs locaux <strong style={{ color: "#334155", fontWeight: 600 }}>chaque semaine</strong>.
                Une collaboration régulière qui reflète la confiance qu&apos;ils accordent à Makclean.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                minHeight: "120px",
                overflow: "hidden",
              }}
            >
              <img
                src={TRUSTED_CLIENT.logo}
                alt={`Logo ${TRUSTED_CLIENT.name}`}
                style={{
                  height: "72px",
                  width: "auto",
                  objectFit: "contain",
                  transform: "scale(1.45)",
                  transformOrigin: "center center",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .trusted-client-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .trusted-client-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
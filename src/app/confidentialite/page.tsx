"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";

const SECTIONS = [
  {
    number: "01",
    title: "Responsable du traitement",
    intro: "Le responsable du traitement de vos données personnelles est :",
    infos: [
      { label: "Entreprise", value: "MakClean" },
      { label: "Numéro BCE", value: "1033.072.170" },
      { label: "Siège social", value: "Place de Montroeul(MB) 22/D, 7911 Frasnes-lez-Anvaing, Belgique" },
      { label: "Email", value: "info@makclean.be" },
      { label: "Téléphone", value: "+32 489 125 099" },
    ],
    outro: "En tant que responsable du traitement, MakClean détermine les finalités et les moyens du traitement de vos données personnelles.",
  },
  {
    number: "02",
    title: "Données collectées",
    intro: "Nous collectons les informations que vous nous fournissez volontairement lorsque vous :",
    bullets: [
      "Remplissez notre formulaire de contact ou de devis",
      "Nous contactez par téléphone ou email",
      "Utilisez nos services de nettoyage",
    ],
    subtitle: "Types de données collectées :",
    bullets2: [
      "Nom et prénom",
      "Adresse email",
      "Numéro de téléphone",
      "Adresse postale (si nécessaire pour la prestation)",
      "Informations sur le service demandé",
      "Données de facturation (pour les clients)",
    ],
  },
  {
    number: "03",
    title: "Base légale du traitement",
    intro: "Conformément à l'article 6 du RGPD, nous traitons vos données personnelles sur les bases légales suivantes :",
    cards: [
      { icon: "📝", title: "Exécution d'un contrat (Art. 6.1.b)", text: "Traitement nécessaire à l'exécution de nos prestations de nettoyage : établissement de devis, planification des interventions, facturation, service client." },
      { icon: "⚖️", title: "Obligation légale (Art. 6.1.c)", text: "Conservation des données comptables et fiscales conformément au droit belge (Code de droit économique, obligations TVA)." },
      { icon: "🎯", title: "Intérêt légitime (Art. 6.1.f)", text: "Gestion de la relation commerciale, amélioration de nos services, prospection commerciale auprès de nos clients existants." },
      { icon: "✅", title: "Consentement (Art. 6.1.a)", text: "Pour l'utilisation de cookies non essentiels et l'envoi de communications marketing (vous pouvez retirer votre consentement à tout moment)." },
    ],
  },
  {
    number: "04",
    title: "Finalités du traitement",
    intro: "Vos données personnelles sont utilisées pour les finalités suivantes :",
    cards: [
      { icon: "📞", title: "Gestion des demandes", text: "Répondre à vos demandes de devis et questions" },
      { icon: "🧹", title: "Exécution des prestations", text: "Fournir nos services de nettoyage" },
      { icon: "📄", title: "Facturation", text: "Établir les factures et gérer les paiements" },
      { icon: "📊", title: "Amélioration", text: "Améliorer la qualité de nos services" },
    ],
  },
  {
    number: "05",
    title: "Protection des données",
    intro: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération.",
    subtitle: "🔒 Nos engagements :",
    bullets2: [
      "Stockage sécurisé de vos données sur des serveurs protégés",
      "Accès limité aux seules personnes autorisées",
      "Aucune vente ou location de vos données à des tiers",
      "Transmission sécurisée de vos informations (HTTPS)",
      "Sauvegarde régulière des données",
    ],
  },
  {
    number: "06",
    title: "Durée de conservation",
    intro: "Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :",
    bullets: [
      "Clients actifs : Pendant toute la durée de la relation commerciale + 3 ans après la dernière prestation",
      "Prospects : Maximum 3 ans après le dernier contact",
      "Données comptables : 7 ans (obligation légale belge - Art. III.86 CDE)",
      "Cookies : Maximum 13 mois",
    ],
  },
  {
    number: "07",
    title: "Vos droits",
    intro: "Conformément au RGPD (Articles 15 à 22), vous disposez des droits suivants :",
    rights: [
      { icon: "✓", title: "Droit d'accès (Art. 15)", text: "Consulter les données que nous détenons sur vous et obtenir une copie" },
      { icon: "✓", title: "Droit de rectification (Art. 16)", text: "Corriger vos données inexactes ou incomplètes" },
      { icon: "✓", title: "Droit à l'effacement (Art. 17)", text: 'Demander la suppression de vos données ("droit à l\'oubli")' },
      { icon: "✓", title: "Droit à la limitation (Art. 18)", text: "Limiter le traitement de vos données dans certains cas" },
      { icon: "✓", title: "Droit d'opposition (Art. 21)", text: "Vous opposer au traitement de vos données, notamment pour la prospection" },
      { icon: "✓", title: "Droit à la portabilité (Art. 20)", text: "Recevoir vos données dans un format structuré et lisible par machine" },
      { icon: "✓", title: "Droit de retirer le consentement", text: "Retirer votre consentement à tout moment (sans affecter la licéité du traitement antérieur)" },
    ],
  },
  {
    number: "08",
    title: "Politique des cookies",
    intro: "Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil. Une fois votre choix effectué, vous pouvez modifier vos préférences à tout moment via la bannière se situant en bas à gauche de votre écran nommée Cookie Policy.",
    cards: [
      { icon: "🔧", title: "Cookies techniques (essentiels)", text: "Nécessaires au fonctionnement du site. Ils ne requièrent pas votre consentement.\n\nExemples : session utilisateur, préférences de navigation" },
      { icon: "📊", title: "Cookies analytiques", text: "Nous permettent de mesurer l'audience du site et d'améliorer nos services.\n\n" },
      { icon: "⚙️", title: "Gestion des cookies", text: "Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est envoyé. Notez que certaines fonctionnalités du site peuvent ne pas fonctionner correctement si vous désactivez les cookies." },
    ],
  },
  {
    number: "09",
    title: "Partage et transfert des données",
    intro: "Nous ne vendons ni ne louons vos données personnelles à des tiers. Vos données peuvent être partagées uniquement avec :",
    bullets2: [
      "Nos sous-traitants techniques (hébergement du site)",
      "Notre comptable (obligations fiscales)",
      "Les autorités légales si la loi l'exige",
    ],
    outro: "🌍 Transferts hors Union Européenne\n\nNotre site est hébergé au sein de l'Union Européenne. Nous ne transférons pas intentionnellement vos données personnelles en dehors de l'Espace Économique Européen (EEE). Si un tel transfert devait avoir lieu (par exemple via un sous-traitant), nous nous assurerions que des garanties appropriées sont en place conformément au RGPD (décision d'adéquation, clauses contractuelles types, etc.).",
  },
  {
    number: "11",
    title: "Droit d'introduire une réclamation",
    intro: "Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente.",
    infos: [
      { label: "Autorité", value: "Autorité de Protection des Données (APD)" },
      { label: "Adresse", value: "Rue de la Presse 35, 1000 Bruxelles, Belgique" },
      { label: "Téléphone", value: "+32 2 274 48 00" },
      { label: "Email", value: "contact@apd-gba.be" },
      { label: "Site web", value: "www.autoriteprotectiondonnees.be" },
    ],
    outro: "Nous vous encourageons toutefois à nous contacter en premier lieu afin de résoudre tout problème de manière amiable.",
  },
  {
    number: "12",
    title: "Modifications de cette politique",
    intro: "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment pour refléter les changements dans nos pratiques ou pour des raisons légales. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour. En cas de modification substantielle, nous vous en informerons par un avis visible sur notre site.",
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <PageHero
          title="Politique de Confidentialité"
          highlight="Confidentialité"
          subtitle="Conformément au RGPD — Règlement UE 2016/679"
          breadcrumbs={[{ label: "Politique de confidentialité" }]}
        />

        <section style={{ backgroundColor: "#f8fafc", padding: "80px 0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

            {/* Intro globale */}
            <motion.div
              style={{
                backgroundColor: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "16px",
                padding: "24px 32px",
                marginBottom: "28px",
                fontSize: "14px",
                color: "#1e40af",
                lineHeight: 1.8,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              🛡️ Chez MakClean, nous nous engageons à protéger votre vie privée et vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et aux lois belges en vigueur.
            </motion.div>

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
                    display: "flex", gap: "24px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.04 }}
                >
                  {/* Numéro */}
                  <div style={{
                    fontSize: "13px", fontWeight: 800,
                    color: "#bfdbfe", flexShrink: 0,
                    paddingTop: "4px", width: "32px",
                  }}>
                    {section.number}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      {section.title}
                    </h2>

                    {section.intro && (
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.85, margin: 0 }}>
                        {section.intro}
                      </p>
                    )}

                    {/* Bullets simples */}
                    {"bullets" in section && section.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {section.bullets.map((b, j) => (
                          <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2563eb", flexShrink: 0, marginTop: "6px" }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Sous-titre + bullets2 */}
                    {"subtitle" in section && section.subtitle && (
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                        {section.subtitle}
                      </p>
                    )}
                    {"bullets2" in section && section.bullets2 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {section.bullets2.map((b, j) => (
                          <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2563eb", flexShrink: 0, marginTop: "6px" }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Infos tableau */}
                    {"infos" in section && section.infos && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {section.infos.map((info, j) => (
                          <div key={j} style={{
                            display: "flex", gap: "16px", flexWrap: "wrap",
                            padding: "10px 16px", borderRadius: "10px",
                            backgroundColor: "#f8fafc", border: "1px solid #f1f5f9",
                          }}>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b", minWidth: "160px", flexShrink: 0 }}>
                              {info.label}
                            </span>
                            <span style={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>
                              {info.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cards (bases légales, finalités, cookies) */}
                    {"cards" in section && section.cards && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                        {section.cards.map((card, j) => (
                          <div key={j} style={{
                            padding: "16px", borderRadius: "12px",
                            backgroundColor: "#f8fafc", border: "1px solid #f1f5f9",
                          }}>
                            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{card.icon}</div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                              {card.title}
                            </div>
                            <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                              {card.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Droits */}
                    {"rights" in section && section.rights && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {section.rights.map((right, j) => (
                          <div key={j} style={{
                            display: "flex", gap: "14px", alignItems: "flex-start",
                            padding: "14px 16px", borderRadius: "12px",
                            backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                          }}>
                            <span style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a", flexShrink: 0 }}>✓</span>
                            <div>
                              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                                {right.title}
                              </div>
                              <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.6 }}>
                                {right.text}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Outro */}
                    {"outro" in section && section.outro && (
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.85, margin: 0, whiteSpace: "pre-line" }}>
                        {section.outro}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Section 10 — Exercer vos droits */}
            <motion.div
              style={{
                marginTop: "20px",
                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                borderRadius: "20px", padding: "40px", color: "#FFFFFF",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: "flex", gap: "24px" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "rgba(191,219,254,0.5)", flexShrink: 0, paddingTop: "4px", width: "32px" }}>
                  10
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "17px", fontWeight: 800, marginBottom: "12px" }}>
                    Exercer vos droits
                  </h2>
                  <p style={{ fontSize: "14px", color: "#bfdbfe", lineHeight: 1.7, marginBottom: "24px" }}>
                    Pour exercer vos droits ou pour toute question concernant vos données personnelles, contactez-nous. Nous nous engageons à répondre à votre demande dans un délai d'un mois. Ce délai peut être prolongé de deux mois si votre demande est complexe ou si nous recevons un grand nombre de demandes.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { icon: <Mail style={{ width: "15px", height: "15px" }} />, text: "info@makclean.be", href: "mailto:info@makclean.be" },
                      { icon: <Phone style={{ width: "15px", height: "15px" }} />, text: "+32 489 125 099", href: "tel:+32489125099" },
                      { icon: <MapPin style={{ width: "15px", height: "15px" }} />, text: "MakClean, Place de Montroeul(MB) 22/D, 7911 Frasnes-lez-Anvaing, Belgique", href: null },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "8px",
                          backgroundColor: "rgba(255,255,255,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          {item.icon}
                        </div>
                        {item.href ? (
                          <a href={item.href} style={{ fontSize: "14px", color: "#bfdbfe", fontWeight: 500, textDecoration: "none", paddingTop: "6px" }}>
                            {item.text}
                          </a>
                        ) : (
                          <span style={{ fontSize: "14px", color: "#bfdbfe", fontWeight: 500, paddingTop: "6px", lineHeight: 1.6 }}>
                            {item.text}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Footer mention */}
            <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "32px", fontStyle: "italic" }}>
              Dernière mise à jour : Juin 2026 · Version 2.0 — Conforme RGPD
            </p>

          </div>
        </section>

      </PageWrapper>
    </>
  );
}

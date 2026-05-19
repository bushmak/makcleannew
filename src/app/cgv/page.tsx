"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";

const ARTICLES = [
  {
    number: "01",
    title: "Identification du prestataire",
    infos: [
      { label: "Entreprise", value: "MakClean" },
      { label: "Forme juridique", value: "Entreprise individuelle" },
      { label: "Numéro BCE", value: "1033.072.170" },
      { label: "Numéro TVA", value: "BE 1033.072.170" },
      { label: "Siège social", value: "Place de Montroeul(MB) 22/D, 7911 Frasnes-lez-Anvaing, Belgique" },
      { label: "Email", value: "info@makclean.be" },
      { label: "Téléphone", value: "+32 489 125 099" },
      { label: "Activité", value: "Services de nettoyage professionnel" },
    ],
  },
  {
    number: "02",
    title: "Objet",
    content:
      "Les présentes conditions générales de vente (CGV) s'appliquent à toutes les prestations de services de nettoyage réalisées par MakClean pour ses clients professionnels (B2B) et particuliers (B2C) en province de Hainaut et dans les communes où MakClean accepte d'intervenir (liste indicative sur makclean.be/zones).",
  },
  {
    number: "03",
    title: "Services proposés",
    intro: "MakClean propose les services de nettoyage suivants :",
    bullets: [
      "Nettoyage de bureaux et locaux professionnels",
      "Nettoyage de vitres",
      "Nettoyage de fin de chantier",
      "Entretien d'immeubles",
      "Nettoyage pour particuliers",
    ],
  },
  {
    number: "04",
    title: "Devis et commande",
    items: [
      { num: "4.1", text: "Tout devis est établi gratuitement par MakClean après évaluation des besoins du client (visite sur site ou échange téléphonique)." },
      { num: "4.2", text: "Le devis est valable 30 jours à compter de sa date d'émission." },
      { num: "4.3", text: "La commande est considérée comme ferme et définitive après acceptation écrite du devis par le client (signature, email de confirmation, ou validation via notre formulaire en ligne)." },
      { num: "4.4", text: "Toute modification de la commande initiale devra faire l'objet d'un nouveau devis." },
    ],
  },
  {
    number: "05",
    title: "Tarifs et paiement",
    items: [
      { num: "5.1", text: "Les prix sont indiqués en euros. Pour les clients professionnels (B2B), les prix s'entendent hors taxes (HTVA). Pour les particuliers (B2C), les prix sont indiqués TTC. Le taux de TVA applicable est celui en vigueur au jour de la facturation (actuellement 21%)." },
      { num: "5.2", text: "Le règlement des prestations s'effectue par virement bancaire ou en espèces (pour les montants inférieurs à 3 000 EUR conformément à la législation belge)." },
      { num: "5.3", text: "Pour les prestations ponctuelles, le paiement est dû à réception de la facture, avec un délai maximum de 30 jours pour les professionnels et 14 jours pour les particuliers." },
      { num: "5.4", text: "Pour les contrats d'entretien régulier, la facturation est mensuelle et le paiement est dû dans les 15 jours suivant la date de facturation." },
    ],
  },
  {
    number: "06",
    title: "Révision et indexation des prix",
    items: [
      { num: "6.1", text: "Pour les contrats d'entretien régulier, les prix peuvent être révisés annuellement à la date anniversaire du contrat." },
      { num: "6.2", text: "La révision des prix est basée sur l'évolution de l'indice santé belge publié par le SPF Économie, selon la formule suivante : Nouveau prix = Prix initial × (Nouvel indice / Indice initial)" },
      { num: "6.3", text: "Le client sera informé par écrit de toute modification tarifaire au moins 30 jours avant son application. En cas de désaccord, le client pourra résilier le contrat sans frais dans les 15 jours suivant la notification." },
      { num: "6.4", text: "En cas d'augmentation exceptionnelle des coûts (carburant, produits, charges sociales) supérieure à 10% en cours d'année, MakClean se réserve le droit de proposer une révision anticipée." },
    ],
  },
  {
    number: "07",
    title: "Retard de paiement",
    intro: "Tout retard de paiement entraînera de plein droit et sans mise en demeure préalable :",
    bullets: [
      "L'application d'intérêts de retard au taux d'intérêt légal belge majoré de 2% (conformément à la loi du 2 août 2002 concernant la lutte contre le retard de paiement)",
      "Une indemnité forfaitaire de recouvrement de 40 EUR (B2B) conformément à l'article 6 de la loi du 2 août 2002",
      "La possibilité pour MakClean de suspendre toute prestation en cours jusqu'à régularisation",
    ],
  },
  {
    number: "08",
    title: "Droit de rétractation (Clients particuliers)",
    badge: "B2C uniquement",
    items: [
      { num: "8.1", text: "Délai : Vous disposez d'un délai de 14 jours calendrier à compter de la conclusion du contrat pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités." },
      { num: "8.2", text: "Exercice : Pour exercer ce droit, vous devez nous notifier votre décision par une déclaration dénuée d'ambiguïté (par courrier ou email à info@makclean.be)." },
      { num: "8.3", text: "Exception : Le droit de rétractation ne peut plus être exercé si l'exécution du service a commencé, avec votre accord préalable exprès, avant la fin du délai de rétractation." },
      { num: "8.4", text: "Remboursement : En cas de rétractation valide, nous vous rembourserons tous les paiements reçus dans les 14 jours suivant la réception de votre demande." },
    ],
    note: "Cet article s'applique uniquement aux clients particuliers. Les clients professionnels (B2B) ne bénéficient pas du droit de rétractation.",
  },
  {
    number: "09",
    title: "Exécution des prestations",
    items: [
      { num: "9.1", text: "MakClean s'engage à réaliser les prestations avec le plus grand soin et dans le respect des règles de l'art, en utilisant du matériel et des produits adaptés." },
      { num: "9.2", text: "Les horaires d'intervention sont définis en accord avec le client." },
      { num: "9.3", text: "Le client s'engage à permettre l'accès aux locaux aux heures convenues et à mettre à disposition les commodités nécessaires (eau, électricité, sanitaires)." },
      { num: "9.4", text: "Toute modification des conditions d'intervention devra être signalée à MakClean au minimum 48 heures à l'avance." },
    ],
  },
  {
    number: "10",
    title: "Annulation et résiliation",
    items: [
      { num: "10.1", text: "Prestations ponctuelles : Toute annulation doit être notifiée au moins 48 heures avant la date d'intervention prévue. En cas d'annulation tardive (moins de 48h), 50% du montant du devis sera facturé à titre de dédommagement." },
      { num: "10.2", text: "Contrats d'entretien : La résiliation d'un contrat d'entretien régulier peut être effectuée par chaque partie moyennant un préavis d'un mois, notifié par écrit (courrier ou email)." },
      { num: "10.3", text: "En cas de manquement grave de l'une des parties à ses obligations, l'autre partie peut résilier le contrat avec effet immédiat après mise en demeure restée sans effet pendant 15 jours." },
    ],
  },
  {
    number: "11",
    title: "Réclamations",
    items: [
      { num: "11.1", text: "Toute réclamation relative à la qualité des prestations doit être formulée dans les 48 heures suivant l'intervention, par email à info@makclean.be ou par téléphone au +32 489 125 099." },
      { num: "11.2", text: "En cas de réclamation justifiée, MakClean s'engage à reprendre gratuitement les travaux insatisfaisants dans les meilleurs délais, sans préjudice des autres droits du client." },
    ],
  },
  {
    number: "12",
    title: "Responsabilité et limitation",
    items: [
      { num: "12.1", text: "Assurance : MakClean est assuré en responsabilité civile professionnelle (RC Pro) pour les dommages causés pendant l'exécution des prestations." },
      { num: "12.2", text: "Obligations du client : Le client doit signaler avant l'intervention tout objet de valeur, matériau fragile ou surface nécessitant un traitement particulier. À défaut, MakClean ne pourra être tenu responsable des dommages éventuels." },
    ],
    intro: null,
    exclusions: {
      title: "12.3 Exclusions — MakClean ne pourra être tenu responsable :",
      items: [
        "Des dommages résultant d'une information erronée ou incomplète de la part du client",
        "De l'usure normale des surfaces ou matériaux",
        "Des dommages préexistants non signalés",
        "Des dommages indirects ou immatériels (perte de profit, préjudice commercial)",
      ],
    },
    outro: "12.4 Limitation de responsabilité : En tout état de cause, la responsabilité totale de MakClean au titre d'une prestation est limitée au montant effectivement payé par le client pour ladite prestation. Cette limitation ne s'applique pas en cas de dol, faute lourde ou dommages corporels.",
  },
  {
    number: "13",
    title: "Confidentialité",
    content: "MakClean s'engage à respecter la confidentialité des informations auxquelles ses équipes pourraient avoir accès lors des interventions. Cette obligation de confidentialité perdure même après la fin de la relation contractuelle.",
  },
  {
    number: "14",
    title: "Force majeure",
    content: "MakClean ne pourra être tenu responsable de l'inexécution ou du retard dans l'exécution de ses obligations en cas de force majeure au sens de l'article 5.226 du Code civil belge (catastrophe naturelle, pandémie, grève générale, mesures gouvernementales, etc.). Dans ce cas, les prestations seront reportées sans pénalité dès que les circonstances le permettront.",
  },
  {
    number: "15",
    title: "Médiation et règlement des litiges",
    items: [
      { num: "15.1", text: "Les présentes CGV sont soumises au droit belge." },
      { num: "15.2", text: "En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire." },
      { num: "15.3", text: "À défaut d'accord amiable ou de médiation, tout litige sera soumis aux tribunaux compétents de l'arrondissement judiciaire de Tournai (Belgique)." },
    ],
    mediation: {
      title: "🤝 Médiation pour les consommateurs (B2C)",
      infos: [
        { label: "Organisme", value: "Service de Médiation pour le Consommateur" },
        { label: "Adresse", value: "Boulevard du Roi Albert II 8, bte 1, 1000 Bruxelles" },
        { label: "Téléphone", value: "+32 2 702 52 00" },
        { label: "Site web", value: "www.mediationconsommateur.be" },
      ],
    },
  },
  {
    number: "16",
    title: "Protection des données personnelles",
    content: "Les données personnelles collectées dans le cadre de nos prestations sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations sur la collecte, le traitement et vos droits concernant vos données personnelles, veuillez consulter notre Politique de Confidentialité.",
  },
  {
    number: "17",
    title: "Dispositions finales",
    items: [
      { num: "17.1", text: "Si une disposition des présentes CGV est déclarée nulle ou inapplicable, les autres dispositions restent en vigueur." },
      { num: "17.2", text: "Le fait pour MakClean de ne pas se prévaloir d'un manquement du client à l'une de ses obligations ne saurait être interprété comme une renonciation à l'obligation en cause." },
      { num: "17.3", text: "MakClean se réserve le droit de modifier les présentes CGV. Les CGV applicables sont celles en vigueur au jour de la commande." },
    ],
  },
];

export default function CGVPage() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <PageHero
          title="Conditions Générales de Vente"
          highlight="Vente"
          subtitle="Conformément au droit belge de la consommation — Version 2.0"
          breadcrumbs={[{ label: "CGV" }]}
        />

        <section style={{ backgroundColor: "#f8fafc", padding: "80px 0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

            {/* Intro */}
            <motion.div
              style={{
                backgroundColor: "#eff6ff", border: "1px solid #bfdbfe",
                borderRadius: "16px", padding: "24px 32px", marginBottom: "28px",
                fontSize: "14px", color: "#1e40af", lineHeight: 1.8,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              📋 Les présentes conditions générales de vente régissent les relations contractuelles entre MakClean et ses clients (professionnels et particuliers) pour toutes les prestations de services de nettoyage. <strong>Toute commande implique l'acceptation sans réserve des présentes CGV.</strong>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {ARTICLES.map((article, i) => (
                <motion.div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF", borderRadius: "20px",
                    padding: "36px 40px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                    border: "1px solid #f1f5f9",
                    display: "flex", gap: "24px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.03 }}
                >
                  {/* Numéro */}
                  <div style={{
                    fontSize: "13px", fontWeight: 800, color: "#bfdbfe",
                    flexShrink: 0, paddingTop: "4px", width: "32px",
                  }}>
                    {article.number}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

                    {/* Titre + badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        Article {article.number} — {article.title}
                      </h2>
                      {"badge" in article && article.badge && (
                        <span style={{
                          fontSize: "11px", fontWeight: 700,
                          backgroundColor: "#eff6ff", color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                          padding: "3px 10px", borderRadius: "999px",
                        }}>
                          {article.badge}
                        </span>
                      )}
                    </div>

                    {/* Texte simple */}
                    {"content" in article && article.content && (
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.85, margin: 0 }}>
                        {article.content}
                      </p>
                    )}

                    {/* Intro */}
                    {"intro" in article && article.intro && (
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.85, margin: 0 }}>
                        {article.intro}
                      </p>
                    )}

                    {/* Bullets */}
                    {"bullets" in article && article.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {article.bullets.map((b, j) => (
                          <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2563eb", flexShrink: 0, marginTop: "6px" }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Sous-articles numérotés */}
                    {"items" in article && article.items && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {article.items.map((item, j) => (
                          <div key={j} style={{
                            display: "flex", gap: "14px",
                            padding: "14px 16px", borderRadius: "12px",
                            backgroundColor: "#f8fafc", border: "1px solid #f1f5f9",
                          }}>
                            <span style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb", flexShrink: 0, paddingTop: "2px", minWidth: "28px" }}>
                              {item.num}
                            </span>
                            <span style={{ fontSize: "14px", color: "#475569", lineHeight: 1.7 }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Infos tableau */}
                    {"infos" in article && article.infos && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {article.infos.map((info, j) => (
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

                    {/* Exclusions */}
                    {"exclusions" in article && article.exclusions && (
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                          {article.exclusions.title}
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                          {article.exclusions.items.map((b, j) => (
                            <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569" }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f97316", flexShrink: 0, marginTop: "6px" }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Outro */}
                    {"outro" in article && article.outro && (
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.85, margin: 0 }}>
                        {article.outro}
                      </p>
                    )}

                    {/* Note B2C */}
                    {"note" in article && article.note && (
                      <div style={{
                        padding: "14px 16px", borderRadius: "12px",
                        backgroundColor: "#fffbeb", border: "1px solid #fde68a",
                        fontSize: "13px", color: "#92400e", lineHeight: 1.6,
                      }}>
                        💡 {article.note}
                      </div>
                    )}

                    {/* Médiation */}
                    {"mediation" in article && article.mediation && (
                      <div style={{
                        backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                        borderRadius: "14px", padding: "20px",
                      }}>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#15803d", marginBottom: "14px" }}>
                          {article.mediation.title}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {article.mediation.infos.map((info, j) => (
                            <div key={j} style={{
                              display: "flex", gap: "16px", flexWrap: "wrap",
                              padding: "8px 12px", borderRadius: "8px",
                              backgroundColor: "#FFFFFF", border: "1px solid #dcfce7",
                            }}>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", minWidth: "120px", flexShrink: 0 }}>
                                {info.label}
                              </span>
                              <span style={{ fontSize: "12px", color: "#334155", fontWeight: 500 }}>
                                {info.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              ))}
            </div>

{/* Article 18 — Contact */}
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
      18
    </div>
    <div style={{ flex: 1 }}>
      <h2 style={{ fontSize: "17px", fontWeight: 800, marginBottom: "20px" }}>
        Article 18 — Contact
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Mail style={{ width: "15px", height: "15px" }} />
          </div>
          <a href="mailto:info@makclean.be" style={{ fontSize: "14px", color: "#bfdbfe", fontWeight: 500, textDecoration: "none" }}>
            info@makclean.be
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Phone style={{ width: "15px", height: "15px" }} />
          </div>
          <a href="tel:+32489125099" style={{ fontSize: "14px", color: "#bfdbfe", fontWeight: 500, textDecoration: "none" }}>
            +32 489 125 099
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
            <MapPin style={{ width: "15px", height: "15px" }} />
          </div>
          <span style={{ fontSize: "14px", color: "#bfdbfe", fontWeight: 500, paddingTop: "6px", lineHeight: 1.6 }}>
            Place de Montroeul(MB) 22/D,<br />7911 Frasnes-lez-Anvaing, Belgique
          </span>
        </div>

      </div>
    </div>
  </div>
</motion.div>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "32px", fontStyle: "italic" }}>
              Dernière mise à jour : Février 2025 · Version 2.0 — Conforme au droit belge de la consommation
            </p>

          </div>
        </section>

      </PageWrapper>
    </>
  );
}

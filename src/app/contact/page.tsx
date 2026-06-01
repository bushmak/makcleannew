"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { CONTACT_DEVIS_SUCCESS_KEY } from "@/lib/contact-conversion";
import Link from "next/link";
import {
  CONTACT_COMMUNE_OTHER,
  CONTACT_COMMUNE_UNKNOWN,
  CONTACT_FORM_COMMUNES,
  INTERVENTION_AREA_LABEL,
  INTERVENTION_BASE_CITY,
  INTERVENTION_OUT_OF_ZONE_NOTE,
  INTERVENTION_SHORT,
} from "@/lib/intervention-area";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";

const INFOS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#25d366" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+32 489 125 099",
    href: "https://wa.me/32489125099",
  },
  {
    icon: <Mail style={{ width: "20px", height: "20px", color: "#2563eb" }} />,
    label: "Email",
    value: "info@makclean.be",
    href: "mailto:info@makclean.be",
  },
  {
    icon: <MapPin style={{ width: "20px", height: "20px", color: "#2563eb" }} />,
    label: "Zone",
    value: `${INTERVENTION_BASE_CITY} · ${INTERVENTION_AREA_LABEL}`,
    href: "/zones",
  },
  {
    icon: <Clock style={{ width: "20px", height: "20px", color: "#2563eb" }} />,
    label: "Disponibilité",
    value: "Lun–Vend : 8h–18h et Sam : 9h–14h",
    href: null,
  },
];

const SERVICES_OPTIONS = [
  "Nettoyage de bureaux",
  "Nettoyage de vitres",
  "Fin de chantier",
  "Entretien d'immeuble",
  "Nettoyage de terrasse",
  "Nettoyage particulier",
  "Nettoyage fin de bail",
  "Autre",
];

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    commune: "",
    communeOther: "",
    addressDetail: "",
    service: "",
    message: "",
  });
  const [confirmRgpd, setConfirmRgpd] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submittedAt] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const locationLabel =
    formData.commune === CONTACT_COMMUNE_OTHER
      ? formData.communeOther.trim()
      : formData.commune === CONTACT_COMMUNE_UNKNOWN
        ? "Hors zone / à confirmer"
        : formData.commune;

  const hasValidLocation =
    formData.commune &&
    (formData.commune !== CONTACT_COMMUNE_OTHER || formData.communeOther.trim());

  const isValid =
    formData.name &&
    formData.email &&
    formData.message &&
    hasValidLocation &&
    confirmRgpd;

  const handleSubmit = async () => {
    setError("");
    if (!formData.name || !formData.email || !formData.message) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }
    if (!formData.commune) {
      setError("Merci d'indiquer la commune ou la localité du chantier.");
      return;
    }
    if (formData.commune === CONTACT_COMMUNE_OTHER && !formData.communeOther.trim()) {
      setError("Merci de préciser le nom de votre commune.");
      return;
    }
    if (!confirmRgpd) {
      setError("Merci d'accepter la politique de confidentialité avant d'envoyer.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location: locationLabel,
          honeypot,
          rgpdConsent: confirmRgpd,
          submittedAt,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || data.error) {
        setError(data?.error || "Une erreur est survenue.");
      } else if (data.success) {
        try {
          sessionStorage.setItem(CONTACT_DEVIS_SUCCESS_KEY, "1");
        } catch {
          /* ignore */
        }
        router.push("/merci-devis");
      } else {
        setError("Une erreur est survenue.");
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="sr-only">
        Contact Makclean — Nettoyage professionnel à Tournai et dans le Hainaut
      </h1>

      <Navbar />
      <PageWrapper>
        <PageHero
          title="Contactez Makclean"
          highlight="Makclean"
          subtitle={`Demandez votre devis gratuit sous 24 h. ${INTERVENTION_SHORT} Services pour particuliers et professionnels.`}
          breadcrumbs={[{ label: "Contact" }]}
        />

        <section style={{ backgroundColor: "#f8fafc", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: "48px",
                alignItems: "start",
              }}
              className="contact-grid"
            >
              {/* ── Colonne gauche infos ── */}
              <ScrollReveal direction="left">
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "24px",
                      padding: "36px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#0f172a",
                        marginBottom: "24px",
                      }}
                    >
                      Nos coordonnées
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      {INFOS.map((info, i) => (
                        <motion.div
                          key={i}
                          style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "12px",
                              backgroundColor: info.label === "WhatsApp" ? "#dcfce7" : "#eff6ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {info.icon}
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#94a3b8",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                marginBottom: "2px",
                              }}
                            >
                              {info.label}
                            </div>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="info-link"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  color: "#0f172a",
                                  textDecoration: "none",
                                }}
                              >
                                {info.value}
                              </a>
                            ) : (
                              <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                                {info.value}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bloc urgence */}
                  <motion.div
                    style={{
                      background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                      borderRadius: "24px",
                      padding: "32px",
                      color: "#FFFFFF",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "12px" }}>⚡</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>
                      Besoin urgent ?
                    </h3>
                    <p style={{ fontSize: "14px", color: "#bfdbfe", lineHeight: 1.6, marginBottom: "20px" }}>
                      Contactez-nous directement pour une intervention rapide.
                      Attention : Moyennant coût supplémentaire !
                    </p>
                    <motion.a
                      href="tel:+32489125099"
                      className="urgence-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        borderRadius: "999px",
                        backgroundColor: "#FFFFFF",
                        color: "#1d4ed8",
                        fontWeight: 700,
                        fontSize: "15px",
                        textDecoration: "none",
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Phone style={{ width: "16px", height: "16px" }} />
                      +32 489 125 099
                    </motion.a>
                  </motion.div>
                </div>
              </ScrollReveal>

              {/* ── Colonne droite formulaire ── */}
              <ScrollReveal direction="right">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "24px",
                    padding: "44px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                        Demande de devis gratuit
                      </h2>
                      <p style={{ fontSize: "14px", color: "#64748b" }}>
                        Réponse garantie sous 24h · Sans engagement
                      </p>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        opacity: 0,
                        pointerEvents: "none",
                      }}
                      aria-hidden="true"
                    >
                      <input
                        tabIndex={-1}
                        name="website"
                        aria-label="Ne pas remplir"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        autoComplete="off"
                      />
                    </div>

                    {/* Nom + Téléphone */}
                    <div
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                      className="form-row"
                    >
                      <InputField
                        label="Nom complet *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                      />
                      <InputField
                        label="Téléphone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+32 489 125 099"
                        hint="Pour être rappelé(e)"
                      />
                    </div>

                    {/* Email */}
                    <InputField
                      label="Email *"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.be"
                      type="email"
                    />

                    {/* Localisation */}
                    <motion.div
                      style={{
                        padding: "16px 18px",
                        borderRadius: "14px",
                        backgroundColor: "#f0f9ff",
                        border: "1px solid #bae6fd",
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p style={{ fontSize: "13px", color: "#0369a1", margin: "0 0 12px", lineHeight: 1.55 }}>
                        <strong>Où se situe le lieu à nettoyer ?</strong> Cette information
                        nous aide à préparer votre devis et à confirmer notre zone d&apos;intervention.
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label
                          htmlFor="select-commune"
                          style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
                        >
                          Commune ou localité *
                        </label>
                        <select
                          id="select-commune"
                          name="commune"
                          value={formData.commune}
                          onChange={handleChange}
                          className="form-input"
                          style={{
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "2px solid #e2e8f0",
                            fontSize: "14px",
                            color: formData.commune ? "#0f172a" : "#94a3b8",
                            backgroundColor: "#FFFFFF",
                            outline: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Choisissez une commune…</option>
                          {CONTACT_FORM_COMMUNES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                          <option value={CONTACT_COMMUNE_OTHER}>Autre commune (Hainaut ou proche)</option>
                          <option value={CONTACT_COMMUNE_UNKNOWN}>Hors zone / commune non listée</option>
                        </select>
                      </div>

                      {formData.commune === CONTACT_COMMUNE_OTHER && (
                        <div style={{ marginTop: "12px" }}>
                          <InputField
                            label="Précisez votre commune *"
                            name="communeOther"
                            value={formData.communeOther}
                            onChange={handleChange}
                            placeholder="Ex. : Braine-le-Comte, Chièvres…"
                          />
                        </div>
                      )}

                      <motion.div style={{ marginTop: "12px" }}>
                        <InputField
                          label="Adresse ou précision (facultatif)"
                          name="addressDetail"
                          value={formData.addressDetail}
                          onChange={handleChange}
                          placeholder="Rue, numéro, type de bâtiment, étage…"
                        />
                      </motion.div>

                      <p style={{ fontSize: "12px", color: "#64748b", margin: "12px 0 0", lineHeight: 1.5 }}>
                        {INTERVENTION_OUT_OF_ZONE_NOTE}{" "}
                        <Link href="/zones" className="info-link" style={{ color: "#2563eb", fontWeight: 600 }}>
                          Voir nos zones
                        </Link>
                      </p>
                    </motion.div>

                    {/* Service */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label
                        htmlFor="select-service"
                        style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
                      >
                        Service souhaité
                      </label>
                      <select
                        id="select-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="form-input"
                        style={{
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: "2px solid #e2e8f0",
                          fontSize: "14px",
                          color: formData.service ? "#0f172a" : "#94a3b8",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          cursor: "pointer",
                          transition: "border-color 0.2s",
                        }}
                      >
                        <option value="">Sélectionnez un service...</option>
                        {SERVICES_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label
                        htmlFor="field-message"
                        style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
                      >
                        Message *
                      </label>
                      <textarea
                        id="field-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type de local, superficie, fréquence souhaitée, délai…"
                        rows={5}
                        className="form-input"
                        style={{
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: "2px solid #e2e8f0",
                          fontSize: "14px",
                          color: "#0f172a",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          transition: "border-color 0.2s",
                        }}
                      />
                    </div>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border: `2px solid ${confirmRgpd ? "#bfdbfe" : "#e2e8f0"}`,
                        backgroundColor: confirmRgpd ? "#f0f9ff" : "#FFFFFF",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: "#334155",
                        lineHeight: 1.6,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={confirmRgpd}
                        onChange={(e) => setConfirmRgpd(e.target.checked)}
                        className="form-checkbox"
                        style={{
                          width: "18px",
                          height: "18px",
                          marginTop: "2px",
                          flexShrink: 0,
                          accentColor: "#2563eb",
                          cursor: "pointer",
                        }}
                      />
                      <span>
                        J&apos;accepte que mes données personnelles soient utilisées par Makclean
                        pour traiter ma demande de devis, conformément à la{" "}
                        <Link
                          href="/confidentialite"
                          style={{ color: "#2563eb", fontWeight: 600, textDecoration: "underline" }}
                        >
                          politique de confidentialité
                        </Link>
                        . *
                      </span>
                    </label>

                    {/* Erreur */}
                    {error && (
                      <p
                        role="alert"
                        style={{
                          fontSize: "13px",
                          color: "#dc2626",
                          backgroundColor: "#fef2f2",
                          border: "1px solid #fecaca",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          margin: 0,
                        }}
                      >
                        {error}
                      </p>
                    )}

                    {/* Submit — délai de réponse rappelé sous le libellé du bouton */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={loading || !isValid}
                      className="submit-btn"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                        padding: "14px 32px",
                        borderRadius: "999px",
                        border: "none",
                        backgroundColor: !isValid ? "#94a3b8" : "#1d4ed8",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "16px",
                        cursor: !isValid ? "not-allowed" : "pointer",
                        boxShadow: "0 8px 24px rgba(29,78,216,0.3)",
                        transition: "background-color 0.3s",
                      }}
                      whileHover={isValid ? { scale: 1.02 } : {}}
                      whileTap={isValid ? { scale: 0.97 } : {}}
                    >
                      {loading ? (
                        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <motion.div
                            style={{
                              width: "18px",
                              height: "18px",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#FFFFFF",
                              borderRadius: "50%",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Envoi en cours...
                        </span>
                      ) : (
                        <>
                          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Send style={{ width: "18px", height: "18px" }} />
                            Envoyer ma demande
                          </span>
                          {/* Rappel du délai de réponse directement dans le bouton */}
                          <span style={{ fontSize: "11px", fontWeight: 500, opacity: 0.85 }}>
                            Réponse sous 24h · Sans engagement
                          </span>
                        </>
                      )}
                    </motion.button>

                    <p style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
                      🔒 Vos données sont confidentielles et ne seront jamais partagées.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </PageWrapper>

      <style jsx global>{`
        .contact-grid { grid-template-columns: 1fr 1.6fr; }
        .form-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        .form-input:focus-visible {
          outline: none;
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }
        .form-checkbox:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 2px;
        }
        .submit-btn:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
        .info-link:focus-visible,
        .urgence-link:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}

/* ── Composant InputField ── */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  const id = `field-${name}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label htmlFor={id} style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
        {label}
        {hint && (
          <span style={{ fontWeight: 400, color: "#94a3b8", marginLeft: "6px", fontSize: "12px" }}>
            — {hint}
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          border: "2px solid #e2e8f0",
          fontSize: "14px",
          color: "#0f172a",
          backgroundColor: "#FFFFFF",
          outline: "none",
          transition: "border-color 0.2s",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

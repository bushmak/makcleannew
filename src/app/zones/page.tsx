import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";
import MapClient from "./MapClient";
import {
  INTERVENTION_BASE_CITY,
  INTERVENTION_CITIES,
  INTERVENTION_OUT_OF_ZONE_NOTE,
  INTERVENTION_OUT_OF_ZONE_SHORT,
  ZONES_COMMUNES,
} from "@/lib/intervention-area";
import type { Metadata } from "next";
import "./zones.css";

export const metadata: Metadata = {
  title: "Zones d’intervention — Makclean | Nettoyage professionnel à Tournai et dans le Hainaut",
  description:
    "Découvrez les zones d’intervention de Makclean : nettoyage professionnel à Tournai, Frasnes-lez-Anvaing, Ath, Celles, Renaix et dans tout le Hainaut. Carte interactive et liste des communes desservies.",
  openGraph: {
    title: "Zones d’intervention — Makclean",
    description:
      "Makclean intervient à Tournai, Frasnes, Ath, Celles, Renaix et dans tout le Hainaut. Consultez la carte et la liste des communes desservies.",
    url: "https://www.makclean.be/zones",
    type: "website",
  },
};

export default function ZonesPage() {
  return (
    <>
      <p className="sr-only">
        {`Carte et communes desservies par Makclean, entreprise de nettoyage à ${INTERVENTION_BASE_CITY} : ${INTERVENTION_CITIES}.`}
      </p>

      <Navbar />
      <PageWrapper>
        <PageHero
          title="Zones d'intervention"
          highlight="intervention"
          subtitle="Où nous intervenons — carte et communes principales."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Zones" },
          ]}
        />

        <section
          aria-label="Zones d'intervention Makclean en région de Tournai et du Hainaut"
          style={{ backgroundColor: "#f8fafc", padding: "48px 0 56px" }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            <div className="zones-grid">
              {/* Carte */}
              <div>
                <div
                  aria-label="Carte des zones d'intervention Makclean à Tournai et dans le Hainaut"
                  style={{
                    height: "400px",
                    minHeight: "400px",
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <MapClient />
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    textAlign: "center",
                    marginTop: "6px",
                  }}
                >
                  © OpenStreetMap — Zone indicative · siège à {INTERVENTION_BASE_CITY}
                </p>
              </div>

              {/* Communes */}
              <aside
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "22px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  border: "1px solid #f1f5f9",
                }}
              >
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <MapPin
                    style={{
                      width: "15px",
                      height: "15px",
                      color: "#2563eb",
                    }}
                    aria-hidden="true"
                  />
                  Communes principales
                </h2>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginBottom: "14px",
                    lineHeight: 1.5,
                  }}
                >
                  Liste non exhaustive.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  {ZONES_COMMUNES.map((name) => (
                    <span
                      key={name}
                      aria-label={`Nettoyage professionnel : ${name}`}
                      style={{
                        fontSize: "12px",
                        fontWeight: name === INTERVENTION_BASE_CITY ? 700 : 500,
                        color: name === INTERVENTION_BASE_CITY ? "#1d4ed8" : "#475569",
                        backgroundColor: name === INTERVENTION_BASE_CITY ? "#eff6ff" : "#f8fafc",
                        border:
                          name === INTERVENTION_BASE_CITY
                            ? "1px solid #bfdbfe"
                            : "1px solid #e2e8f0",
                        padding: "5px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {name === INTERVENTION_BASE_CITY ? `${name} · Siège` : name}
                    </span>
                  ))}
                </div>

                {/* Hors zone */}
                <div
                  style={{
                    marginBottom: "16px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    backgroundColor: "#fffbeb",
                    border: "1px solid #fde68a",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#92400e",
                      margin: "0 0 4px",
                    }}
                  >
                    {INTERVENTION_OUT_OF_ZONE_SHORT}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#78350f",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {INTERVENTION_OUT_OF_ZONE_NOTE}{" "}
                    <Link
                      href="/contact"
                      title="Demander un devis de nettoyage"
                      style={{ color: "#1d4ed8", fontWeight: 600 }}
                    >
                      Contactez-nous
                    </Link>{" "}
                    pour un devis.
                  </p>
                </div>

                {/* CTA */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Link
                    href="/contact"
                    title="Devis gratuit nettoyage Tournai et Hainaut"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "11px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      Demander un devis
                      <ArrowRight aria-hidden="true" style={{ width: "14px", height: "14px" }} />
                    </div>
                  </Link>

                  <Link
                    href="/services"
                    title="Prestations de nettoyage professionnel"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        color: "#475569",
                        fontWeight: 600,
                        fontSize: "13px",
                      }}
                    >
                      Voir nos prestations
                    </div>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

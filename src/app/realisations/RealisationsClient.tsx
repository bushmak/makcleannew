"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, MapPin } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";
import Button from "@/components/ui/Button";
import type { Realisation } from "@/lib/realisations";

const ALL_CATEGORY = "Tous";

export default function RealisationsClient({ photos }: { photos: Realisation[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const photo of photos) {
      if (photo.category?.trim()) set.add(photo.category.trim());
    }
    return [ALL_CATEGORY, ...Array.from(set).sort((a, b) => a.localeCompare(b, "fr"))];
  }, [photos]);

  const filtered = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return photos;
    return photos.filter((p) => p.category?.trim() === activeCategory);
  }, [photos, activeCategory]);

  const closeLightbox = useCallback(() => setSelected(null), []);
  const goPrev = useCallback(() => {
    setSelected((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);
  const goNext = useCallback(() => {
    setSelected((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i));
  }, [filtered.length]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    setSelected(null);
  }, [activeCategory]);

  return (
    <>
      <p className="sr-only">
        Galerie avant / après de l’entreprise de nettoyage Makclean : interventions professionnelles
        à Tournai, Ath, Celles, Frasnes et dans tout le Hainaut.
      </p>

      <Navbar />
      <PageWrapper>
        <PageHero
          title="Nos "
          highlight="réalisations"
          subtitle="Avant / après sur de vrais chantiers Makclean, pour vous donner une idée du résultat."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Réalisations" },
          ]}
        />

        <section style={{ backgroundColor: "#f8fafc", padding: "48px 0 56px" }}>
          <motion.div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Intro */}
            <motion.div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: "620px",
                }}
              >
                Cliquez sur une photo pour l&apos;agrandir. Chaque projet reflète notre niveau de
                finition sur place.
              </p>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#1d4ed8",
                  backgroundColor: "#eff6ff",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid #bfdbfe",
                  boxShadow: "0 6px 18px rgba(37,99,235,0.18)",
                }}
              >
                {filtered.length} photo{filtered.length > 1 ? "s" : ""}
              </span>
            </motion.div>

            {/* Filtres */}
            {categories.length > 1 && (
              <motion.div
                role="tablist"
                aria-label="Filtrer par type de chantier"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "28px",
                }}
              >
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        fontSize: "13px",
                        fontWeight: active ? 700 : 600,
                        padding: "8px 16px",
                        borderRadius: "999px",
                        cursor: "pointer",
                        border: active ? "1px solid #2563eb" : "1px solid #e2e8f0",
                        backgroundColor: active ? "#2563eb" : "#FFFFFF",
                        color: active ? "#FFFFFF" : "#475569",
                        boxShadow: active
                          ? "0 8px 24px rgba(37,99,235,0.25)"
                          : "0 2px 8px rgba(15,23,42,0.04)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Grille */}
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
              className="gallery-grid"
            >
              {filtered.map((photo, i) => (
                <motion.article
                  key={photo.id}
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "260px",
                    cursor: "zoom-in",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#e2e8f0",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.24) }}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(15,23,42,0.18)" }}
                  onClick={() => setSelected(i)}
                >
                  <h3 className="sr-only">{photo.title}</h3>

                  <Image
                    src={photo.src}
                    alt={`Réalisation Makclean — ${photo.title}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {photo.category && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 2,
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#1d4ed8",
                        backgroundColor: "rgba(255,255,255,0.96)",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        boxShadow: "0 4px 14px rgba(15,23,42,0.18)",
                      }}
                    >
                      {photo.category}
                    </span>
                  )}

                  <motion.div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at center, rgba(37,99,235,0.55), rgba(15,23,42,0.9))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 30px rgba(15,23,42,0.35)",
                      }}
                    >
                      <ZoomIn style={{ width: "20px", height: "20px", color: "#1d4ed8" }} />
                    </div>
                  </motion.div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "14px",
                      zIndex: 2,
                      background: "linear-gradient(to top, rgba(15,23,42,0.95), transparent)",
                    }}
                  >
                    <p
                      style={{
                        color: "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {photo.title}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.78)",
                        fontSize: "11px",
                        margin: "4px 0 0",
                      }}
                    >
                      {photo.caption}
                    </p>
                    {photo.location && (
                      <p
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "11px",
                          margin: "4px 0 0",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin style={{ width: "11px", height: "11px" }} />
                        {photo.location}
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* CTA bas */}
            <motion.div
              style={{
                marginTop: "60px",
                padding: "32px 36px",
                borderRadius: "20px",
                backgroundColor: "#2563eb",
                backgroundImage: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "#FFFFFF",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                boxShadow: "0 12px 32px rgba(37,99,235,0.25)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <p style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px" }}>
                  Un projet similaire ?
                </p>
                <p style={{ fontSize: "15px", color: "#e0edff", margin: 0 }}>
                  Devis gratuit sous 24 h — sans engagement.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <Button href="/contact" size="md" icon="right" variant="secondary">
                  Devis gratuit
                </Button>

                <Button
                  href="/services"
                  size="md"
                  variant="ghost"
                  icon={false}
                  className="text-white hover:text-white/90 border-white/40 hover:bg-white/10"
                >
                  Voir nos prestations
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && filtered[selected] && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Photo : ${filtered[selected].title}`}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.93)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "960px",
                  aspectRatio: "4/3",
                  maxHeight: "min(85vh, 720px)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filtered[selected].src}
                  alt={filtered[selected].title}
                  fill
                  style={{ objectFit: "contain", backgroundColor: "#020617" }}
                  sizes="960px"
                  priority
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 24px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  }}
                >
                  <p style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700, margin: 0 }}>
                    {filtered[selected].title}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      fontSize: "14px",
                      margin: "4px 0 0",
                    }}
                  >
                    {filtered[selected].caption}
                    {filtered[selected].location ? ` · ${filtered[selected].location}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Fermer"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(148,163,184,0.6)",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                  }}
                  onClick={closeLightbox}
                >
                  <X style={{ width: "20px", height: "20px" }} />
                </button>

                {selected > 0 && (
                  <button
                    type="button"
                    aria-label="Photo précédente"
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(148,163,184,0.6)",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                  >
                    ‹
                  </button>
                )}

                {selected < filtered.length - 1 && (
                  <button
                    type="button"
                    aria-label="Photo suivante"
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(148,163,184,0.6)",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                  >
                    ›
                  </button>
                )}

                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(15,23,42,0.85)",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "1px solid rgba(148,163,184,0.6)",
                  }}
                >
                  {selected + 1} / {filtered.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageWrapper>

      <style jsx global>{`
        .gallery-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [autoplay, next]);

const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeInOut" as const } },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0, scale: 0.95, transition: { duration: 0.35, ease: "easeInOut" as const } }),
  };

  return (
    <section
      id="testimonials"
      aria-label="Avis clients Makclean — témoignages vérifiés"
      style={{
        background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #eff6ff 100%)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SEO invisible */}
      <p className="sr-only">Avis et retours clients sur Makclean</p>
      <p className="sr-only">
        Témoignages issus de différents projets. Note moyenne et satisfaction font l’objet d’un suivi interne continu.
      </p>

      {/* Schema.org Review + ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: TESTIMONIALS.map((t, i) => ({
              "@type": "Review",
              position: i + 1,
              author: { "@type": "Person", name: t.name },
              reviewBody: t.content,
              reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
            })),
          }),
        }}
      />

      {/* Déco fond */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "-60px", left: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "-60px", right: "-60px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Grande quote décorative */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "40px", left: "50%",
          transform: "translateX(-50%)",
          fontSize: "300px", color: "rgba(59,130,246,0.04)",
          fontFamily: "Georgia, serif", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
        }}
      >
        "
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <SectionTitle
          badge="Témoignages"
          title="Ce que disent nos clients"
          highlight="nos clients"
          subtitle="La satisfaction de nos clients est notre priorité. Découvrez leurs retours sur nos interventions dans leurs bureaux, commerces et habitations."
          align="center"
        />

        <motion.div
          style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "22px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
            <div style={{ position: "relative", minHeight: "390px", overflow: "hidden" }}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.article
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "28px",
                    padding: "44px",
                    boxShadow: "0 20px 80px rgba(29,78,216,0.12)",
                    border: "1px solid rgba(59,130,246,0.12)",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "390px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                      background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginBottom: "28px" }}>
                    <div>
                      <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }} aria-label={`Note : ${TESTIMONIALS[current].rating} étoiles sur 5`}>
                        {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                          <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                            <Star aria-hidden="true" style={{ width: "18px", height: "18px", color: "#fbbf24", fill: "#fbbf24" }} />
                          </motion.span>
                        ))}
                      </div>
                      <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 700 }}>Avis vérifié</span>
                    </div>

                    <div
                      aria-hidden="true"
                      style={{
                        width: "48px", height: "48px", borderRadius: "14px",
                        backgroundColor: "#eff6ff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Quote style={{ width: "22px", height: "22px", color: "#2563eb" }} />
                    </div>
                  </div>

                  <p style={{ fontSize: "17px", color: "#334155", lineHeight: 1.85, fontStyle: "italic", margin: 0, flex: 1 }}>
                    "{TESTIMONIALS[current].content}"
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px", borderTop: "1px solid #f1f5f9", paddingTop: "24px", marginTop: "30px" }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: "52px", height: "52px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#FFFFFF", fontSize: "18px", fontWeight: 800,
                        flexShrink: 0, boxShadow: "0 4px 16px rgba(29,78,216,0.3)",
                      }}
                    >
                      {TESTIMONIALS[current].name.charAt(0)}
                    </div>

                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>{TESTIMONIALS[current].name}</div>
                      <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Client Makclean</div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <motion.button
                onClick={() => { prev(); setAutoplay(false); }}
                aria-label="Voir le témoignage précédent"
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "2px solid #e2e8f0", backgroundColor: "#FFFFFF",
                  color: "#475569", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                whileHover={{ borderColor: "#2563eb", color: "#2563eb", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft aria-hidden="true" style={{ width: "20px", height: "20px" }} />
              </motion.button>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {TESTIMONIALS.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); setAutoplay(false); }}
                    aria-label={`Voir le témoignage numéro ${i + 1}`}
                    aria-current={i === current ? "true" : undefined}
                    style={{
                      width: i === current ? "28px" : "8px", height: "8px",
                      borderRadius: "999px", border: "none",
                      backgroundColor: i === current ? "#2563eb" : "#cbd5e1",
                      cursor: "pointer", transition: "all 0.3s ease", padding: 0,
                    }}
                    whileHover={{ backgroundColor: "#2563eb" }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => { next(); setAutoplay(false); }}
                aria-label="Voir le témoignage suivant"
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "2px solid #e2e8f0", backgroundColor: "#FFFFFF",
                  color: "#475569", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                whileHover={{ borderColor: "#2563eb", color: "#2563eb", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight aria-hidden="true" style={{ width: "20px", height: "20px" }} />
              </motion.button>
            </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              href="https://g.page/r/CfvHh2zsRjueEAE/review"
              variant="secondary"
              size="md"
              icon="right"
              className="min-w-[230px]"
            >
              Laisser un avis Google
            </Button>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          #testimonials article { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Star, Users, ChevronDown } from "lucide-react";
import { STATS } from "@/lib/data";
import { HERO_TAGLINE } from "@/lib/intervention-area";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";

const WORDS = ["Résidentiel", "Commercial", "Industriel", "Après Chantier", "Particulier"];

/* ── Bulle individuelle ── */
function Bubble({
  size,
  x,
  delay,
  duration,
  repeatDelay,
}: {
  size: number;
  x: number;
  delay: number;
  duration: number;
  repeatDelay: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: "-80px",
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(186,230,255,0.3))`,
        border: "1.5px solid rgba(147,210,255,0.5)",
        boxShadow: "inset 0 0 8px rgba(255,255,255,0.6), 0 0 6px rgba(96,165,250,0.2)",
        backdropFilter: "blur(2px)",
        zIndex: 1,
      }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: [0, -700, -900],
        opacity: [0, 0.85, 0],
        scale: [0.5, 1, 1.1],
        x: [0, Math.sin(delay) * 30, Math.cos(delay) * 20],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
        repeatDelay,
      }}
    />
  );
}

/* ── Goutte individuelle ── */
function Drop({
  x,
  delay,
  duration,
  size,
  repeatDelay,
}: {
  x: number;
  delay: number;
  duration: number;
  size: number;
  repeatDelay: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "-40px",
        left: `${x}%`,
        width: `${size}px`,
        height: `${size * 1.4}px`,
        borderRadius: "50% 50% 60% 60% / 40% 40% 60% 60%",
        background: "linear-gradient(160deg, rgba(186,230,255,0.9) 0%, rgba(96,165,250,0.5) 100%)",
        border: "1px solid rgba(147,197,253,0.6)",
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.7)",
        zIndex: 1,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, 600, 900],
        opacity: [0, 0.7, 0],
        scaleX: [1, 0.95, 1.05],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeIn",
        repeatDelay,
      }}
    />
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [enableBackgroundAnim, setEnableBackgroundAnim] = useState(false);

  /* ── Typewriter ── */
  useEffect(() => {
    const current = WORDS[wordIndex];
    const speed = isDeleting ? 60 : 100;

    if (!isDeleting && displayText === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, wordIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setEnableBackgroundAnim(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        size: 10 + Math.floor(((i * 17 + 13) % 5) * 14),
        x: (i * 3.7 + 2) % 98,
        delay: (i * 0.41) % 5,
        duration: 5 + ((i * 0.7) % 5),
        repeatDelay: ((i * 41 + 13) % 20) / 10,
      })),
    []
  );

  const drops = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: 5 + Math.floor(((i * 11 + 7) % 4) * 5),
        x: (i * 4.6 + 1) % 97,
        delay: (i * 0.6 + 0.3) % 6,
        duration: 2.5 + ((i * 0.4) % 3),
        repeatDelay: ((i * 31 + 5) % 30) / 10,
      })),
    []
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 30%, #bae6fd 60%, #dbeafe 100%)",
      }}
    >
      {/* ── Fond : cercles flous ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,210,255,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(186,230,255,0.3) 0%, transparent 70%)",
          }}
        />
        <svg
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: 0.3 }}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="rgba(59,130,246,0.15)"
          />
          <path
            d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,70 1440,80 L1440,120 L0,120 Z"
            fill="rgba(96,165,250,0.1)"
          />
        </svg>
      </div>

      {/* ── Bulles / gouttes ── */}
      {enableBackgroundAnim && (
        <>
          {bubbles.map((b) => (
            <Bubble key={b.id} size={b.size} x={b.x} delay={b.delay} duration={b.duration} repeatDelay={b.repeatDelay} />
          ))}
          {drops.map((d) => (
            <Drop key={d.id} x={d.x} delay={d.delay} duration={d.duration} size={d.size} repeatDelay={d.repeatDelay} />
          ))}
        </>
      )}

      {/* ── Contenu principal ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "120px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "24px",
        }}
      >
        {/* Badge */}
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "999px",
            backgroundColor: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(96,165,250,0.4)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(96,165,250,0.15)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Star aria-hidden="true" style={{ width: "14px", height: "14px", color: "#f59e0b", fill: "#f59e0b" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e40af", letterSpacing: "0.5px" }}>
            Nettoyage Professionnel Certifié
          </span>
          <span
            style={{
              padding: "2px 10px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #2563eb, #38bdf8)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Tournai · Hainaut
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ position: "relative" }}
        >
          {/* H1 SEO — indexé par Google, lu par les lecteurs d'écran */}
          <h1
            id="hero-heading"
            className="sr-only"
          >
            Makclean — Entreprise de nettoyage professionnel à Tournai et dans le Hainaut
          </h1>

          {/* Slogan visuel — purement décoratif, masqué aux lecteurs d'écran */}
          <p
            aria-hidden="true"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              margin: 0,
              color: "#0f172a",
            }}
          >
            La propreté,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                WebkitTextStroke: "0.01px transparent",
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              notre expertise
            </span>
          </p>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          aria-live="polite"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(96,165,250,0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 24px rgba(96,165,250,0.12)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span style={{ color: "#64748b", fontSize: "16px", fontWeight: 500 }}>Nettoyage</span>
          <span className="sr-only">
            Types de missions : résidentiel, commercial, industriel, après chantier, particuliers
          </span>
          <span
            aria-hidden="true"
            style={{
              color: "#2563eb",
              fontSize: "18px",
              fontWeight: 700,
              minWidth: "200px",
              textAlign: "left",
            }}
          >
            {displayText}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "22px",
                background: "linear-gradient(180deg, #2563eb, #38bdf8)",
                marginLeft: "3px",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </span>
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "#475569",
            maxWidth: "580px",
            lineHeight: 1.7,
            margin: 0,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {HERO_TAGLINE}
        </motion.p>

        {/* Badges confiance */}
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              icon: <Shield aria-hidden="true" style={{ width: "14px", height: "14px", color: "#2563eb" }} />,
              text: "Assurance RC Pro",
            },
            {
              icon: <Star aria-hidden="true" style={{ width: "14px", height: "14px", fill: "#f59e0b", color: "#f59e0b" }} />,
              text: "98 % de satisfaction",
            },
            {
              icon: <Users aria-hidden="true" style={{ width: "14px", height: "14px", color: "#2563eb" }} />,
              text: "Intervention rapide",
            },
          ].map((badge, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(96,165,250,0.3)",
                backdropFilter: "blur(8px)",
                color: "#1e293b",
                fontSize: "13px",
                fontWeight: 600,
                boxShadow: "0 2px 10px rgba(96,165,250,0.1)",
              }}
            >
              {badge.icon}
              {badge.text}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            justifyContent: "center",
            marginTop: "8px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            href="/contact"
            size="lg"
            icon="right"
            aria-label="Demander un devis de nettoyage gratuit et rapide"
          >
            Devis gratuit & rapide
          </Button>

          <Button
            href="/realisations"
            variant="secondary"
            size="lg"
            icon="right"
            aria-label="Voir les réalisations de Makclean en nettoyage professionnel"
          >
            Voir nos réalisations
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            width: "100%",
            maxWidth: "700px",
            marginTop: "16px",
            backgroundColor: "rgba(96,165,250,0.15)",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(96,165,250,0.25)",
            boxShadow: "0 8px 40px rgba(96,165,250,0.15)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {STATS.map((stat, i) => {
            const match = stat.value.match(/^([\d.]+)(.*)$/);
            const num = match ? parseFloat(match[1]) : 0;
            const suffix = match ? match[2] : "";

            return (
              <div
                key={i}
                style={{
                  padding: "20px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 800,
                    color: "#1d4ed8",
                    lineHeight: 1,
                    width: "5ch",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  <CountUp end={num} suffix={suffix} duration={2000} />
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          zIndex: 10,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          style={{
            fontSize: "10px",
            color: "#64748b",
            fontWeight: 500,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Découvrir
        </span>
        <ChevronDown style={{ width: "18px", height: "18px", color: "#64748b" }} />
      </motion.div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

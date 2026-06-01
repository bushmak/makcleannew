"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import BrandName, { isBrandNameHighlight } from "@/components/ui/BrandName";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  breadcrumbs?: Breadcrumb[];
}

/* ── Bulle adaptée fond sombre ── */
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
        bottom: "-40px",
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15), rgba(96,165,250,0.05))",
        border: "1px solid rgba(96,165,250,0.25)",
        boxShadow: "inset 0 0 6px rgba(255,255,255,0.1)",
        backdropFilter: "blur(1px)",
        zIndex: 1,
        pointerEvents: "none",
      }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: [0, -400, -500],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1, 1.1],
        x: [0, Math.sin(delay) * 20, Math.cos(delay) * 15],
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

/* ── Goutte adaptée fond sombre ── */
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
        top: "-20px",
        left: `${x}%`,
        width: `${size}px`,
        height: `${size * 1.4}px`,
        borderRadius: "50% 50% 60% 60% / 40% 40% 60% 60%",
        background: "linear-gradient(160deg, rgba(96,165,250,0.3) 0%, rgba(29,78,216,0.1) 100%)",
        border: "1px solid rgba(96,165,250,0.2)",
        zIndex: 1,
        pointerEvents: "none",
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, 300, 400],
        opacity: [0, 0.6, 0],
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

export default function PageHero({
  title,
  highlight,
  subtitle,
  breadcrumbs = [],
}: PageHeroProps) {

  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: 8 + Math.floor(((i * 17 + 13) % 5) * 10),
        x: (i * 5.4 + 2) % 97,
        delay: (i * 0.45) % 5,
        duration: 4 + (i * 0.6 % 4),
        repeatDelay: ((i * 37 + 11) % 20) / 10,
      })),
    []
  );

  const drops = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: 4 + Math.floor(((i * 11 + 7) % 4) * 4),
        x: (i * 6.8 + 1) % 96,
        delay: (i * 0.5 + 0.3) % 5,
        duration: 2 + (i * 0.35 % 2.5),
        repeatDelay: ((i * 29 + 7) % 30) / 10,
      })),
    []
  );

  const renderTitle = () => {
    if (!highlight) return title;

    if (isBrandNameHighlight(highlight)) {
      const regex = new RegExp(highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      const parts = title.split(regex);
      return (
        <>
          {parts[0]}
          <BrandName variant="onDark" />
          {parts[1]}
        </>
      );
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span style={{
          background: "linear-gradient(135deg, #60a5fa, #93c5fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "rgba(0,0,0,0)",
          backgroundClip: "text",
        }}>
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#0f172a",
        padding: "80px 0 70px",
        overflow: "hidden",
      }}
    >
      {/* Fond */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
      }} />

      {/* Grille */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        pointerEvents: "none",
      }} />

      {/* Orbe */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-50%", left: "50%",
          transform: "translateX(-50%)",
          width: "600px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bulles */}
      {bubbles.map((b) => (
        <Bubble
          key={b.id}
          size={b.size}
          x={b.x}
          delay={b.delay}
          duration={b.duration}
          repeatDelay={b.repeatDelay}
        />
      ))}

      {/* Gouttes */}
      {drops.map((d) => (
        <Drop
          key={d.id}
          x={d.x}
          delay={d.delay}
          duration={d.duration}
          size={d.size}
          repeatDelay={d.repeatDelay}
        />
      ))}

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
      }}>

        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Fil d'Ariane"
            style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                color: "rgba(148,163,184,0.8)", textDecoration: "none",
                fontSize: "13px", fontWeight: 500,
              }}
            >
              <Home aria-hidden="true" style={{ width: "13px", height: "13px" }} />
              Accueil
            </Link>

            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <ChevronRight aria-hidden="true" style={{ width: "13px", height: "13px", color: "#475569" }} />
                {crumb.href ? (
                  <Link href={crumb.href} style={{ color: "rgba(148,163,184,0.8)", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: "#60a5fa", fontSize: "13px", fontWeight: 600 }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Titre */}
        <motion.h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, color: "#FFFFFF",
            lineHeight: 1.15, letterSpacing: "-1.5px", margin: 0,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {renderTitle()}
        </motion.h1>

        {/* Sous-titre */}
        {subtitle && (
          <motion.p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)", color: "#94a3b8",
              maxWidth: "600px", lineHeight: 1.7, margin: 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Ligne déco */}
        <motion.div
          aria-hidden="true"
          style={{ display: "flex", gap: "6px", alignItems: "center" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div style={{ height: "3px", width: "40px", borderRadius: "999px", backgroundColor: "#2563eb" }} />
          <div style={{ height: "3px", width: "20px", borderRadius: "999px", backgroundColor: "#60a5fa" }} />
          <div style={{ height: "3px", width: "10px", borderRadius: "999px", backgroundColor: "#93c5fd" }} />
        </motion.div>

      </div>
    </section>
  );
}

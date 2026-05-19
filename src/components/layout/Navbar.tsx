"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import Button from "@/components/ui/Button";
import BrandName from "@/components/ui/BrandName";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isScrolled = scrolled || !isHome;

  return (
    <>
      <motion.header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.4s ease",
          backgroundColor: isScrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0)",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 4px 30px rgba(30,64,175,0.08)" : "none",
          padding: isScrolled ? "12px 0" : "20px 0",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px",
        }}>

          {/* Logo */}
          <Link
            href="/"
            aria-label="Retour à l'accueil Makclean"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
            >
              <motion.div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src="/logo/logo.png"
                  alt="Logo Makclean — nettoyage professionnel à Tournai et dans le Hainaut"
                  width={120}
                  height={40}
                  style={{ height: "40px", width: "auto", objectFit: "contain", borderRadius: "10px" }}
                />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{
                  fontWeight: 800, fontSize: "22px", letterSpacing: "-0.5px",
                  transition: "color 0.3s ease",
                }}>
                  <BrandName />
                </span>
                <span style={{
                  fontSize: "9px", fontWeight: 600, letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  transition: "color 0.3s ease", marginTop: "2px",
                }}>
                  Nettoyage Pro
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Nav desktop */}
          <nav
            className="lg-nav"
            aria-label="Navigation principale"
            style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  style={{ textDecoration: "none" }}
                >
                  <motion.span
                    style={{
                      position: "relative", display: "block",
                      padding: "8px 16px", borderRadius: "999px",
                      fontSize: "14px", fontWeight: 500,
                      color: isActive ? "#2563eb" : "#475569",
                      transition: "color 0.2s ease", whiteSpace: "nowrap", cursor: "pointer",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.3 }}
                    whileHover={{ color: "#2563eb" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        style={{
                          position: "absolute", inset: 0,
                          backgroundColor: "#eff6ff", borderRadius: "999px", zIndex: 0,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* CTA desktop */}
          <div className="lg-cta" style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            <motion.a
              href="https://wa.me/32489125099"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter Makclean sur WhatsApp"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                fontSize: "13px", fontWeight: 600, textDecoration: "none",
                color: "#334155", whiteSpace: "nowrap",
                padding: "4px 8px", borderRadius: "999px",
                minWidth: "120px",
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                backgroundColor: "#dcfce7",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="#16a34a" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span>WhatsApp</span>
            </motion.a>
            <Button
              href="/contact"
              size="sm"
              icon="right"
              className="min-w-[120px]"
            >
              Devis gratuit
            </Button>
          </div>

          {/* Burger mobile */}
          <motion.button
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="burger-btn"
            style={{
              width: "42px", height: "42px", borderRadius: "12px",
              border: "none", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              backgroundColor: isScrolled ? "#f1f5f9" : "rgba(255,255,255,0.2)",
              color: "#334155",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X aria-hidden="true" style={{ width: "20px", height: "20px" }} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu aria-hidden="true" style={{ width: "20px", height: "20px" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.header>

      {/* Styles responsive */}
      <style jsx global>{`
        .lg-nav { display: none !important; }
        .lg-cta { display: none !important; }
        .burger-btn { display: flex !important; }
        @media (min-width: 1024px) {
          .lg-nav { display: flex !important; }
          .lg-cta { display: flex !important; }
          .burger-btn { display: none !important; }
        }
      `}</style>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              aria-hidden="true"
              style={{
                position: "fixed", inset: 0,
                backgroundColor: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)", zIndex: 40,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "300px",
                backgroundColor: "#FFFFFF", zIndex: 50,
                display: "flex", flexDirection: "column",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header drawer */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "24px", borderBottom: "1px solid #f1f5f9",
              }}>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  aria-label="Retour à l'accueil Makclean"
                  style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
                >
                  <motion.div
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src="/logo/logo.png"
                      alt="Logo Makclean"
                      style={{ height: "36px", width: "auto", objectFit: "contain", borderRadius: "10px" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                      <span style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.5px" }}>
                        <BrandName />
                      </span>
                      <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#94a3b8", marginTop: "2px" }}>
                        Nettoyage Pro
                      </span>
                    </div>
                  </motion.div>
                </Link>

                <button
                  aria-label="Fermer le menu"
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    border: "none", backgroundColor: "#f1f5f9", color: "#64748b",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <X aria-hidden="true" style={{ width: "18px", height: "18px" }} />
                </button>
              </div>

              {/* Links */}
              <nav aria-label="Menu mobile" style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      style={{ textDecoration: "none" }}
                    >
                      <motion.div
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "12px 16px", borderRadius: "12px", marginBottom: "4px",
                          fontWeight: 500, fontSize: "15px",
                          backgroundColor: isActive ? "#eff6ff" : "rgba(0,0,0,0)",
                          color: isActive ? "#1d4ed8" : "#475569",
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                      >
                        {isActive && (
                          <span aria-hidden="true" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2563eb", flexShrink: 0 }} />
                        )}
                        {link.label}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

{/* Footer drawer */}
              <div style={{ padding: "24px", borderTop: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: "12px" }}>
                <motion.a
                  href="https://wa.me/32489125099"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contacter Makclean sur WhatsApp (nouvelle fenêtre)"
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    fontSize: "14px", fontWeight: 600, textDecoration: "none",
                    color: "#FFFFFF",
                    padding: "14px", borderRadius: "14px",
                    backgroundColor: "#25d366",
                  }}
                  whileHover={{ backgroundColor: "#1fba58" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </motion.a>
                <Link href="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>
                  <motion.div
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "14px", borderRadius: "14px",
                      backgroundColor: "#1d4ed8", color: "#FFFFFF",
                      fontWeight: 700, fontSize: "15px",
                    }}
                    whileHover={{ backgroundColor: "#1e40af" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Devis gratuit
                  </motion.div>
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

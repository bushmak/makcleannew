"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Home, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/ui/PageWrapper";
import { CONTACT_DEVIS_SUCCESS_KEY } from "@/lib/contact-conversion";

export default function MerciDevisPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const ok = sessionStorage.getItem(CONTACT_DEVIS_SUCCESS_KEY);
      if (ok !== "1") return;
      sessionStorage.removeItem(CONTACT_DEVIS_SUCCESS_KEY);
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px 80px",
          }}
        >
          <motion.div
            style={{
              maxWidth: "520px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                backgroundColor: "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle style={{ width: "44px", height: "44px", color: "#16a34a" }} aria-hidden />
            </div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Merci pour votre demande
            </h1>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
              Nous avons bien reçu votre message. Notre équipe vous recontactera dans les{" "}
              <strong>24 h</strong> avec votre devis personnalisé.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  borderRadius: "999px",
                  backgroundColor: "#1d4ed8",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                <Home style={{ width: "18px", height: "18px" }} aria-hidden />
                Retour à l’accueil
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  borderRadius: "999px",
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                <Mail style={{ width: "18px", height: "18px" }} aria-hidden />
                Nouveau message
              </Link>
            </div>
          </motion.div>
        </section>
      </PageWrapper>
    </>
  );
}

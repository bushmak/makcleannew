"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import PageWrapper from "@/components/ui/PageWrapper";
import { FAQS, slugifyFaqCategory, type FaqQuestion } from "./faq-data";

const ALL_TOPICS = "";

function FaqAnswer({ item }: { item: FaqQuestion }) {
  return (
    <>
      <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, margin: 0 }}>
        {item.a}
      </p>
      {item.serviceHref && item.serviceLabel && (
        <p style={{ margin: "14px 0 0" }}>
          <Link
            href={item.serviceHref}
            style={{
              fontSize: "14px",
              color: "#1d4ed8",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {item.serviceLabel}
          </Link>
        </p>
      )}
    </>
  );
}

export default function FaqContent() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState(ALL_TOPICS);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return FAQS.map((category) => ({
      ...category,
      questions: category.questions.filter((item) => {
        const topicMatch = !activeTopic || category.category === activeTopic;
        if (!topicMatch) return false;
        if (!query) return true;
        return (
          item.q.toLowerCase().includes(query) ||
          item.a.toLowerCase().includes(query) ||
          category.category.toLowerCase().includes(query)
        );
      }),
    })).filter((category) => category.questions.length > 0);
  }, [search, activeTopic]);

  const toggle = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <p className="sr-only">
        Foire aux questions Makclean : devis, prestations, délais et zone d&apos;intervention.
      </p>

      <Navbar />
      <PageWrapper>
        <PageHero
          title="Questions fréquentes"
          highlight="fréquentes"
          subtitle="Devis, prestations, délais et zone d'intervention."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "FAQ" },
          ]}
        />

        <section
          aria-label="Foire aux questions Makclean"
          style={{ backgroundColor: "#f8fafc", padding: "48px 0 56px" }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "12px",
              marginBottom: "32px", alignItems: "flex-end",
            }}>
              <div style={{ flex: "1 1 220px", minWidth: "200px" }}>
                <label
                  htmlFor="faq-search"
                  style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}
                >
                  Rechercher
                </label>
                <div style={{ position: "relative" }}>
                  <Search
                    style={{
                      position: "absolute", left: "12px", top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px", height: "16px", color: "#94a3b8",
                    }}
                    aria-hidden="true"
                  />
                  <input
                    id="faq-search"
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setOpenItem(null);
                    }}
                    placeholder="Mot-clé, prestation, commune…"
                    style={{
                      width: "100%", padding: "10px 36px 10px 38px",
                      borderRadius: "8px", border: "1px solid #cbd5e1",
                      fontSize: "15px", color: "#0f172a", backgroundColor: "#FFFFFF",
                    }}
                  />
                  {search && (
                    <button
                      type="button"
                      aria-label="Effacer"
                      onClick={() => setSearch("")}
                      style={{
                        position: "absolute", right: "10px", top: "50%",
                        transform: "translateY(-50%)",
                        border: "none", background: "none", cursor: "pointer", color: "#64748b",
                      }}
                    >
                      <X style={{ width: "16px", height: "16px" }} />
                    </button>
                  )}
                </div>
              </div>

              <div style={{ flex: "0 1 220px", minWidth: "180px" }}>
                <label
                  htmlFor="faq-topic"
                  style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}
                >
                  Thème
                </label>
                <select
                  id="faq-topic"
                  value={activeTopic}
                  onChange={(e) => {
                    setActiveTopic(e.target.value);
                    setOpenItem(null);
                  }}
                  style={{
                    width: "100%", padding: "10px 12px",
                    borderRadius: "8px", border: "1px solid #cbd5e1",
                    fontSize: "15px", color: "#0f172a", backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="">Tous les thèmes</option>
                  {FAQS.map((c) => (
                    <option key={c.category} value={c.category}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredCategories.length === 0 ? (
              <div style={{ padding: "32px 0", borderTop: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "15px", color: "#64748b", margin: "0 0 12px" }}>
                  Aucune question ne correspond à votre recherche.
                </p>
                <Link href="/contact" style={{ fontSize: "15px", color: "#1d4ed8", textDecoration: "underline" }}>
                  Contactez-nous
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {filteredCategories.map((category) => {
                  const catId = slugifyFaqCategory(category.category);
                  return (
                    <section key={category.category} id={catId} aria-labelledby={`faq-cat-${catId}`}>
                      <h2
                        id={`faq-cat-${catId}`}
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#0f172a",
                          margin: "0 0 12px",
                          paddingBottom: "10px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        {category.category}
                      </h2>

                      <div style={{ borderTop: "1px solid #e2e8f0" }}>
                        {category.questions.map((item, qIndex) => {
                          const key = `${catId}-${qIndex}`;
                          const isOpen = openItem === key;

                          return (
                            <div key={key} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <button
                                type="button"
                                id={`faq-q-${key}`}
                                aria-expanded={isOpen}
                                aria-controls={`faq-a-${key}`}
                                onClick={() => toggle(key)}
                                style={{
                                  width: "100%", textAlign: "left",
                                  padding: "18px 0",
                                  display: "flex", alignItems: "flex-start",
                                  justifyContent: "space-between", gap: "16px",
                                  background: "none", border: "none", cursor: "pointer",
                                }}
                              >
                                <span style={{
                                  fontSize: "15px", fontWeight: 500, color: "#0f172a",
                                  lineHeight: 1.5,
                                }}>
                                  {item.q}
                                </span>
                                <ChevronDown
                                  style={{
                                    width: "18px", height: "18px", flexShrink: 0, marginTop: "2px",
                                    color: "#94a3b8",
                                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s ease",
                                  }}
                                  aria-hidden="true"
                                />
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    id={`faq-a-${key}`}
                                    role="region"
                                    aria-labelledby={`faq-q-${key}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <div style={{ padding: "0 0 20px" }}>
                                      <FaqAnswer item={item} />
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            <aside style={{
              marginTop: "48px", paddingTop: "32px",
              borderTop: "1px solid #e2e8f0",
            }}>
              <p style={{ fontSize: "15px", color: "#334155", lineHeight: 1.65, margin: "0 0 16px" }}>
                Vous ne trouvez pas ce que vous cherchez ? Écrivez-nous ou appelez le{" "}
                <a href="tel:+32489125099" style={{ color: "#0f172a", fontWeight: 600 }}>
                  +32 489 125 099
                </a>
                {" "}— nous répondons en général sous 24 h.
              </p>
              <p style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: "16px 24px" }}>
                <Link href="/contact" style={{ fontSize: "15px", color: "#1d4ed8", textDecoration: "underline" }}>
                  Demander un devis
                </Link>
                <Link href="/services" style={{ fontSize: "15px", color: "#475569", textDecoration: "underline" }}>
                  Nos prestations
                </Link>
                <Link href="/zones" style={{ fontSize: "15px", color: "#475569", textDecoration: "underline" }}>
                  Zone d&apos;intervention
                </Link>
              </p>
            </aside>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

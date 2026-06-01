import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/ui/PageWrapper";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <PageWrapper>
        <section
          style={{
            padding: "80px 24px",
            textAlign: "center",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "12px",
            }}
          >
            Oups… cette page n’existe pas.
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Il semble que vous ayez suivi un lien incorrect ou que la page ait été déplacée.
            Pas d’inquiétude — vous pouvez continuer votre visite.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Button href="/contact" size="md" icon="right" variant="primary">
              Devis gratuit
            </Button>

            <Button href="/" size="md" variant="ghost">
              Retour à l’accueil
            </Button>

            <Button href="/services" size="md" variant="secondary">
              Voir nos services
            </Button>
          </div>

          <p
            style={{
              marginTop: "40px",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Code d’erreur : 404
          </p>
        </section>
      </PageWrapper>
    </>
  );
}

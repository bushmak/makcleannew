"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Realisation } from "@/lib/realisations";

type FormState = {
  title: string;
  caption: string;
  location: string;
  category: string;
  image: File | null;
};

const initialForm: FormState = {
  title: "",
  caption: "",
  location: "",
  category: "",
  image: null,
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);

  const previewUrl = useMemo(() => {
    if (!form.image) return "";
    return URL.createObjectURL(form.image);
  }, [form.image]);

  const loadRealisations = useCallback(async () => {
    const res = await fetch("/api/admin/realisations", { cache: "no-store" });

    if (res.status === 401) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (!res.ok) {
      setMessage("Impossible de charger les réalisations.");
      setIsLoading(false);
      return;
    }

    const data = await res.json();
    setRealisations(data.realisations || []);
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRealisations();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadRealisations]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage(data?.error || "Connexion refusée.");
      return;
    }

    setPassword("");
    await loadRealisations();
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsAuthenticated(false);
    setRealisations([]);
  }

  async function handleAddRealisation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.image) {
      setMessage("Ajoute une image avant d'enregistrer.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    const uploadForm = new FormData();
    uploadForm.append("image", form.image);

    const uploadRes = await fetch("/api/admin/upload", {
      method: "POST",
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const data = await uploadRes.json().catch(() => null);
      setMessage(data?.error || "Upload impossible.");
      setIsSaving(false);
      return;
    }

    const { src } = await uploadRes.json();
    const createRes = await fetch("/api/admin/realisations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        src,
        title: form.title,
        caption: form.caption,
        location: form.location,
        category: form.category,
      }),
    });

    if (!createRes.ok) {
      const data = await createRes.json().catch(() => null);
      setMessage(data?.error || "Ajout impossible.");
      setIsSaving(false);
      return;
    }

    setForm(initialForm);
    setMessage("Réalisation ajoutée.");
    setIsSaving(false);
    await loadRealisations();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Supprimer cette réalisation ?")) return;

    const res = await fetch(`/api/admin/realisations?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setMessage("Suppression impossible.");
      return;
    }

    setRealisations((items) => items.filter((item) => item.id !== id));
    setMessage("Réalisation supprimée.");
  }

  if (isLoading) {
    return <AdminShell title="Administration">Chargement...</AdminShell>;
  }

  if (!isAuthenticated) {
    return (
      <AdminShell title="Connexion admin">
        <form onSubmit={handleLogin} className="admin-card admin-login">
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit">Se connecter</button>
          {message && <p className="admin-message">{message}</p>}
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Admin réalisations" action={<button onClick={handleLogout}>Déconnexion</button>}>
      <div className="admin-grid">
        <form onSubmit={handleAddRealisation} className="admin-card admin-form">
          <h2>Ajouter une réalisation</h2>
          <label>
            Image
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setForm((current) => ({ ...current, image: e.target.files?.[0] || null }))}
              required
            />
          </label>

          {previewUrl && (
            <div className="admin-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Prévisualisation" />
            </div>
          )}

          <label>
            Titre
            <input
              value={form.title}
              onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
              placeholder="Ex: Terrasse à Tournai"
              required
            />
          </label>

          <label>
            Description
            <input
              value={form.caption}
              onChange={(e) => setForm((current) => ({ ...current, caption: e.target.value }))}
              placeholder="Ex: Avant / après nettoyage"
              required
            />
          </label>

          <label>
            Lieu
            <input
              value={form.location}
              onChange={(e) => setForm((current) => ({ ...current, location: e.target.value }))}
              placeholder="Ex: Ath"
            />
          </label>

          <label>
            Catégorie
            <input
              value={form.category}
              onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
              placeholder="Ex: Vitres, extérieur, fin de bail..."
            />
          </label>

          <button type="submit" disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Ajouter"}
          </button>
          {message && <p className="admin-message">{message}</p>}
        </form>

        <section className="admin-card admin-list">
          <h2>Réalisations ({realisations.length})</h2>
          <div className="admin-items">
            {realisations.map((item) => (
              <article key={item.id} className="admin-item">
                <div className="admin-thumb">
                  <Image src={item.src} alt={item.title} fill sizes="96px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                  {(item.location || item.category) && (
                    <span>
                      {[item.location, item.category].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </div>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  Supprimer
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function AdminShell({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p>MakClean</p>
          <h1>{title}</h1>
        </div>
        {action}
      </header>
      {children}
      <style jsx global>{`
        body {
          background: #f8fafc;
        }
        .admin-page {
          min-height: 100vh;
          padding: 40px 24px;
          color: #0f172a;
          font-family: Inter, system-ui, sans-serif;
        }
        .admin-header {
          max-width: 1180px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .admin-header p {
          margin: 0 0 6px;
          color: #2563eb;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 12px;
        }
        .admin-header h1 {
          margin: 0;
          font-size: clamp(28px, 4vw, 44px);
        }
        .admin-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(320px, 420px) 1fr;
          gap: 24px;
          align-items: start;
        }
        .admin-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
          padding: 24px;
        }
        .admin-login {
          max-width: 420px;
          margin: 0 auto;
        }
        .admin-card h2 {
          margin: 0 0 20px;
          font-size: 20px;
        }
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .admin-card label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }
        .admin-card input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          padding: 12px 14px;
          font: inherit;
          color: #0f172a;
        }
        .admin-card button,
        .admin-header button {
          border: 0;
          border-radius: 999px;
          background: #1d4ed8;
          color: #ffffff;
          padding: 12px 20px;
          font-weight: 800;
          cursor: pointer;
        }
        .admin-card button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .admin-message {
          margin: 0;
          color: #1d4ed8;
          font-weight: 700;
          font-size: 14px;
        }
        .admin-preview {
          position: relative;
          height: 180px;
          border-radius: 18px;
          overflow: hidden;
          background: #e2e8f0;
        }
        .admin-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .admin-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .admin-item {
          display: grid;
          grid-template-columns: 96px 1fr auto;
          gap: 14px;
          align-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 12px;
        }
        .admin-thumb {
          position: relative;
          width: 96px;
          height: 72px;
          overflow: hidden;
          border-radius: 12px;
          background: #e2e8f0;
        }
        .admin-item h3 {
          margin: 0 0 4px;
          font-size: 15px;
        }
        .admin-item p {
          margin: 0 0 4px;
          color: #64748b;
          font-size: 13px;
        }
        .admin-item span {
          color: #2563eb;
          font-size: 12px;
          font-weight: 800;
        }
        .admin-item button {
          background: #fee2e2;
          color: #991b1b;
        }
        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }
          .admin-item {
            grid-template-columns: 80px 1fr;
          }
          .admin-item button {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </main>
  );
}

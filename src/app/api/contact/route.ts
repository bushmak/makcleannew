import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Rate limiting simple en mémoire ──
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const transporterNoreply = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_NOREPLY_USER,
    pass: process.env.SMTP_NOREPLY_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    // ── Rate limiting ──
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Trop de demandes. Réessayez dans 1h." }, { status: 429 });
    }

    const {
      name,
      email,
      phone,
      service,
      message,
      location,
      addressDetail,
      commune,
      communeOther,
      honeypot,
      humanConfirm,
      rgpdConsent,
      submittedAt,
    } = await req.json();

    const consentGiven = Boolean(humanConfirm || rgpdConsent);

    // ── Honeypot ──
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    // ── Soumission trop rapide = bot ──
    if (Date.now() - submittedAt < 2000) {
      return NextResponse.json(
        { error: "Merci de vérifier votre message avant d'envoyer." },
        { status: 400 },
      );
    }

    if (!consentGiven) {
      return NextResponse.json(
        { error: "Merci d'accepter la politique de confidentialité avant d'envoyer." },
        { status: 400 },
      );
    }

    // ── Validation champs ──
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    if (!commune) {
      return NextResponse.json({ error: "Commune ou localité requise." }, { status: 400 });
    }
    if (commune === "autre" && !communeOther?.trim()) {
      return NextResponse.json({ error: "Précisez votre commune." }, { status: 400 });
    }

    const locationLabel =
      location?.trim() ||
      (commune === "autre"
        ? communeOther
        : commune === "hors-zone"
          ? "Hors zone / à confirmer"
          : commune);

    const addressLine = addressDetail?.trim()
      ? `<tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; font-weight: bold; color: #64748b;">📍 Adresse</td>
                <td style="padding: 12px 0; color: #0f172a;">${addressDetail}</td>
              </tr>`
      : "";

    // ── Email 1 : notification à Makclean ──
    await transporter.sendMail({
      from: `"Makclean Site" <${process.env.SMTP_USER}>`,
      to: "info@makclean.be",
      replyTo: email,
      subject: `📩 Nouveau devis — ${locationLabel} — ${service || "Non précisé"} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">📋 Nouvelle demande de devis</h1>
            <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Reçu le ${new Date().toLocaleString("fr-BE")}</p>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; font-weight: bold; color: #64748b; width: 140px;">👤 Nom</td>
                <td style="padding: 12px 0; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; font-weight: bold; color: #64748b;">✉️ Email</td>
                <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; font-weight: bold; color: #64748b;">📞 Téléphone</td>
                <td style="padding: 12px 0; color: #0f172a;">${phone || "Non renseigné"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 0; font-weight: bold; color: #64748b;">📍 Commune</td>
                <td style="padding: 12px 0; color: #0f172a; font-weight: 600;">${locationLabel}</td>
              </tr>
              ${addressLine}
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #64748b;">🧹 Service</td>
                <td style="padding: 12px 0; color: #0f172a;">${service || "Non précisé"}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="font-weight: bold; color: #64748b; margin: 0 0 10px;">💬 Message</p>
              <p style="color: #0f172a; line-height: 1.7; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; padding: 14px 32px; background: #2563eb; color: white; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 15px;">
                Répondre à ${name}
              </a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">IP: ${ip} · Envoyé le ${new Date().toLocaleString("fr-BE")}</p>
          </div>
        </div>
      `,
    });

    // ── Email 2 : accusé de réception au visiteur ──
    await transporterNoreply.sendMail({
      from: `"Makclean" <${process.env.SMTP_NOREPLY_USER}>`,
      to: email,
      subject: "Votre demande a bien été reçue — Makclean",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">✅ Demande bien reçue !</h1>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <p style="color: #0f172a; font-size: 16px; line-height: 1.7;">Bonjour <strong>${name}</strong>,</p>
            <p style="color: #475569; font-size: 15px; line-height: 1.7;">
              Nous avons bien reçu votre demande pour <strong>${locationLabel}</strong> concernant : <strong>${service || "votre projet"}</strong>.<br/>
              Notre équipe vous recontactera dans les <strong>24h</strong> afin de mieux comprendre vos besoins et votre projet.
            </p>
            <p style="color: #475569; font-size: 15px; line-height: 1.7;">
              En cas d'urgence, vous pouvez nous contacter directement :
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://wa.me/32489125099" style="display: inline-block; padding: 14px 32px; background: #25d366; color: white; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 15px;">
                💬 WhatsApp — +32 489 125 099
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              Makclean — Place de Montroeul(MB) 22/D, 7911 Frasnes-lez-Anvaing<br/>
              Ce message est envoyé automatiquement, merci de ne pas y répondre.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur SMTP:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

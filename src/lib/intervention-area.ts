/**
 * Formulations géographiques centralisées — une seule source pour tout le site.
 * Siège : Montroeul-au-Bois (commune de Frasnes-lez-Anvaing).
 */
export const INTERVENTION_BASE_CITY = "Montroeul-au-Bois";
export const INTERVENTION_MUNICIPALITY = "Frasnes-lez-Anvaing";
export const INTERVENTION_PROVINCE = "Hainaut";
export const INTERVENTION_AREA_LABEL = "région de Tournai et du Hainaut";

export const INTERVENTION_CITIES =
  "Tournai, Ath, Mouscron, Leuze-en-Hainaut, Lessines, Péruwelz, Renaix, Comines-Warneton, Enghien et Frasnes-lez-Anvaing";

/** Badge court (hero, zones, etc.) */
export const INTERVENTION_BASE_BADGE = `${INTERVENTION_BASE_CITY} · Tournai · ${INTERVENTION_PROVINCE}`;

/** Zone complète pour fiches services et SEO secondaire */
export const INTERVENTION_ZONE = `${INTERVENTION_AREA_LABEL} — ${INTERVENTION_CITIES}`;

/** Résumé complet — zones, contact, FAQ, footer (une fois par page max) */
export const INTERVENTION_SUMMARY = `Basés à ${INTERVENTION_BASE_CITY} (${INTERVENTION_MUNICIPALITY}), nous intervenons dans la ${INTERVENTION_AREA_LABEL} — ${INTERVENTION_CITIES}.`;

/** Version courte — sous-titres de sections où la liste complète serait redondante */
export const INTERVENTION_SHORT = `Entreprise locale à ${INTERVENTION_BASE_CITY}, active dans toute la ${INTERVENTION_AREA_LABEL}.`;

/** Accroche hero (page d'accueil uniquement) */
export const HERO_TAGLINE = `Une entreprise proche de nos clients, une solution adaptée à chacun de vos besoins — bureaux, commerces, immeubles et particuliers dans toute la ${INTERVENTION_AREA_LABEL}.`;

/** Avantage réutilisable dans les fiches services */
export const INTERVENTION_LOCAL_ADVANTAGE = `Service local et réactif depuis ${INTERVENTION_BASE_CITY}`;

/** Communes mises en avant sur la page /zones (SEO + carte) */
export const ZONES_COMMUNES = [
  "Montroeul-au-Bois",
  "Tournai",
  "Ath",
  "Lessines",
  "Enghien",
  "Mouscron",
  "Leuze-en-Hainaut",
  "Renaix",
  "Comines-Warneton",
  "Péruwelz",
  "Frasnes-lez-Anvaing",
] as const;

/** Hors zone — page zones, FAQ, contact */
export const INTERVENTION_OUT_OF_ZONE_SHORT = "Hors zone : sur demande";

export const INTERVENTION_OUT_OF_ZONE_NOTE =
  "Votre commune n'est pas listée ? Les interventions hors zone sont possibles sur demande, selon nos disponibilités.";

/** Valeurs spéciales du formulaire contact */
export const CONTACT_COMMUNE_OTHER = "autre";
export const CONTACT_COMMUNE_UNKNOWN = "hors-zone";

/** Communes proposées dans le formulaire de devis (aligné sur /zones) */
export const CONTACT_FORM_COMMUNES: readonly string[] = [...ZONES_COMMUNES];

/** Meta description dédiée page zones */
export const INTERVENTION_ZONES_META_DESCRIPTION =
  `Entreprise de nettoyage à ${INTERVENTION_BASE_CITY} (${INTERVENTION_MUNICIPALITY}) : interventions à Tournai, Ath, Mouscron, Lessines, Leuze-en-Hainaut, Renaix et dans tout le Hainaut. Carte, communes desservies et devis gratuit sous 24 h.`;


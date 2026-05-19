/** Titre court affiché sur la page (sans suffixe SEO géographique). */
const GEO_TITLE_SUFFIX = " à Tournai et dans le Hainaut";

export function getServiceDisplayTitle(fullTitle: string): string {
  if (fullTitle.endsWith(GEO_TITLE_SUFFIX)) {
    return fullTitle.slice(0, -GEO_TITLE_SUFFIX.length);
  }
  return fullTitle;
}

export {};

declare global {
  interface Window {
    /** Extrait d’événement de conversion Google Ads (Contact) */
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

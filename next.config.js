/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * L'admin réalisations utilise des API Next.js et écrit des fichiers côté serveur.
   * Le site doit donc être déployé comme application Node.js Hostinger.
   */
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;


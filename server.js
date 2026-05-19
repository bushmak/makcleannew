const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Erreur lors du traitement de la requête:", err);
      res.statusCode = 500;
      res.end("Erreur interne du serveur");
    }
  }).listen(port, hostname, () => {
    console.log(`✅ Makclean prêt sur http://${hostname}:${port}`);
    console.log(`🌍 Mode: ${dev ? "développement" : "production"}`);
    console.log(`📅 Démarré le: ${new Date().toLocaleString("fr-BE")}`);
  });
}).catch((err) => {
  console.error("❌ Erreur au démarrage de Next.js:", err);
  process.exit(1);
});

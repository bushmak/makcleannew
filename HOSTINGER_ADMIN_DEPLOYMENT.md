# Déploiement Hostinger - Admin réalisations

Cette version de MakClean doit tourner en application Node.js Hostinger, pas en export statique, car l'admin utilise des routes API Next.js et écrit des fichiers sur le serveur.

## Variables d'environnement

Configurer ces variables dans Hostinger :

```env
ADMIN_PASSWORD=mot-de-passe-admin-tres-solide
ADMIN_SESSION_SECRET=chaine-aleatoire-longue
NEXT_PUBLIC_SITE_URL=https://www.makclean.be

SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
SMTP_NOREPLY_USER=...
SMTP_NOREPLY_PASS=...
```

En local, si `ADMIN_PASSWORD` n'est pas défini, le mot de passe de test est `admin`. En production, `ADMIN_PASSWORD` est obligatoire.

## Images (WebP uniquement)

Le site attend des fichiers **`.webp`** dans `public/` (logo, services, about, réalisations, etc.). Les JPG/PNG provoquent des images cassées.

Après ajout d’images sources JPG/PNG :

```bash
npm run images:webp
```

Cela convertit tout `public/` et aligne les noms attendus par le code (`logo/logo.webp`, `services/Bureau.webp`, `1200x630.webp`, etc.). L’admin réalisations enregistre déjà en WebP.

## Dossiers persistants

Ces dossiers doivent rester présents sur l'hébergement après chaque déploiement :

- `data/realisations.json` : stockage des réalisations.
- `public/uploads/realisations/` : images envoyées depuis l'admin.

Avant un déploiement qui remplace tous les fichiers, sauvegarder ces deux emplacements puis les remettre en place après upload.

## Commandes

Sur Hostinger, utiliser une application Node.js avec :

```bash
npm install
npm run build
npm run start
```

La commande `npm run start` lance `server.js`, qui écoute sur `process.env.PORT` fourni par Hostinger.

## Vérifications après déploiement

1. Ouvrir `/realisations` et vérifier que la galerie s'affiche.
2. Ouvrir `/admin`, se connecter avec `ADMIN_PASSWORD`.
3. Ajouter une image JPG, PNG ou WebP de moins de 5 MB.
4. Vérifier que l'image apparaît dans `/realisations`.
5. Vérifier que `data/realisations.json` et `public/uploads/realisations/` ont bien été modifiés sur le serveur.

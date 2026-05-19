# Toolify

Site multi-outils Next.js : 13 outils en ligne gratuits qui tournent **100 % dans le navigateur**. Aucun backend, aucun fichier téléversé. Cible : France et Tunisie, interface en français.

## Stack technique

- **Next.js 16** (App Router) + **TypeScript** strict
- **Tailwind CSS 3** — tokens de design dans `tailwind.config.ts`
- **lucide-react** pour les icônes
- Polices **Geist** / **Geist Mono** via `next/font`
- Outils : `browser-image-compression`, `jspdf`, `pdf-lib`, `pdfjs-dist`, `qrcode`, `colorthief`
- Blog : fichiers MDX (`content/blog/`) rendus avec `next-mdx-remote`

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Crée un fichier `.env` (ou configure les variables sur Vercel) :

| Variable               | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL de production, utilisée pour les canonical, le sitemap et l'OpenGraph. Ex. `https://toolify.fr` |

## Build de production

```bash
npm run build
npm run start
```

## Déploiement sur Vercel

1. Pousse le projet sur un dépôt GitHub / GitLab.
2. Sur [vercel.com](https://vercel.com), clique sur **New Project** et importe le dépôt.
3. Vercel détecte automatiquement Next.js — aucune configuration de build n'est nécessaire.
4. Dans **Settings → Environment Variables**, ajoute `NEXT_PUBLIC_SITE_URL` avec l'URL de production.
5. Déploie. Les déploiements suivants se font automatiquement à chaque `git push`.

## Activer Google AdSense (après approbation)

Le code AdSense est déjà préparé mais **désactivé** tant que le compte n'est pas approuvé :

1. Dans `app/layout.tsx`, dé-commente le bloc `<Script>` AdSense et renseigne ton identifiant `ca-pub-XXXXXXXXXXXXXXXX`.
2. Dans `components/AdSlot.tsx`, remplace le placeholder par le bloc `<ins className="adsbygoogle">` (exemple en commentaire dans le fichier) avec le même identifiant et les `data-ad-slot` réels.

La bannière de consentement aux cookies (`components/CookieBanner.tsx`) et la [politique de confidentialité](app/privacy/page.tsx) sont déjà en place pour la conformité RGPD.

## Structure

```
app/                routes (landing, outils, blog, pages légales, sitemap, robots)
components/         composants partagés + composants d'outils dans components/tools/
content/blog/       articles du blog au format MDX
lib/                tools.ts (métadonnées des 13 outils), seo.ts, blog.ts, helpers
public/             assets statiques + pdf.worker.min.mjs (worker pdfjs)
```

## Notes

- `public/reference/` contient les maquettes HTML de référence ayant servi au développement. **À supprimer avant la mise en production.**
- `public/pdf.worker.min.mjs` est le worker de `pdfjs-dist`, requis par l'outil Split PDF. Il doit rester synchronisé avec la version installée de `pdfjs-dist`.
- Aucun appel réseau n'est fait avec les fichiers des utilisateurs : tout le traitement est local dans le navigateur.

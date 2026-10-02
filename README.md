# Portfolio UI/UX, template 2026

Template de portfolio pour designer UI/UX, construit avec **Next.js 16**, **Tailwind CSS 4** et **Motion** (anciennement Framer Motion).
Le contenu est fictif (James Dupont, designer à Lyon) : remplacez-le par le vôtre.

## En bref

Un portfolio sobre et typographique, pensé pour montrer le travail vite : la grande typo Mona Sans en largeur étendue porte l'identité, les projets arrivent dès le premier écran (carte « Dernier projet »), et le jaune ne sert qu'à mettre en avant les résultats chiffrés.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

Node.js 20.9 ou plus récent est requis.

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Compilation de production (toutes les pages sont statiques) |
| `npm start` | Sert la version compilée |
| `npm run lint` | Vérification ESLint |

## Personnaliser en 4 fichiers

Tout le texte vit dans `src/content/`. Vous n'avez pas besoin de toucher aux composants.

| Fichier | Contenu |
|---|---|
| `src/content/site.ts` | Nom, métier, ville, e-mail, **URL du site**, disponibilité, réseaux |
| `src/content/home.ts` | Introduction, profil, parcours, méthode, témoignages, FAQ, contact |
| `src/content/projects.ts` | Tous les projets : cartes, « Autres projets » et études de cas |
| `src/app/globals.css` | Couleurs, typographie, espacements (tokens) |

**Typographie française automatique.** Écrivez normalement. Les apostrophes courbes, les espaces insécables avant `? ! : ;`, les guillemets « » et les milliers (`3 500 €`) sont corrigés tout seuls (`src/lib/typo.ts`).

**Surligneur.** Dans les textes, `==ceci==` est surligné en jaune. Réservez-le aux preuves (chiffres, résultats) : c'est la seule couleur vive du site, elle doit garder son sens.

## Ajouter un projet

Tous les projets vivent dans `src/content/projects.ts`, dans l'ordre d'affichage :

| Réglage | Résultat |
|---|---|
| `featured: true` | Grande carte dans « Projets choisis » (`cover` et `result` obligatoires) |
| `featured: false` | Ligne dans le tableau « Autres projets » (pensez au `role`) |
| avec `caseStudy` | Page `/projets/<slug>` générée, avec son image de partage ; la ligne du tableau devient cliquable |
| sans `caseStudy` | Projet seulement listé (pratique pour un projet confidentiel) |
| sans `cover` | Couverture typographique générée avec les deux couleurs de `tone` |

1. Copiez un projet existant et modifiez-le.
2. Déposez vos visuels dans `public/images/projects/<slug>/`.
3. C'est tout : la carte, la ligne, la page, le sitemap et les données structurées suivent.

Blocs disponibles dans les sections (voir `src/content/types.ts`) :

| Bloc | Usage |
|---|---|
| `p` | Paragraphe (accepte `==surligné==`) |
| `list` | Liste à puces ou numérotée |
| `callout` | Question de départ (« Comment pourrions-nous… ? ») |
| `image` | Image avec légende |
| `compare` | Comparateur avant / après, pilotable au clavier |
| `stickies` | Verbatims d'entretiens en post-it |
| `facts` | Chiffres de la recherche (entretiens, tests…) |
| `decisions` | Décisions de conception |
| `swatches` | Couleurs et tokens d'un design system |
| `quote` | Citation d'un client |

Chaque étude affiche ses résultats chiffrés **et la façon dont ils ont été mesurés** (`resultsNote`). Un chiffre sans source ne convainc ni un recruteur ni un moteur de réponse IA.

## Images

Les maquettes fournies sont des SVG légers (1 à 23 Ko). Remplacez-les par vos JPG, PNG ou WebP en gardant des proportions proches : 4:3 pour les projets « larges », 4:5 pour les « étroits ». `next/image` optimise automatiquement les formats bitmap.

Le portrait se trouve dans `public/images/portrait.svg` (format 4:5).

## Couleurs et typographie

Les tokens suivent trois niveaux, dans `src/app/globals.css` :

1. **Primitives** (`:root`) : valeurs brutes (`--ink-900`, `--marker-400`…).
2. **Sémantiques** (`@theme`) : rôles devenus classes Tailwind (`bg-canvas`, `text-ink`, `border-line`, `bg-marker`…). C'est ici que vous changez de palette.
3. **Composants** (`@utility`) : styles typographiques (`type-display`, `type-h2`…) et conteneur `frame`.

Le thème clair/sombre utilise `light-dark()` : une seule ligne par couleur. Le site suit le système, et le bouton soleil/lune mémorise le choix.

La police **Mona Sans** (axe de largeur 75–125 %) est auto-hébergée (`src/fonts/`) : aucun appel à Google, donc rien à déclarer au titre du RGPD.

## Animations

- **Motion** gère l'entrée du titre mot par mot, l'ouverture des images, les compteurs, les post-it, l'accordéon, le menu mobile, le libellé qui suit le curseur sur les projets et l'aperçu des archives.
- **View Transitions** (API du navigateur + `<ViewTransition>` de React) gère le passage d'une page à l'autre : la vignette du projet se transforme en image d'en-tête.
- Si le visiteur a demandé à réduire les animations dans son système, les déplacements sont supprimés (`MotionConfig reducedMotion="user"` et règles CSS dédiées).

## Formulaire de contact

Sans configuration, le formulaire ouvre la messagerie du visiteur avec le message prérempli : rien ne se perd.

Pour un envoi direct, créez un formulaire sur [Formspree](https://formspree.io) (ou Basin, Getform…), puis :

```bash
cp .env.example .env.local
# NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/votre-id
```

## SEO et moteurs de réponse IA

Tout est déjà en place, à partir de `site.url` :

- métadonnées et balises Open Graph sur chaque page ;
- **images de partage générées** pour l'accueil et pour chaque étude de cas ;
- données structurées JSON-LD : `ProfilePage` + `Person`, `FAQPage`, `CreativeWork` et fil d'Ariane ;
- `sitemap.xml`, `robots.txt`, manifeste, icônes ;
- date de mise à jour visible dans le pied de page (`site.updatedAt`) : pensez à la changer à chaque modification.

Les réponses de la FAQ font 30 à 50 mots : c'est la longueur que les moteurs de réponse citent le plus volontiers.

## Déployer

**Vercel** (recommandé) : importez le dépôt, rien à configurer.

**Hébergement statique** (Netlify, GitHub Pages, OVH…) : ajoutez `output: "export"` et `images: { unoptimized: true }` dans `next.config.ts`, puis lancez `npm run build`. Le dossier `out/` est prêt à être envoyé.

## Structure

```
src/
├── app/                 Pages, métadonnées, images de partage, styles globaux
│   ├── globals.css      Tokens et thème
│   └── projets/[slug]/  Études de cas
├── components/
│   ├── home/            Sections de l'accueil
│   ├── case-study/      Blocs des études de cas
│   ├── motion/          Animations réutilisables
│   ├── layout/          En-tête, menu mobile, pied de page
│   └── ui/              Boutons, icônes, notifications…
├── content/             ← votre contenu
├── fonts/               Polices auto-hébergées
└── lib/                 Typographie, thème, JSON-LD
```

## Accessibilité

- Navigation complète au clavier, focus visible, lien d'évitement.
- Le menu mobile piège le focus et se ferme avec Échap.
- Le comparateur avant/après est un vrai curseur (`input range`).
- Les compteurs et les titres animés gardent leur texte final pour les lecteurs d'écran.
- Les contrastes respectent le niveau AA dans les deux thèmes.

## Licences

- Code du template : à votre disposition pour votre propre portfolio.
- Polices : SIL Open Font License 1.1 (voir `src/fonts/LICENSES.md`).

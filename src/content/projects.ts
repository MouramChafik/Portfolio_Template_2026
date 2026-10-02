import { typoDeep } from "@/lib/typo";
import type { FeaturedProject, Project, ProjectWithCaseStudy } from "./types";

/*
 * PROJETS — un seul fichier pour tous vos projets, dans l'ordre d'affichage.
 *   featured: true  → grande carte dans « Projets choisis »
 *   featured: false → ligne dans le tableau « Autres projets »
 * Avec un caseStudy, le projet a sa page /projets/[slug] (et sa ligne devient
 * cliquable) ; sans caseStudy, il est seulement listé.
 * Images : public/images/projects/[slug]/. Sans image de couverture, une
 * couverture typographique est générée avec les deux couleurs de « tone ».
 */
const rawProjects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "pecule",
    featured: true,
    name: "Pécule",
    summary: "Refonte de l'appli d'épargne d'une néobanque pour les 25–35 ans.",
    result: "==+38 % de comptes d'épargne ouverts== en trois mois",
    type: "Appli mobile",
    year: 2025,
    cover: {
      src: "/images/projects/pecule/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Deux écrans de l'appli Pécule : la liste des enveloppes d'épargne et le détail d'un objectif de voyage.",
    },
    caseStudy: {
      title: "Pécule : une appli d'épargne qu'on a envie d'ouvrir",
      lede: "Comment nous avons repensé l'épargne mobile d'une néobanque pour les 25–35 ans. Trois mois après le lancement, les ouvertures de comptes d'épargne avaient augmenté de 38 %.",
      meta: [
        { label: "Client", value: "Pécule, néobanque française" },
        { label: "Rôle", value: "Lead product designer" },
        { label: "Durée", value: "6 mois, de janvier à juin 2025" },
        { label: "Équipe", value: "2 designers, 6 développeurs, 1 product manager" },
        { label: "Livrables", value: "Recherche, UX, UI, prototype, design system" },
      ],
      results: [
        { value: 38, prefix: "+", suffix: "%", label: "de comptes d'épargne ouverts en trois mois" },
        { value: 4.7, decimals: 1, suffix: "/5", label: "sur l'App Store, contre 3,9 avant la refonte" },
        { value: 42, prefix: "−", suffix: "%", label: "de demandes au support sur l'épargne" },
      ],
      resultsNote:
        "Données produit de Pécule, de juillet à septembre 2025, comparées à la même période en 2024. Les campagnes marketing étaient d'ampleur comparable sur les deux périodes.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Pécule est une néobanque française lancée en 2021. Son appli comptait 210 000 utilisateurs actifs, mais seulement 9 % d'entre eux avaient ouvert un compte d'épargne." },
            { type: "p", text: "L'équipe produit voulait comprendre ce blocage et le lever avant une campagne nationale prévue à l'été 2025." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Les utilisateurs voulaient épargner, mais l'appli leur parlait de « placements », de « taux » et de « plafonds ». Ouvrir un livret demandait sept écrans et une décision que la plupart ne se sentaient pas capables de prendre." },
            { type: "callout", label: "La question de départ", text: "Comment rendre l'épargne aussi simple que glisser un billet dans une enveloppe ?" },
          ],
        },
        {
          id: "recherche",
          title: "Recherche",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "14", label: "entretiens individuels" },
                { value: "620", label: "réponses à l'enquête" },
                { value: "3 000", label: "avis App Store analysés" },
                { value: "8", label: "tests de l'appli existante" },
              ],
            },
            { type: "p", text: "Les entretiens ont fait émerger trois constats, que l'enquête a ensuite confirmés." },
            {
              type: "stickies",
              items: [
                { quote: "Je ne sais jamais combien je peux mettre de côté sans finir à découvert.", who: "Léa, 27 ans, infirmière" },
                { quote: "Livret A, LDDS... je ne vois pas ce que ça change pour moi.", who: "Thomas, 31 ans, développeur" },
                { quote: "J'épargne pour un projet précis, pas « pour plus tard ».", who: "Inès, 25 ans, commerciale" },
              ],
            },
            {
              type: "list",
              items: [
                "Le montant à épargner inquiète davantage que le choix du produit.",
                "Le vocabulaire bancaire fait abandonner un parcours sur trois.",
                "On épargne pour un objectif concret, rarement pour une durée.",
              ],
            },
          ],
        },
        {
          id: "pistes",
          title: "Pistes explorées",
          blocks: [
            { type: "p", text: "Trois pistes ont été prototypées sur papier, puis dans Figma : un assistant conversationnel, un arrondi automatique des dépenses et des enveloppes par objectif." },
            {
              type: "image",
              image: {
                src: "/images/projects/pecule/wireframes.svg",
                width: 1600,
                height: 900,
                alt: "Wireframes des trois écrans du parcours de création d'une enveloppe, reliés par des flèches.",
              },
              caption: "Le parcours « enveloppes » en wireframes : objectif, montant conseillé, confirmation.",
            },
            { type: "p", text: "La piste des enveloppes l'a emporté : ==7 personnes sur 8== ont créé un objectif sans aide lors des tests, contre 3 sur 8 avec l'assistant." },
          ],
        },
        {
          id: "conception",
          title: "Conception",
          blocks: [
            { type: "p", text: "L'écran d'accueil de l'épargne a été entièrement repensé. Faites glisser le curseur pour comparer l'avant et l'après." },
            {
              type: "compare",
              before: {
                src: "/images/projects/pecule/avant.svg",
                width: 390,
                height: 844,
                alt: "Avant : une liste de produits d'épargne avec taux, plafonds et mentions légales.",
              },
              after: {
                src: "/images/projects/pecule/apres.svg",
                width: 390,
                height: 844,
                alt: "Après : des enveloppes par objectif, avec une barre de progression et un montant conseillé.",
              },
              caption: "L'écran Épargne avant et après la refonte.",
            },
            {
              type: "decisions",
              items: [
                { title: "Un objectif, une enveloppe", text: "Chaque projet devient une enveloppe nommée par l'utilisateur, avec une date et un montant cible." },
                { title: "Un montant conseillé", text: "L'appli propose un montant mensuel calculé à partir des dépenses récentes, modifiable en un geste." },
                { title: "Le jargon au second plan", text: "Le livret est choisi automatiquement et expliqué dans les détails de l'enveloppe, pour qui veut savoir." },
              ],
            },
            {
              type: "image",
              image: {
                src: "/images/projects/pecule/ecrans.svg",
                width: 1600,
                height: 1000,
                alt: "Trois écrans finaux de l'appli : création d'une enveloppe, liste des enveloppes et détail d'un objectif.",
              },
              caption: "Les trois écrans clés du nouveau parcours.",
            },
          ],
        },
        {
          id: "design-system",
          title: "Design system",
          blocks: [
            { type: "p", text: "Pour livrer vite sans perdre en cohérence, nous avons posé un design system dès le deuxième mois : 62 composants documentés dans Figma et Storybook, partagés avec l'équipe de développement." },
            {
              type: "swatches",
              items: [
                { name: "Aubergine", hex: "#2B1E48", token: "color.brand.900" },
                { name: "Corail", hex: "#FF7A59", token: "color.accent.500" },
                { name: "Menthe", hex: "#4CC9A4", token: "color.success.500" },
                { name: "Lavande", hex: "#9B8CFF", token: "color.info.400" },
                { name: "Coquille", hex: "#FFF8F3", token: "color.surface.50" },
              ],
            },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "La nouvelle épargne a été lancée en juin 2025 pour tous les utilisateurs. ==Trois mois plus tard, les ouvertures de comptes d'épargne avaient augmenté de 38 %==, et les demandes au support sur l'épargne avaient baissé de 42 %." },
            { type: "quote", text: "Les specs étaient si claires que l'équipe a livré la nouvelle appli avec deux semaines d'avance.", name: "Karim Benali", role: "CTO, Pécule" },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Tester le vocabulaire aussi tôt que les écrans : un mot mal choisi coûte plus cher qu'un bouton mal placé.",
                "Un montant conseillé rassure davantage qu'un simulateur, même très bien conçu.",
                "Poser le design system dès le deuxième mois a fait gagner trois semaines en fin de projet.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "vigie",
    featured: true,
    name: "Vigie",
    summary: "Tableau de bord de gestion des lits pour un centre hospitalier universitaire.",
    result: "==−27 % de temps== pour trouver un lit disponible",
    type: "Application web",
    year: 2024,
    cover: {
      src: "/images/projects/vigie/cover.svg",
      width: 1200,
      height: 1500,
      alt: "Tableau de bord Vigie : carte des lits par service, indicateurs du jour et détail d'une chambre.",
    },
    caseStudy: {
      title: "Vigie : trouver un lit d'hôpital en moins de deux minutes",
      lede: "Un tableau de bord pour les cadres de santé d'un CHU. Il remplace un tableur partagé et une douzaine d'appels par jour et par service.",
      meta: [
        { label: "Client", value: "Vigie, éditeur de logiciels hospitaliers" },
        { label: "Rôle", value: "Product designer" },
        { label: "Durée", value: "8 mois, 2024" },
        { label: "Équipe", value: "1 designer, 4 développeurs, 1 product owner, 2 infirmières référentes" },
        { label: "Livrables", value: "Recherche terrain, UX, UI, tests d'utilisabilité" },
      ],
      results: [
        { value: 27, prefix: "−", suffix: "%", label: "de temps pour trouver un lit disponible" },
        { value: 12, label: "appels évités chaque jour, par service" },
        { value: 96, suffix: "%", label: "des cadres de santé l'ouvrent chaque jour" },
      ],
      resultsNote:
        "Mesures réalisées par l'équipe Vigie dans 6 services pilotes, de septembre à novembre 2024, comparées aux trois mois précédant le déploiement.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Dans un CHU, chaque admission commence par une question : où reste-t-il un lit libre ? Les cadres de santé y répondaient avec un tableur partagé de quarante colonnes, et beaucoup d'appels." },
            { type: "p", text: "Vigie, éditeur de logiciels hospitaliers, voulait remplacer ce tableur par un outil intégré au dossier patient." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Le tableur n'était jamais à jour. Entre deux saisies, un lit pouvait être libéré, nettoyé puis réattribué sans que personne ne le sache." },
            { type: "callout", label: "La question de départ", text: "Comment donner à chaque service une vue fiable des lits, sans ajouter une seule saisie ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "6", label: "journées d'observation en service" },
                { value: "18", label: "entretiens avec des soignants" },
                { value: "4", label: "cycles de tests sur prototype" },
              ],
            },
            { type: "p", text: "J'ai passé six journées dans trois services, en blouse, avant de dessiner le moindre écran. Les décisions de conception viennent directement de ces observations." },
            {
              type: "decisions",
              items: [
                { title: "Une carte des lits", text: "Chaque lit est une case colorée selon son état : libre, occupé, en nettoyage ou sortie prévue." },
                { title: "Zéro saisie en plus", text: "Les états se mettent à jour à partir des informations déjà saisies dans le dossier patient." },
                { title: "Lisible à deux mètres", text: "L'interface est pensée pour les grands écrans des postes de soins, consultés debout et en passant." },
              ],
            },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "Après trois mois dans six services pilotes, ==le temps pour trouver un lit disponible a baissé de 27 %==. Le déploiement à l'ensemble du CHU est prévu pour 2026." },
            { type: "quote", text: "Camille a transformé un tableur de quarante colonnes en un écran que nos infirmières utilisent sans formation.", name: "Hélène Garnier", role: "Directrice produit, Vigie" },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "L'observation sur le terrain révèle ce que les entretiens taisent : les gestes, les interruptions, l'urgence.",
                "Un écran consulté debout se conçoit comme un panneau de signalisation, pas comme une page.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "socle",
    featured: true,
    name: "Socle",
    summary: "Design system partagé par neuf équipes produit et quatre marques d'un groupe de distribution.",
    result: "Écrans livrés ==deux fois plus vite==",
    type: "Design system",
    year: 2024,
    cover: {
      src: "/images/projects/socle/cover.svg",
      width: 1200,
      height: 1500,
      alt: "Planche de composants du design system Socle : boutons, champs, interrupteurs, couleurs et typographie.",
    },
    caseStudy: {
      title: "Socle : un design system pour neuf équipes et quatre marques",
      lede: "Un langage commun entre designers et développeurs, des couleurs aux composants, adopté par neuf équipes produit en un an.",
      meta: [
        { label: "Client", value: "Groupe Ferrand, distribution" },
        { label: "Rôle", value: "Responsable du design system" },
        { label: "Durée", value: "12 mois, 2023–2024" },
        { label: "Équipe", value: "3 designers, 4 développeurs front-end" },
        { label: "Livrables", value: "Tokens, bibliothèque Figma, composants React, documentation" },
      ],
      results: [
        { value: 112, label: "composants documentés et testés" },
        { value: 9, label: "équipes produit qui l'utilisent" },
        { value: 2, prefix: "×", label: "plus rapide pour livrer un écran" },
      ],
      resultsNote:
        "Temps de livraison mesuré sur 40 écrans avant et 40 écrans après l'adoption, de la maquette validée à la mise en production. Données internes du groupe, 2024.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Le Groupe Ferrand exploite quatre marques de distribution, chacune avec ses sites et ses applis. Neuf équipes produit construisaient leurs interfaces chacune de leur côté." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "37", label: "variantes de boutons recensées" },
                { value: "54", label: "nuances de gris différentes" },
                { value: "11", label: "polices de caractères en production" },
              ],
            },
            { type: "p", text: "Chaque nouvelle fonctionnalité relançait les mêmes débats. Les développeurs recodaient des composants existants, avec des écarts visibles d'une marque à l'autre." },
            { type: "callout", label: "La question de départ", text: "Comment partager les mêmes fondations entre quatre marques sans les rendre identiques ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            { type: "p", text: "Les tokens sont organisés en trois niveaux : des valeurs brutes, des rôles (fond, texte, action) et des réglages par composant. Chaque marque ne redéfinit que les rôles." },
            {
              type: "swatches",
              items: [
                { name: "Graphite", hex: "#1F2328", token: "color.neutral.900" },
                { name: "Orange", hex: "#FF6A2B", token: "color.action.500" },
                { name: "Sable", hex: "#F2EEE8", token: "color.surface.100" },
                { name: "Bleu nuit", hex: "#23395B", token: "color.info.700" },
              ],
            },
            {
              type: "decisions",
              items: [
                { title: "Des rôles plutôt que des couleurs", text: "Les composants utilisent « action » ou « surface », jamais une valeur précise : changer de marque devient un réglage." },
                { title: "Une seule source", text: "Les tokens partent de Figma et alimentent le code automatiquement, sans copie manuelle." },
                { title: "Une gouvernance légère", text: "Un comité mensuel valide les nouveaux composants proposés par les équipes." },
              ],
            },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "Un an après le lancement, neuf équipes utilisent Socle et ==le temps moyen pour livrer un écran a été divisé par deux==." },
            { type: "quote", text: "Le design system a mis fin aux débats sur la couleur des boutons. On parle enfin du produit.", name: "Julie Marchand", role: "Head of design, Groupe Ferrand" },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Un design system se juge à son adoption, pas à son nombre de composants.",
                "Documenter le pourquoi d'un composant évite plus d'erreurs que documenter le comment.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "convoi",
    featured: true,
    name: "Convoi",
    summary: "Appli terrain, utilisable hors ligne, pour 1 200 chauffeurs-livreurs.",
    result: "==−18 % d'erreurs de livraison==",
    type: "Appli mobile",
    year: 2023,
    cover: {
      src: "/images/projects/convoi/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Appli Convoi sur téléphone : carte de la tournée, prochain arrêt et bouton de validation de livraison.",
    },
    caseStudy: {
      title: "Convoi : une appli de livraison qui fonctionne sans réseau",
      lede: "Une application pour les chauffeurs-livreurs d'un transporteur régional, utilisable d'une main, en plein soleil et sans connexion.",
      meta: [
        { label: "Client", value: "Convoi, transporteur régional" },
        { label: "Rôle", value: "Product designer" },
        { label: "Durée", value: "5 mois, 2023" },
        { label: "Équipe", value: "1 designer, 3 développeurs mobiles, 1 product manager" },
        { label: "Livrables", value: "Recherche terrain, UX, UI, prototype" },
      ],
      results: [
        { value: 18, prefix: "−", suffix: "%", label: "d'erreurs de livraison" },
        { value: 11, suffix: "s", label: "pour valider une livraison, contre 40 avant" },
        { value: 1200, label: "chauffeurs équipés en six semaines" },
      ],
      resultsNote:
        "Données d'exploitation de Convoi, d'octobre à décembre 2023, comparées à la même période en 2022, sur les 14 agences équipées.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Convoi livre chaque jour 40 000 colis dans le sud-est de la France. Ses chauffeurs utilisaient un terminal vieillissant, lent et illisible en plein soleil." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Valider une livraison prenait 40 secondes et cinq écrans. Dans les zones sans réseau, l'appli se bloquait, et les chauffeurs notaient les livraisons sur papier." },
            { type: "callout", label: "La question de départ", text: "Comment valider une livraison d'une main, en dix secondes, avec ou sans réseau ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "9", label: "tournées accompagnées" },
                { value: "4", label: "agences visitées" },
                { value: "23", label: "chauffeurs interrogés" },
              ],
            },
            {
              type: "decisions",
              items: [
                { title: "De grandes cibles", text: "Aucune zone tactile sous 64 pixels : l'appli s'utilise avec des gants, d'une seule main." },
                { title: "Hors ligne d'abord", text: "Tout fonctionne sans réseau ; la synchronisation se fait en arrière-plan dès que la connexion revient." },
                { title: "Lisible en plein soleil", text: "Un thème clair à fort contraste, testé dehors, à midi, en juillet." },
              ],
            },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "L'appli a été déployée auprès de 1 200 chauffeurs en six semaines. ==Les erreurs de livraison ont baissé de 18 %==, et valider une livraison prend désormais 11 secondes." },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Rien ne remplace une journée dans la camionnette pour comprendre un métier.",
                "Le mode hors ligne n'est pas une fonctionnalité : c'est une condition de départ.",
              ],
            },
          ],
        },
      ],
    },
  },
  /* ------------------------------------------------------------------ */
  /* Autres projets : lignes du tableau, études de cas plus courtes       */
  /* ------------------------------------------------------------------ */
  {
    slug: "atelier-lumen",
    featured: false,
    name: "Atelier Lumen",
    summary: "Site d'un studio de photographie culinaire",
    type: "Site web",
    year: 2025,
    role: "Direction artistique, UI",
    tone: ["#f3c6a5", "#6b3a2a"],
    cover: {
      src: "/images/projects/atelier-lumen/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Site d'Atelier Lumen sur ordinateur et sur téléphone : photo d'une assiette, galerie de projets et bouton de demande de devis.",
    },
    caseStudy: {
      title: "Atelier Lumen : un site qui donne faim avant de parler de prix",
      lede: "Le site d'un studio de photographie culinaire lyonnais, pensé pour transformer les visites en demandes de devis.",
      meta: [
        { label: "Client", value: "Atelier Lumen, studio photo" },
        { label: "Rôle", value: "Direction artistique, UI" },
        { label: "Durée", value: "6 semaines, 2025" },
        { label: "Équipe", value: "1 designer, 1 développeur" },
        { label: "Livrables", value: "Direction artistique, maquettes, guide de style" },
      ],
      results: [
        { value: 2.3, decimals: 1, prefix: "×", label: "de demandes de devis en trois mois" },
        { value: 1.4, decimals: 1, suffix: "s", label: "pour afficher l'accueil sur mobile" },
      ],
      resultsNote:
        "Demandes reçues par le formulaire de mars à mai 2025, comparées aux trois mois précédant la mise en ligne. Temps d'affichage mesuré avec Lighthouse sur un réseau 4G simulé.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Atelier Lumen photographie des plats pour des chefs, des marques et des éditeurs. Son ancien site, un modèle générique, montrait peu d'images et cachait le formulaire de contact en bas de page." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Les visiteurs regardaient trois photos puis partaient. Demander un devis supposait de connaître déjà son budget, sa date et son nombre de visuels." },
            { type: "callout", label: "La question de départ", text: "Comment laisser les images convaincre, puis rendre la demande de devis évidente ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "decisions",
              items: [
                { title: "Les photos d'abord", text: "Des galeries plein écran par type de projet, sans texte superflu entre les images." },
                { title: "Un devis en trois questions", text: "Le type de projet, la date et le nombre de visuels : le studio rappelle avec une estimation." },
                { title: "Léger avant tout", text: "Images compressées et chargées à la demande, pour un site rapide même en 4G." },
              ],
            },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "Trois mois après la mise en ligne, ==le studio reçoit 2,3 fois plus de demandes de devis==, dont la moitié depuis un téléphone." },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Pour un photographe, chaque élément d'interface doit justifier la place qu'il prend aux images.",
                "Moins de questions dans un formulaire, c'est plus de demandes, et de meilleure qualité.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "guichet",
    featured: false,
    name: "Guichet",
    summary: "Démarches en ligne d'une métropole",
    type: "Service public",
    year: 2024,
    role: "UX, accessibilité RGAA",
    tone: ["#c9dcf2", "#1d3f6e"],
    cover: {
      src: "/images/projects/guichet/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Formulaire de demande de badge de déchetterie, étape 2 sur 4, avec une erreur expliquée sous le champ du code postal.",
    },
    caseStudy: {
      title: "Guichet : des démarches en ligne accessibles à tous les habitants",
      lede: "La refonte du portail de démarches d'une métropole, conforme au RGAA et testée avec des personnes en situation de handicap.",
      meta: [
        { label: "Client", value: "Une métropole française" },
        { label: "Rôle", value: "UX design, accessibilité" },
        { label: "Durée", value: "7 mois, 2024" },
        { label: "Équipe", value: "2 designers, 5 développeurs, 1 cheffe de projet" },
        { label: "Livrables", value: "Audit RGAA, parcours, maquettes, recommandations" },
      ],
      results: [
        { value: 92, suffix: "%", label: "de conformité au RGAA, contre 41 % avant" },
        { value: 31, prefix: "−", suffix: "%", label: "d'appels au standard sur les démarches en ligne" },
      ],
      resultsNote:
        "Audit RGAA 4.1 réalisé par un organisme indépendant en octobre 2024. Appels comptabilisés par le standard de la métropole sur six mois, comparés à la même période un an plus tôt.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Le portail permet de demander une place en crèche, un badge de déchetterie ou un rendez-vous pour une carte d'identité. Ses formulaires étaient impossibles à remplir au clavier ou avec un lecteur d'écran." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Faute de pouvoir terminer une démarche en ligne, de nombreux habitants appelaient le standard ou se déplaçaient en mairie." },
            { type: "callout", label: "La question de départ", text: "Comment rendre chaque démarche faisable au clavier, au lecteur d'écran et sur un vieux téléphone ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "106", label: "critères RGAA audités" },
                { value: "12", label: "tests avec des personnes en situation de handicap" },
                { value: "38", label: "démarches refondues" },
              ],
            },
            { type: "p", text: "Chaque formulaire a été découpé en étapes courtes, avec des erreurs expliquées en clair et un récapitulatif avant l'envoi." },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "Le portail atteint ==92 % de conformité au RGAA==, et les appels au standard sur les démarches en ligne ont baissé de 31 %." },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "L'accessibilité se conçoit dès le premier wireframe, pas en correction à la fin.",
                "Tester avec des personnes concernées révèle des problèmes qu'aucun audit ne voit.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "saison",
    featured: false,
    name: "Saison",
    summary: "Recettes de saison contre le gaspillage",
    type: "Appli mobile",
    year: 2023,
    role: "UI, prototype",
    tone: ["#d6e9c4", "#2f5233"],
    cover: {
      src: "/images/projects/saison/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Appli Saison : choix des ingrédients du frigo, puis fiche du velouté de poireaux avec les ingrédients disponibles.",
    },
    caseStudy: {
      title: "Saison : cuisiner ce qu'on a déjà dans son frigo",
      lede: "Une appli de recettes qui part des ingrédients disponibles, pour cuisiner de saison et jeter moins.",
      meta: [
        { label: "Client", value: "Saison, start-up" },
        { label: "Rôle", value: "UI designer" },
        { label: "Durée", value: "3 mois, 2023" },
        { label: "Équipe", value: "1 designer, 2 développeurs, 1 fondatrice" },
        { label: "Livrables", value: "Interfaces, prototype interactif, icônes" },
      ],
      results: [
        { value: 4.8, decimals: 1, suffix: "/5", label: "de note moyenne sur les stores" },
        { value: 120000, label: "téléchargements la première année" },
      ],
      resultsNote: "Données de l'App Store et de Google Play, de septembre 2023 à septembre 2024.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "La fondatrice de Saison voulait une appli qui réponde à une question simple : « Qu'est-ce que je peux cuisiner avec ce que j'ai ? »" },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Les applis de recettes partent d'une envie, puis imposent une liste de courses. Les ingrédients déjà achetés finissent souvent à la poubelle." },
            { type: "callout", label: "La question de départ", text: "Et si la recherche commençait par le frigo plutôt que par la recette ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "decisions",
              items: [
                { title: "Le frigo comme point de départ", text: "On coche ses ingrédients en quelques gestes, l'appli propose les recettes qui les utilisent." },
                { title: "La saison en filigrane", text: "Les fruits et légumes du mois sont mis en avant, sans jamais devenir une contrainte." },
                { title: "Prototype testé en cuisine", text: "Six personnes ont testé le prototype en cuisinant vraiment, téléphone posé sur le plan de travail." },
              ],
            },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "L'appli a été ==téléchargée 120 000 fois la première année==, avec une note moyenne de 4,8 sur 5." },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Tester une appli de cuisine en cuisine change tout : mains mouillées, écran lointain, minuteur.",
                "Un bon point de départ vaut mieux que dix filtres de recherche.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fil-rouge",
    featured: false,
    name: "Fil Rouge",
    summary: "Suivi de chantiers pour les artisans",
    type: "Outil métier",
    year: 2022,
    role: "Recherche, UX",
    tone: ["#f6d0d0", "#7a2330"],
    cover: {
      src: "/images/projects/fil-rouge/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Appli Fil Rouge : suivi d'un chantier avec photo, note vocale et étapes, et rapport du jour rédigé automatiquement.",
    },
    caseStudy: {
      title: "Fil Rouge : le suivi de chantier tient dans la poche",
      lede: "Un outil pour les artisans du bâtiment, qui remplace le carnet papier et les photos perdues dans la galerie du téléphone.",
      meta: [
        { label: "Client", value: "Fil Rouge, éditeur de logiciels" },
        { label: "Rôle", value: "Recherche utilisateur, UX" },
        { label: "Durée", value: "4 mois, 2022" },
        { label: "Équipe", value: "1 designer, 3 développeurs" },
        { label: "Livrables", value: "Recherche terrain, parcours, wireframes, prototype" },
      ],
      results: [
        { value: 3, suffix: "h", label: "gagnées chaque semaine par chef de chantier" },
        { value: 85, suffix: "%", label: "des artisans pilotes l'utilisent encore après six mois" },
      ],
      resultsNote:
        "Estimation des 14 chefs de chantier pilotes, recoupée avec les données d'usage de l'application, de mars à août 2022.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Sur un chantier, les informations circulent par SMS, photos et carnets. Le soir, le chef de chantier passe une heure à tout recopier." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Les outils existants étaient pensés pour le bureau : trop de champs, trop d'écrans, inutilisables avec des gants." },
            { type: "callout", label: "La question de départ", text: "Comment noter l'avancement d'un chantier en moins de temps qu'il n'en faut pour envoyer un SMS ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "8", label: "chantiers visités" },
                { value: "14", label: "chefs de chantier interrogés" },
                { value: "3", label: "versions du prototype" },
              ],
            },
            { type: "p", text: "L'appli tient en un seul écran par chantier : une photo, une note vocale, un statut. Le rapport de la journée se rédige tout seul." },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "Les chefs de chantier pilotes estiment ==gagner trois heures par semaine==, et 85 % d'entre eux utilisent encore l'appli après six mois." },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "La note vocale a remplacé dix champs de formulaire : le meilleur formulaire est parfois celui qu'on supprime.",
                "Concevoir pour le terrain, c'est concevoir pour l'interruption.",
              ],
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "kiosque",
    featured: false,
    name: "Kiosque",
    summary: "Abonnement à la presse en ligne",
    type: "Site web",
    year: 2021,
    role: "Tests utilisateurs, UX",
    tone: ["#e4ddf7", "#3d2f72"],
    cover: {
      src: "/images/projects/kiosque/cover.svg",
      width: 1600,
      height: 1200,
      alt: "Parcours d'abonnement du Kiosque : choix de la formule sur ordinateur et paiement sur téléphone.",
    },
    caseStudy: {
      title: "Kiosque : s'abonner à son journal en moins de deux minutes",
      lede: "Une série de tests utilisateurs qui a simplifié le parcours d'abonnement d'un éditeur de presse en ligne.",
      meta: [
        { label: "Client", value: "Kiosque, éditeur de presse" },
        { label: "Rôle", value: "Tests utilisateurs, UX" },
        { label: "Durée", value: "2 mois, 2021" },
        { label: "Équipe", value: "1 designer, 1 product manager, 2 développeurs" },
        { label: "Livrables", value: "Tests utilisateurs, recommandations, maquettes" },
      ],
      results: [
        { value: 24, prefix: "+", suffix: "%", label: "d'abonnements finalisés" },
        { value: 5, label: "étapes supprimées dans le parcours" },
      ],
      resultsNote: "Test A/B sur quatre semaines en juin 2021, la moitié du trafic sur chaque version.",
      sections: [
        {
          id: "contexte",
          title: "Contexte",
          blocks: [
            { type: "p", text: "Kiosque publie un quotidien régional en ligne. Beaucoup de lecteurs commençaient à s'abonner, mais peu allaient jusqu'au paiement." },
          ],
        },
        {
          id: "probleme",
          title: "Le problème",
          blocks: [
            { type: "p", text: "Le parcours comptait neuf étapes et demandait de créer un compte avant même de choisir une offre." },
            { type: "callout", label: "La question de départ", text: "Quelles étapes du parcours d'abonnement sont vraiment indispensables ?" },
          ],
        },
        {
          id: "demarche",
          title: "Démarche",
          blocks: [
            {
              type: "facts",
              items: [
                { value: "10", label: "tests utilisateurs filmés" },
                { value: "9", label: "étapes au départ" },
                { value: "4", label: "étapes à l'arrivée" },
              ],
            },
            { type: "p", text: "Le compte se crée désormais en même temps que le paiement, et l'offre la plus choisie est présélectionnée." },
          ],
        },
        {
          id: "resultats",
          title: "Résultats",
          blocks: [
            { type: "p", text: "Sur quatre semaines de test A/B, la nouvelle version a généré ==24 % d'abonnements finalisés en plus==." },
          ],
        },
        {
          id: "apprentissages",
          title: "Ce que j'en retiens",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Dix tests filmés convainquent une direction mieux que n'importe quelle présentation.",
                "Chaque étape d'un parcours d'achat doit se justifier, sinon elle disparaît.",
              ],
            },
          ],
        },
      ],
    },
  },
];

export const projects = typoDeep(rawProjects);

/** Grandes cartes de « Projets choisis ». */
export const featuredProjects = projects.filter(
  (project): project is FeaturedProject =>
    project.featured && Boolean(project.cover && project.result && project.caseStudy),
);

/** Lignes du tableau « Autres projets ». */
export const otherProjects = projects.filter((project) => !project.featured);

/** Projets qui ont une page d'étude de cas. */
export const caseStudies = projects.filter(
  (project): project is ProjectWithCaseStudy => Boolean(project.caseStudy),
);

export function getProject(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

/** Étude de cas suivante (la dernière renvoie à la première). */
export function getNextProject(slug: string) {
  const index = caseStudies.findIndex((project) => project.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

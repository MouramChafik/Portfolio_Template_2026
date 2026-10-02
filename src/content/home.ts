import { typoDeep } from "@/lib/typo";

/* CONTENU DE L'ACCUEIL, sections dans l'ordre de la page. */

export const hero = typoDeep({
  title: "Des interfaces claires pour des produits complexes.",
  intro:
    "Je suis Camille Roux, designer UI/UX à Lyon. Depuis huit ans, j'aide des équipes produit à rendre simples des outils qui ne l'étaient pas : banque, santé, logistique.",
});

export const projectsIntro = typoDeep(
  "Quatre projets menés de la recherche au lancement, avec les résultats mesurés après livraison.",
);

export const profile = typoDeep({
  lead: "Je conçois des produits utiles avant d'être beaux, et je fais en sorte qu'ils soient les deux.",
  paragraphs: [
    "J'ai commencé en 2018 en agence, sur des sites e-commerce, avant de rejoindre l'équipe produit d'un éditeur de logiciels hospitaliers. Depuis 2023, je travaille en freelance avec des start-up et des équipes de grands groupes.",
    "Mon travail commence presque toujours par des entretiens avec les personnes qui utiliseront le produit. Je préfère un prototype testé lundi à une maquette parfaite vendredi.",
  ],
  portrait: {
    src: "/images/portrait.svg",
    width: 800,
    height: 1000,
    alt: "Emplacement du portrait de Camille Roux",
  },
  timeline: [
    { period: "Depuis 2023", role: "Designer UI/UX en freelance", org: "Start-up et grands groupes, Lyon et à distance" },
    { period: "2020–2023", role: "Lead product designer", org: "Médiane, logiciels pour les hôpitaux" },
    { period: "2018–2020", role: "Designer UI", org: "Studio Grand Large, agence digitale" },
    { period: "2016–2018", role: "Master en design d'interaction", org: "Lyon" },
  ],
  skills: [
    "Recherche utilisateur",
    "Architecture de l'information",
    "Design d'interface",
    "Prototypage",
    "Design system",
    "Tests d'utilisabilité",
    "Accessibilité RGAA",
    "Animation d'ateliers",
  ],
  tools: ["Figma", "FigJam", "Framer", "ProtoPie", "Maze", "Dovetail", "Notion", "Jira"],
});

export const method = typoDeep({
  intro:
    "Quatre étapes, ajustées à chaque projet. On passe à la suivante quand la précédente a répondu à ses questions.",
  steps: [
    {
      title: "Comprendre",
      text: "Entretiens, données d'usage et audit de l'existant. Je cherche où les gens bloquent, et pourquoi.",
      deliverables: ["Synthèse de recherche", "Parcours utilisateurs"],
    },
    {
      title: "Structurer",
      text: "Architecture de l'information, parcours et wireframes. On décide de ce qui compte avant de dessiner le moindre écran.",
      deliverables: ["Arborescence", "Wireframes annotés"],
    },
    {
      title: "Concevoir",
      text: "Interfaces, prototypes interactifs et composants. Chaque écran s'appuie sur le design system.",
      deliverables: ["Maquettes", "Prototype", "Composants"],
    },
    {
      title: "Vérifier",
      text: "Tests d'utilisabilité, suivi du développement et mesure des résultats après le lancement.",
      deliverables: ["Rapport de tests", "Specs", "Suivi des indicateurs"],
    },
  ],
});

export const testimonials = typoDeep([
  {
    quote: "Camille a transformé un tableur de quarante colonnes en un écran que nos infirmières utilisent sans formation.",
    name: "Hélène Garnier",
    role: "Directrice produit, Vigie",
  },
  {
    quote: "Les specs étaient si claires que l'équipe a livré la nouvelle appli avec deux semaines d'avance.",
    name: "Karim Benali",
    role: "CTO, Pécule",
  },
  {
    quote: "Le design system a mis fin aux débats sur la couleur des boutons. On parle enfin du produit.",
    name: "Julie Marchand",
    role: "Head of design, Groupe Ferrand",
  },
]);

/** Questions fréquentes : réponses de 30 à 50 mots, faciles à citer par les moteurs de réponse. */
export const faq = typoDeep([
  {
    id: "projets",
    question: "Quels types de projets acceptez-vous ?",
    answer:
      "Je travaille sur des produits numériques où l'usage compte : applis mobiles, outils métier, tableaux de bord et design systems. Les missions de trois à neuf mois, menées avec une équipe produit en place, sont celles où j'apporte le plus.",
  },
  {
    id: "collaboration",
    question: "Comment se passe une collaboration avec vous ?",
    answer:
      "Tout commence par un appel de trente minutes pour comprendre votre produit et vos contraintes. Je vous envoie ensuite, sous trois jours ouvrés, une proposition écrite avec le planning, les livrables et un prix fixe.",
  },
  {
    id: "tarifs",
    question: "Combien coûte un projet de design UI/UX ?",
    answer:
      "Le prix dépend du périmètre. Un audit UX démarre à 3 500 € HT. La refonte complète d'une application se situe en général entre 25 000 et 60 000 € HT, recherche et tests compris.",
  },
  {
    id: "distance",
    question: "Travaillez-vous à distance ou sur site ?",
    answer:
      "Les deux. Je travaille à distance avec des équipes en France et en Europe, et je me déplace à Lyon ou à Paris pour les ateliers et les tests utilisateurs, qui gagnent à se faire en personne.",
  },
  {
    id: "equipe",
    question: "Pouvez-vous rejoindre une équipe produit existante ?",
    answer:
      "Oui. Je rejoins régulièrement des équipes pour quelques mois, en renfort sur une refonte ou pour lancer un design system. Je m'adapte à vos outils et à vos rituels, de Figma à Jira.",
  },
  {
    id: "delais",
    question: "Quel délai prévoir avant de démarrer ?",
    answer:
      "Comptez quatre à six semaines en moyenne. Pour un audit court ou une mission urgente, une place se libère parfois plus vite : écrivez-moi en précisant votre échéance, je vous réponds sous 48 heures.",
  },
]);

export const contact = typoDeep({
  title: "Parlons de votre projet",
  text: "Décrivez votre produit et ce qui coince. Je réponds sous 48 heures, du lundi au vendredi.",
  projectTypes: ["Appli mobile", "Application web", "Design system", "Audit UX", "Autre"],
  budgets: [
    "Moins de 10 000 €",
    "10 000 à 25 000 €",
    "25 000 à 60 000 €",
    "Plus de 60 000 €",
    "Je ne sais pas encore",
  ],
});

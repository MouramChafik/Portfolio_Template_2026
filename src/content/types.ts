/* Types du contenu : ils guident l'édition (autocomplétion, erreurs claires). */

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Link = { label: string; href: string };

/** Un chiffre clé, animé à l'apparition. */
export type Result = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

/**
 * Blocs disponibles dans une étude de cas. Dans les textes, ==ceci== est
 * surligné en jaune : réservez-le aux preuves (chiffres, résultats).
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; label: string; text: string }
  | { type: "image"; image: ImageAsset; caption?: string }
  | { type: "compare"; before: ImageAsset; after: ImageAsset; caption?: string }
  | { type: "stickies"; items: { quote: string; who: string }[] }
  | { type: "facts"; items: { value: string; label: string }[] }
  | { type: "decisions"; items: { title: string; text: string }[] }
  | { type: "swatches"; items: { name: string; hex: string; token: string }[] }
  | { type: "quote"; text: string; name: string; role: string };

export type CaseSection = {
  id: string;
  title: string;
  blocks: Block[];
};

export type CaseStudy = {
  title: string;
  lede: string;
  meta: { label: string; value: string }[];
  /** Chiffres clés (facultatifs). */
  results: Result[];
  /** Comment les chiffres ont été mesurés : source, période, limites. */
  resultsNote?: string;
  sections: CaseSection[];
};

export type Project = {
  slug: string;
  name: string;
  /** Une phrase : carte de l'accueil ou ligne du tableau « Autres projets ». */
  summary: string;
  type: string;
  year: number;
  /**
   * true  → grande carte dans « Projets choisis » (cover + result obligatoires)
   * false → ligne dans « Autres projets » (role conseillé)
   */
  featured: boolean;
  /** Résultat principal de la carte ; ==…== pour le surligner. */
  result?: string;
  /** Rôle affiché dans le tableau « Autres projets ». */
  role?: string;
  /** Image de couverture. Sans image, une couverture typographique est générée. */
  cover?: ImageAsset;
  /** Deux couleurs (fond, texte) pour la couverture typographique. */
  tone?: [string, string];
  /** Sans étude de cas, le projet est listé mais pas cliquable (projet confidentiel…). */
  caseStudy?: CaseStudy;
};

/** Projet mis en avant : carte complète avec image, résultat et étude de cas. */
export type FeaturedProject = Project & {
  featured: true;
  cover: ImageAsset;
  result: string;
  caseStudy: CaseStudy;
};

/** Projet qui a une page d'étude de cas. */
export type ProjectWithCaseStudy = Project & { caseStudy: CaseStudy };

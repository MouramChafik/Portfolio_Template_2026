import { typoDeep } from "@/lib/typo";
import type { Link } from "./types";

/*
 * IDENTITÉ DU SITE, commencez par ce fichier.
 * Écrivez normalement : apostrophes, espaces avant « ? » ou « : » et
 * guillemets sont corrigés automatiquement (src/lib/typo.ts).
 */
export const site = typoDeep({
  name: "James Dupont",
  firstName: "James",
  role: "Designer UI/UX",
  city: "Lyon",
  /** Fuseau horaire de l'horloge affichée dans l'introduction. */
  timeZone: "Europe/Paris",
  email: "bonjour@example.com",
  /**
   * Adresse publique du site (sans barre finale) : sert au SEO et aux images
   * de partage. NEXT_PUBLIC_SITE_URL la remplace au build (GitHub Pages).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  title: "James Dupont, designer UI/UX à Lyon",
  description:
    "James Dupont, designer UI/UX à Lyon. Recherche utilisateur, design d'interface et design systems pour des produits complexes : banque, santé, logistique.",

  available: true,
  availability: "Disponible à partir de janvier 2027",

  /** Mention « Créé par » du pied de page. */
  credit: { label: "Mouram Chafik", href: "https://github.com/MouramChafik" },

  /** Date de dernière mise à jour du contenu (format AAAA-MM-JJ). */
  updatedAt: "2026-10-02",

  nav: [
    { label: "Projets", href: "/#projets" },
    { label: "Profil", href: "/#profil" },
    { label: "Méthode", href: "/#methode" },
    { label: "Contact", href: "/#contact" },
  ] satisfies Link[],

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ] satisfies Link[],
});

/**
 * Formulaire de contact : laissez vide pour ouvrir la messagerie du visiteur
 * avec le message prérempli, ou renseignez NEXT_PUBLIC_FORM_ENDPOINT
 * (Formspree, Basin, Getform…) dans un fichier .env.local.
 */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

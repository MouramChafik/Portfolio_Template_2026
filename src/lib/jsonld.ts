import { faq, profile } from "@/content/home";
import { site } from "@/content/site";
import type { ProjectWithCaseStudy } from "@/content/types";

/* Données structurées schema.org : identité, FAQ et études de cas. */

const personId = `${site.url}/#person`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: site.updatedAt,
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      jobTitle: site.role,
      description: site.description,
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}${profile.portrait.src}`,
      address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "FR" },
      knowsAbout: profile.skills,
      sameAs: site.socials.map((social) => social.href),
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: site.updatedAt,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      url: `${site.url}/#faq-${item.id}`,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function caseStudyJsonLd(project: ProjectWithCaseStudy) {
  const url = `${site.url}/projets/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#etude`,
        name: project.caseStudy.title,
        headline: project.caseStudy.title,
        abstract: project.caseStudy.lede,
        url,
        image: project.cover ? `${site.url}${project.cover.src}` : undefined,
        dateCreated: String(project.year),
        dateModified: site.updatedAt,
        inLanguage: "fr-FR",
        genre: project.type,
        author: { "@type": "Person", "@id": personId, name: site.name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
          { "@type": "ListItem", position: 2, name: "Projets", item: `${site.url}/#projets` },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}

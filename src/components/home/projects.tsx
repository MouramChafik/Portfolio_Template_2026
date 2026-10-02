import { projectsIntro } from "@/content/home";
import { featuredProjects, otherProjects } from "@/content/projects";
import { Archive } from "./archive";
import { ProjectCard } from "./project-card";
import { SectionHead } from "./section-head";

/*
 * Grille éditoriale en quinconce, sur un cycle de 4 projets :
 * large (7 col.) / étroit décalé (4 col.) / moyen (5 col.) / large décalé (6 col.).
 * Les couvertures larges sont en 4:3, les étroites en 4:5.
 */
const layout = [
  { className: "md:col-span-7", sizes: "(min-width: 48rem) 58vw, 100vw" },
  { className: "md:col-span-4 md:col-start-9 md:mt-[clamp(3rem,1rem+8vw,9rem)]", sizes: "(min-width: 48rem) 33vw, 100vw" },
  { className: "md:col-span-5", sizes: "(min-width: 48rem) 42vw, 100vw" },
  { className: "md:col-span-6 md:col-start-7 md:mt-[clamp(3rem,1rem+8vw,9rem)]", sizes: "(min-width: 48rem) 50vw, 100vw" },
];

export function Projects() {
  return (
    <section id="projets" aria-labelledby="projets-title" className="py-section">
      <div className="frame">
        <SectionHead id="projets-title" title="Projets choisis" intro={projectsIntro} />

        <ul className="grid gap-x-gutter gap-y-module md:grid-cols-12">
          {featuredProjects.map((project, index) => {
            const slot = layout[index % layout.length];
            return (
              <li key={project.slug} className={slot.className}>
                <ProjectCard project={project} sizes={slot.sizes} eager={index < 2} />
              </li>
            );
          })}
        </ul>

        <Archive items={otherProjects} />
      </div>
    </section>
  );
}

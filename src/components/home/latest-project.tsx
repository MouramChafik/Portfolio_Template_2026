import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { RichText } from "@/components/ui/rich-text";

/** Raccourci vers le projet le plus récent, avec son résultat principal. */
export function LatestProject() {
  const project = featuredProjects[0];
  if (!project) return null;

  return (
    <Link
      href={`/projets/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group grid grid-cols-[7.5rem_1fr] items-center gap-4 rounded-md border border-line p-3 no-underline transition-colors duration-200 hover:border-line-strong hover:bg-surface-soft"
    >
      <span className="block aspect-[4/3] overflow-hidden rounded-sm bg-surface">
        <Image
          src={project.cover.src}
          alt=""
          width={240}
          height={180}
          sizes="120px"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </span>
      <span className="grid gap-1">
        <span className="text-sm text-ink-muted">Dernier projet</span>
        <span className="font-semibold font-stretch-108% group-hover:underline">{project.name}</span>
        <span className="text-sm">
          <RichText text={project.result} />
        </span>
      </span>
    </Link>
  );
}

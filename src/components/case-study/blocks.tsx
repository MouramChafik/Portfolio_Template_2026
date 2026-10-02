import Image from "next/image";
import type { Block } from "@/content/types";
import { FadeIn } from "@/components/motion/fade-in";
import { MediaReveal } from "@/components/motion/media-reveal";
import { RichText } from "@/components/ui/rich-text";
import { Compare } from "./compare";
import { Stickies } from "./stickies";

/** Affiche les blocs d'une section d'étude de cas (voir Block dans content/types.ts). */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-5 max-w-[64ch]">
          <RichText text={block.text} />
        </p>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="mt-6 grid max-w-[64ch] gap-3">
          {block.items.map((item, index) => (
            <li key={item} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="tabular font-semibold text-ink-muted" aria-hidden="true">
                {block.ordered ? `${index + 1}.` : "—"}
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </List>
      );
    }

    case "callout":
      return (
        <FadeIn className="my-10 border-l-[3px] border-ink py-1 pl-6">
          <p className="mb-2 text-sm text-ink-muted">{block.label}</p>
          <p className="max-w-[30ch] text-2xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance font-stretch-110%">
            {block.text}
          </p>
        </FadeIn>
      );

    case "image":
      return (
        <figure className="my-10">
          <MediaReveal className="border border-line">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
              sizes="(min-width: 64rem) 66vw, 94vw"
              className="h-auto w-full"
            />
          </MediaReveal>
          {block.caption && <figcaption className="mt-3 text-sm text-ink-muted">{block.caption}</figcaption>}
        </figure>
      );

    case "compare":
      return <Compare before={block.before} after={block.after} caption={block.caption} />;

    case "stickies":
      return <Stickies items={block.items} />;

    case "facts":
      return (
        <dl className="my-8 grid grid-cols-2 gap-x-gutter gap-y-6 sm:grid-cols-4">
          {block.items.map((item) => (
            <div key={item.label} className="grid content-start gap-1 border-t border-line pt-3">
              <dt className="sr-only">{item.label}</dt>
              <dd className="order-first text-2xl leading-none font-extrabold tracking-[-0.02em] font-stretch-110%">
                {item.value}
              </dd>
              <dd className="text-sm text-ink-muted" aria-hidden="true">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "decisions":
      return (
        <ol className="my-10 grid gap-gutter md:grid-cols-3">
          {block.items.map((item, index) => (
            <li key={item.title} className="grid content-start gap-2 rounded-md bg-surface-soft p-5">
              <span className="tabular text-sm font-semibold text-ink-muted">Décision {index + 1}</span>
              <h3 className="text-lg leading-tight font-bold font-stretch-110%">{item.title}</h3>
              <p className="text-sm text-ink-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      );

    case "swatches":
      return (
        <ul className="my-10 grid grid-cols-2 gap-gutter sm:grid-cols-3 xl:grid-cols-5">
          {block.items.map((swatch) => (
            <li key={swatch.token} className="grid gap-3">
              <span
                className="block aspect-[3/2] rounded-md border border-line sm:aspect-square"
                style={{ background: swatch.hex }}
                aria-hidden="true"
              />
              <span className="grid text-sm">
                <span className="font-semibold">{swatch.name}</span>
                <code className="text-xs text-ink-muted">{swatch.hex}</code>
                <code className="text-xs text-ink-muted">{swatch.token}</code>
              </span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <FadeIn className="my-12">
          <figure className="border-t-2 border-ink pt-6">
            <blockquote>
              <p className="max-w-[28ch] text-2xl leading-[1.18] font-medium tracking-[-0.015em] text-balance font-stretch-106%">
                {block.text}
              </p>
            </blockquote>
            <figcaption className="mt-5 grid gap-0.5 text-sm">
              <span className="font-semibold">{block.name}</span>
              <span className="text-ink-muted">{block.role}</span>
            </figcaption>
          </figure>
        </FadeIn>
      );
  }
}

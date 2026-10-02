"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/content/types";

/**
 * Comparateur avant / après. Le curseur est un vrai <input type="range"> :
 * il se pilote à la souris, au doigt et au clavier (flèches).
 */
export function Compare({ before, after, caption }: { before: ImageAsset; after: ImageAsset; caption?: string }) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="my-10">
      <div
        className="relative mx-auto aspect-[390/844] w-full max-w-[22rem] select-none overflow-hidden rounded-[28px] border border-line bg-surface shadow-float"
      >
        <Image src={before.src} alt={before.alt} width={before.width} height={before.height} className="absolute inset-0 size-full object-cover" sizes="420px" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <Image src={after.src} alt={after.alt} width={after.width} height={after.height} className="size-full object-cover" sizes="420px" />
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(15_23_46/0.15)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-900 shadow-float">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="#17203a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Comparer l’écran avant et après la refonte"
          aria-valuetext={`${position} % avant, ${100 - position} % après`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <div aria-hidden="true" className="mx-auto mt-3 flex max-w-[22rem] justify-between text-sm font-semibold">
        <span>← Avant</span>
        <span>Après →</span>
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

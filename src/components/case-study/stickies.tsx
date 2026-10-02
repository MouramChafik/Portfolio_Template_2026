"use client";

import { motion } from "motion/react";

const tilts = [-2.2, 1.6, -0.8, 2.4];

/**
 * Verbatims d'entretiens, présentés comme des post-it d'atelier : le jaune
 * marque ici aussi la preuve (ce que les gens ont réellement dit).
 */
export function Stickies({ items }: { items: { quote: string; who: string }[] }) {
  return (
    <motion.ul
      className="my-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((item, index) => (
        <motion.li
          key={item.quote}
          variants={{
            hidden: { opacity: 0, y: 32, rotate: 0 },
            shown: { opacity: 1, y: 0, rotate: tilts[index % tilts.length] },
          }}
          whileHover={{ rotate: 0, y: -4, transition: { type: "spring", stiffness: 300, damping: 18 } }}
          transition={{ delay: index * 0.12, type: "spring", stiffness: 260, damping: 20 }}
          className="grid min-h-44 content-between gap-4 bg-marker p-5 text-ink-900 shadow-[0_14px_24px_-16px_rgb(15_23_46/0.45)]"
        >
          <blockquote>
            <p className="text-lg leading-snug font-medium">{item.quote}</p>
          </blockquote>
          <p className="text-sm">{item.who}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

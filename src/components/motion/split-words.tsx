"use client";

import { motion } from "motion/react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Titre révélé mot par mot, chaque mot montant depuis un masque.
 * Le texte complet reste lisible par les lecteurs d'écran.
 */
export function SplitWords({ text, delay = 0, stagger = 0.06 }: { text: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index}>
            {/*
              Masque vertical uniquement : clip-path déborde de 0,3 em sur les côtés,
              sinon l'interlettrage négatif et le débord des lettres grasses
              rognent le bord droit de la dernière lettre (les « s » finaux).
              nowrap : text-wrap: balance, hérité du titre, fausse la largeur des inline-block.
            */}
            <span className="mt-[-0.08em] mb-[-0.16em] inline-block pt-[0.08em] pb-[0.16em] align-bottom whitespace-nowrap [clip-path:inset(0_-0.3em)]">
              <motion.span
                className="inline-block whitespace-nowrap"
                initial={{ y: "130%" }}
                animate={{ y: "0%" }}
                transition={{ delay: delay + index * stagger, duration: 0.9, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}

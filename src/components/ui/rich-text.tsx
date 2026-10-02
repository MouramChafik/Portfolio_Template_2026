import { Fragment } from "react";

/**
 * Affiche un texte en transformant ==ceci== en <mark>.
 * Le surligneur jaune est réservé aux preuves : chiffres et résultats.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/==(.+?)==/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <mark key={index}>{part}</mark> : <Fragment key={index}>{part}</Fragment>,
      )}
    </>
  );
}

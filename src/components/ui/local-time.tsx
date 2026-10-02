"use client";

import { useEffect, useId, useRef } from "react";
import { InlineScript } from "./inline-script";

/**
 * Heure locale du fuseau indiqué (ex. "Europe/Paris"), mise à jour chaque
 * minute. Un script en ligne affiche la bonne heure dès le premier rendu,
 * même sur une page générée à l'avance.
 */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const id = useId();
  const ref = useRef<HTMLTimeElement>(null);
  const options = JSON.stringify({ hour: "2-digit", minute: "2-digit", timeZone });

  useEffect(() => {
    const format = new Intl.DateTimeFormat("fr-FR", JSON.parse(options));
    const tick = () => {
      if (ref.current) ref.current.textContent = format.format(new Date());
    };
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, [options]);

  return (
    <>
      <time ref={ref} id={id} className="tabular" suppressHydrationWarning>
        --:--
      </time>
      <InlineScript
        html={`(function(){var el=document.getElementById(${JSON.stringify(id)});if(el)el.textContent=new Intl.DateTimeFormat("fr-FR",${options}).format(new Date())})()`}
      />
    </>
  );
}

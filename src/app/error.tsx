"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

/* Erreur inattendue pendant l'affichage d'une page : on propose de réessayer. */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="contenu" className="frame grid min-h-[calc(100dvh-var(--spacing-header))] content-center py-section">
      <div className="grid max-w-[40rem] gap-6">
        <h1 className="type-h2">Cette page n’a pas pu s’afficher.</h1>
        <p className="type-lede text-ink-muted">
          Un problème technique a interrompu le chargement. Réessayez ; si le problème persiste, revenez à l’accueil.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => retry()}>Réessayer</Button>
          <ButtonLink href="/" variant="secondary">
            Retour à l’accueil
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}

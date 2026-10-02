/**
 * Exécute un changement d'état dans une View Transition quand le navigateur
 * le permet, sinon l'applique directement (et toujours sans animation si
 * l'utilisateur a demandé à réduire les animations).
 *
 * `className` est posée sur <html> pendant la transition pour choisir
 * l'animation en CSS (voir globals.css : .vt-theme).
 */
export function runViewTransition(update: () => void, className: string) {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof document.startViewTransition !== "function" || reduceMotion) {
    update();
    return;
  }

  root.classList.add(className);
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => root.classList.remove(className));
}

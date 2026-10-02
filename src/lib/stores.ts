/*
 * Petit store externe pour l'état porté par <html> (thème).
 * Utilisé avec useSyncExternalStore : le serveur rend l'état par défaut,
 * le client se réaligne sans erreur d'hydratation.
 */

type Listener = () => void;

function createDocumentStore(read: () => boolean) {
  const listeners = new Set<Listener>();
  return {
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => false,
    emit() {
      listeners.forEach((listener) => listener());
    },
  };
}

export const themeStore = createDocumentStore(() =>
  document.documentElement.classList.contains("is-dark"),
);

/** Écriture protégée : navigation privée ou stockage bloqué. */
export const storage = {
  set(area: "localStorage" | "sessionStorage", key: string, value: string) {
    try {
      window[area].setItem(key, value);
    } catch {
      /* stockage indisponible : l'état reste en mémoire */
    }
  },
};

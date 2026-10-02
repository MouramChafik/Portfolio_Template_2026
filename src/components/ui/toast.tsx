"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type ToastMessage = { id: number; text: string };

const ToastContext = createContext<(text: string) => void>(() => {});

/** Affiche une courte confirmation, aussi annoncée aux lecteurs d'écran. */
export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const show = useCallback((text: string) => setMessage({ id: Date.now(), text }), []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <p role="status" aria-live="polite" className="sr-only">
        {message?.text}
      </p>
      <AnimatePresence>
        {message && (
          <motion.p
            key={message.id}
            aria-hidden="true"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="no-print fixed bottom-6 left-1/2 z-70 -translate-x-1/2 rounded-sm bg-action px-4.5 py-3 text-sm font-semibold text-on-action shadow-float"
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

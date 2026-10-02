"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "./button";
import { Check, Copy } from "./icons";
import { useToast } from "./toast";

/** Copie un texte (l'adresse e-mail) et confirme l'action. */
export function CopyButton({ value }: { value: string }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.append(field);
      field.select();
      ok = document.execCommand("copy");
      field.remove();
    }
    toast(ok ? "Adresse copiée" : `Copie impossible : sélectionnez ${value} à la main.`);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
          className="inline-flex"
        >
          {copied ? <Check /> : <Copy />}
        </motion.span>
      </AnimatePresence>
      {copied ? "Adresse copiée" : "Copier l’adresse"}
    </Button>
  );
}

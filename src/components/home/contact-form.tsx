"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { contact } from "@/content/home";
import { formEndpoint, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/icons";

type FieldName = "nom" | "email" | "message";
type Status = { type: "success" | "error"; text: string } | null;

const requiredMessages: Record<FieldName, string> = {
  nom: "Indiquez votre nom.",
  email: "Indiquez votre adresse e-mail.",
  message: "Écrivez quelques lignes sur votre projet.",
};

function validate(field: HTMLInputElement | HTMLTextAreaElement): string | null {
  if (field.validity.valueMissing) return requiredMessages[field.name as FieldName];
  if (field.validity.typeMismatch) return "Cette adresse semble incomplète. Exemple : nom@domaine.fr";
  return null;
}

const inputClasses =
  "w-full min-h-12 rounded-sm border border-line-strong bg-canvas px-3.5 py-2.5 text-base leading-snug " +
  "transition-colors duration-200 hover:border-ink-muted focus-visible:border-focus focus-visible:outline-offset-1 " +
  "aria-[invalid=true]:border-danger";

/**
 * Sans service configuré, le formulaire ouvre la messagerie du visiteur avec
 * le message prérempli. Avec NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Basin…),
 * il envoie directement.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  function check(field: HTMLInputElement | HTMLTextAreaElement) {
    const error = validate(field);
    setErrors((current) => ({ ...current, [field.name]: error ?? undefined }));
    return error;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const fields = Array.from(element.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]"));
    const invalid = fields.filter((field) => check(field));
    if (invalid.length) {
      invalid[0].focus();
      setStatus({ type: "error", text: "Le message n’est pas parti : corrigez les champs signalés." });
      return;
    }

    const data = new FormData(element);

    if (!formEndpoint) {
      const subject = `Nouveau projet : ${data.get("type") || "à préciser"} (${data.get("nom")})`;
      const lines = [
        String(data.get("message")),
        "",
        `Nom : ${data.get("nom")}`,
        `E-mail : ${data.get("email")}`,
        data.get("entreprise") ? `Entreprise : ${data.get("entreprise")}` : null,
        `Budget : ${data.get("budget") || "non précisé"}`,
      ].filter((line) => line !== null);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      setStatus({ type: "success", text: "Votre messagerie s’ouvre avec le message prérempli : il ne reste qu’à l’envoyer." });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const response = await fetch(formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(String(response.status));
      element.reset();
      setStatus({ type: "success", text: "Message envoyé. Je vous réponds sous 48 heures." });
    } catch {
      setStatus({ type: "error", text: `L’envoi a échoué. Réessayez, ou écrivez directement à ${site.email}.` });
    } finally {
      setSending(false);
    }
  }

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-error`} className="flex items-center gap-2 text-sm font-medium text-danger [&_svg]:size-4">
        <Alert /> {errors[name]}
      </p>
    ) : null;

  const onBlur = (event: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    if (event.target.value) check(event.target);
  };
  const onInput = (event: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    if (errors[event.target.name as FieldName]) check(event.target);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <div className="grid gap-2">
        <label htmlFor="nom" className="text-sm font-semibold">Nom</label>
        <input id="nom" name="nom" autoComplete="name" required className={inputClasses}
          aria-invalid={errors.nom ? true : undefined} aria-describedby={errors.nom ? "nom-error" : undefined}
          onBlur={onBlur} onChange={onInput} />
        {fieldError("nom")}
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className={inputClasses}
          aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "email-error" : undefined}
          onBlur={onBlur} onChange={onInput} />
        {fieldError("email")}
      </div>

      <div className="grid gap-2">
        <label htmlFor="entreprise" className="text-sm font-semibold">
          Entreprise <span className="font-normal text-ink-muted">(facultatif)</span>
        </label>
        <input id="entreprise" name="entreprise" autoComplete="organization" className={inputClasses} />
      </div>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-semibold">Type de projet</legend>
        <div className="flex flex-wrap gap-2">
          {contact.projectTypes.map((type) => (
            <label key={type} className="relative">
              <input type="radio" name="type" value={type} className="peer absolute inset-0 cursor-pointer opacity-0" />
              <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors duration-200 peer-hover:border-ink peer-checked:border-action peer-checked:bg-action peer-checked:text-on-action peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <label htmlFor="budget" className="text-sm font-semibold">Budget estimé</label>
        <div className="relative after:pointer-events-none after:absolute after:top-1/2 after:right-4 after:size-2 after:-translate-y-[70%] after:rotate-45 after:border-r-[1.5px] after:border-b-[1.5px] after:border-current after:content-['']">
          <select id="budget" name="budget" defaultValue="" className={cn(inputClasses, "cursor-pointer appearance-none pr-11")}>
            <option value="" disabled>Choisir une fourchette</option>
            {contact.budgets.map((budget) => (
              <option key={budget} value={budget}>{budget}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold">Votre message</label>
        <textarea id="message" name="message" required rows={5} className={cn(inputClasses, "min-h-36 resize-y")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
          onBlur={onBlur} onChange={onInput} />
        <p id="message-hint" className="text-xs text-ink-muted">
          Quelques lignes suffisent : le produit, son public, votre échéance.
        </p>
        {fieldError("message")}
      </div>

      <Button type="submit" disabled={sending} className="w-full">
        {sending ? "Envoi en cours…" : "Envoyer le message"}
      </Button>

      <div role="status" aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {status && (
            <motion.p
              key={status.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn("text-sm font-medium", status.type === "success" ? "text-success" : "text-danger")}
            >
              {status.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

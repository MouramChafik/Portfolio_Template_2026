import { contact } from "@/content/home";
import { site } from "@/content/site";
import { FadeIn } from "@/components/motion/fade-in";
import { CopyButton } from "@/components/ui/copy-button";
import { ArrowUpRight } from "@/components/ui/icons";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-surface-soft py-section">
      <div className="frame grid gap-module lg:grid-cols-12 lg:gap-x-gutter">
        <FadeIn className="grid content-start gap-5 lg:col-span-6">
          <h2 id="contact-title" className="type-h2">
            {contact.title}
          </h2>
          <p className="type-lede max-w-[40ch]">{contact.text}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="text-xl font-semibold tracking-[-0.015em] decoration-2 underline-offset-[0.16em] wrap-anywhere font-stretch-112% lg:text-2xl"
            >
              {site.email}
            </a>
            <CopyButton value={site.email} />
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-medium" aria-label="Réseaux">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  rel="me noopener"
                  target="_blank"
                  className="inline-flex min-h-11 items-center gap-1 no-underline hover:underline [&_svg]:size-[0.9em]"
                >
                  {social.label}
                  <ArrowUpRight />
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}

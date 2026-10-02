import { ViewTransition } from "react";
import { faqJsonLd, personJsonLd } from "@/lib/jsonld";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Method } from "@/components/home/method";
import { Profile } from "@/components/home/profile";
import { Projects } from "@/components/home/projects";
import { Testimonials } from "@/components/home/testimonials";
import { JsonLd } from "@/components/ui/json-ld";

/* Ordre des sections : réorganisez-les librement ici. */
export default function HomePage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <main id="contenu">
        <Hero />
        <Projects />
        <Profile />
        <Method />
        <Testimonials />
        <Faq />
        <Contact />
        <JsonLd data={personJsonLd()} />
        <JsonLd data={faqJsonLd()} />
      </main>
    </ViewTransition>
  );
}

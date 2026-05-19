import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Une question, une suggestion d'outil ou un bug à signaler ? Contacte l'équipe Toolify par email.",
  path: "/contact",
});

const CONTACT_EMAIL = "aymenbenchhaaben@gmail.com";

export default function ContactPage() {
  return (
    <article className="site-shell px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <h1 className="mb-3 text-[clamp(2rem,5vw,2.75rem)] font-bold tracking-[-0.035em]">
        Contact
      </h1>
      <p className="mb-8 text-[1.1rem] leading-relaxed text-muted">
        Une question, une idée d&apos;outil ou un bug à signaler ? Écris-nous,
        chaque message est lu.
      </p>

      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[14px] bg-cat-text">
          <Mail size={28} className="text-cat-textInk" strokeWidth={2} />
        </div>
        <h2 className="mb-1 text-[1.15rem] font-semibold">Par email</h2>
        <p className="mb-5 text-[0.95rem] text-hint">
          Réponse généralement sous 48 heures.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-6 py-3 text-[0.95rem] font-medium text-bg transition-opacity hover:opacity-90"
        >
          <Mail size={16} strokeWidth={2} />
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className="tool-prose mt-10">
        <h2>À propos de tes fichiers</h2>
        <p>
          Inutile de nous envoyer tes fichiers pour obtenir de l&apos;aide : nos
          outils fonctionnent entièrement dans ton navigateur et nous n&apos;y
          avons jamais accès. Si un outil ne se comporte pas comme prévu,
          décris-nous simplement les étapes et le type de fichier concerné, et
          nous étudierons le problème.
        </p>
        <h2>Proposer un outil</h2>
        <p>
          Toolify s&apos;enrichit régulièrement de nouveaux outils. Si tu as
          besoin d&apos;un utilitaire qui n&apos;existe pas encore ici,
          n&apos;hésite pas à nous le suggérer — les meilleures idées viennent
          souvent des utilisateurs.
        </p>
      </div>
    </article>
  );
}

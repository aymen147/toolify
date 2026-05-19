import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import ImageToPdfTool from "@/components/tools/ImageToPdfTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("image-to-pdf")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Ajoute tes images",
    body: "Glisse-dépose plusieurs JPG ou PNG dans la zone, ou clique pour les sélectionner en une fois.",
  },
  {
    title: "Réorganise l'ordre",
    body: "Utilise les boutons Monter / Descendre pour positionner chaque image dans l'ordre voulu.",
  },
  {
    title: "Choisis le format de page",
    body: "A4, Letter, orientation portrait ou paysage — adapte la mise en page à ton usage.",
  },
  {
    title: "Génère et télécharge le PDF",
    body: "Toutes les images sont combinées en un PDF unique, prêt à télécharger.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Combien d'images puis-je convertir en un seul PDF ?",
    a: "Il n'y a pas de limite fixe. Chaque image devient une page du PDF. Pour un très grand nombre d'images, le traitement peut prendre quelques secondes selon ton appareil.",
  },
  {
    q: "Comment changer l'ordre des images ?",
    a: "Chaque image de la liste dispose de flèches « monter » et « descendre ». L'ordre de la liste correspond exactement à l'ordre des pages dans le PDF final.",
  },
  {
    q: "Quelle différence entre A4 et Letter ?",
    a: "A4 est le format standard en Europe, Letter aux États-Unis et au Canada. Choisis celui attendu par ton imprimeur ou ton destinataire.",
  },
  {
    q: "Que se passe-t-il avec les images transparentes ?",
    a: "Un PDF n'affiche pas la transparence comme une image PNG. Les zones transparentes sont placées sur un fond blanc lors de la conversion.",
  },
  {
    q: "Mes images sont-elles envoyées sur un serveur ?",
    a: "Non. Le PDF est assemblé entièrement dans ton navigateur. Aucune image n'est téléversée : tes documents restent privés.",
  },
  {
    q: "L'image est-elle déformée dans le PDF ?",
    a: "Non. Chaque image est redimensionnée proportionnellement pour tenir dans la page choisie, puis centrée. Ses proportions d'origine sont conservées.",
  },
];

const content = (
  <>
    <h2>Comment convertir des images en PDF</h2>
    <p>
      Rassembler plusieurs images dans un seul PDF avec Toolify est simple et
      rapide :
    </p>
    <ol>
      <li>
        Dépose ou sélectionne toutes les images à inclure — tu peux en ajouter
        plusieurs d&apos;un coup.
      </li>
      <li>
        Réorganise la liste avec les flèches : son ordre détermine l&apos;ordre
        des pages.
      </li>
      <li>Choisis le format de page (A4 ou Letter) et l&apos;orientation.</li>
      <li>
        Clique sur « Générer le PDF » : le fichier est créé et téléchargé
        automatiquement.
      </li>
    </ol>
    <p>
      Chaque image occupe une page, redimensionnée proportionnellement pour
      tenir dans le format choisi sans déformation. Tout l&apos;assemblage se
      déroule dans ton navigateur grâce à une bibliothèque JavaScript dédiée :
      aucune image n&apos;est envoyée sur un serveur.
    </p>

    <h2>Pourquoi convertir des images en PDF</h2>
    <p>
      Le PDF est le format universel du document : il s&apos;ouvre de la même
      manière sur tous les appareils, s&apos;imprime sans surprise et regroupe
      plusieurs images en un seul fichier facile à envoyer. Plutôt que de
      joindre dix photos à un email, un seul PDF suffit.
    </p>
    <p>
      C&apos;est particulièrement utile pour numériser des documents pris en
      photo — justificatifs, notes manuscrites, pages de contrat — et les
      transmettre dans un ordre logique. Un portfolio, un catalogue ou un
      dossier d&apos;images gagnent aussi en présentation une fois réunis dans
      un PDF paginé.
    </p>
  </>
);

export default function ImageToPdfPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <ImageToPdfTool />
    </ToolLayout>
  );
}

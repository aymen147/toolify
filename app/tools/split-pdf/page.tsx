import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import SplitPdfTool from "@/components/tools/SplitPdfTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("split-pdf")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Importe ton PDF",
    body: "Sélectionne le PDF dont tu veux extraire des pages — glisse-dépose ou clique pour parcourir.",
  },
  {
    title: "Parcours l'aperçu des pages",
    body: "Chaque page s'affiche en vignette, numérotée, pour t'aider à repérer ce que tu veux garder.",
  },
  {
    title: "Sélectionne les pages à conserver",
    body: "Coche les pages voulues. Tu peux en garder une seule, plusieurs, ou une plage continue.",
  },
  {
    title: "Génère le nouveau PDF",
    body: "Toolify crée un PDF ne contenant que tes pages sélectionnées, prêt à télécharger.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Comment sélectionner les pages à extraire ?",
    a: "Clique simplement sur l'aperçu d'une page pour la cocher ou la décocher. Tu peux aussi tout sélectionner ou tout désélectionner d'un clic.",
  },
  {
    q: "Les pages extraites gardent-elles leur ordre ?",
    a: "Oui. Les pages sélectionnées sont placées dans le nouveau PDF dans leur ordre d'origine, quel que soit l'ordre dans lequel tu les as cochées.",
  },
  {
    q: "Le PDF d'origine est-il modifié ?",
    a: "Non. L'outil crée un nouveau fichier contenant uniquement les pages choisies. Ton document de départ reste intact sur ton appareil.",
  },
  {
    q: "Pourquoi l'analyse du PDF prend-elle quelques secondes ?",
    a: "Toolify génère un aperçu visuel de chaque page pour t'aider à choisir. Plus le document compte de pages, plus cette étape est longue, mais elle reste rapide.",
  },
  {
    q: "Puis-je découper un PDF protégé par mot de passe ?",
    a: "Non. Un PDF chiffré doit d'abord être déverrouillé. Si le fichier est protégé ou endommagé, l'outil affiche un message d'erreur.",
  },
  {
    q: "Mes fichiers sont-ils envoyés sur un serveur ?",
    a: "Jamais. La lecture des pages et la création du nouveau PDF se font entièrement dans ton navigateur. Aucun document n'est téléversé.",
  },
];

const content = (
  <>
    <h2>Comment extraire des pages d&apos;un PDF</h2>
    <p>
      Récupérer une partie d&apos;un PDF avec Toolify se fait en quelques
      clics :
    </p>
    <ol>
      <li>Importe le fichier PDF à découper.</li>
      <li>
        Patiente quelques instants : un aperçu de chaque page est généré
        automatiquement.
      </li>
      <li>
        Clique sur les pages que tu souhaites conserver pour les cocher.
      </li>
      <li>
        Clique sur « Extraire les pages sélectionnées » pour télécharger un
        nouveau PDF ne contenant que ces pages.
      </li>
    </ol>
    <p>
      Les aperçus sont rendus dans ton navigateur, et le nouveau document est
      assemblé localement avec une bibliothèque PDF dédiée. À aucun moment ton
      fichier n&apos;est envoyé sur internet : il reste entièrement privé.
    </p>

    <h2>Pourquoi découper un PDF</h2>
    <p>
      Un PDF contient souvent plus de pages que nécessaire. Tu peux vouloir
      isoler un seul chapitre d&apos;un rapport, extraire une facture précise
      d&apos;un relevé annuel, ne garder que les pages signées d&apos;un contrat
      ou retirer des pages confidentielles avant de partager un document.
    </p>
    <p>
      Découper plutôt que d&apos;envoyer le fichier entier rend le partage plus
      léger, plus clair et plus respectueux de la confidentialité : le
      destinataire ne reçoit que ce qui le concerne. C&apos;est aussi pratique
      pour archiver séparément les différentes parties d&apos;un long document.
    </p>
  </>
);

export default function SplitPdfPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <SplitPdfTool />
    </ToolLayout>
  );
}

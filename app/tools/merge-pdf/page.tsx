import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import MergePdfTool from "@/components/tools/MergePdfTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("merge-pdf")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Sélectionne tes fichiers PDF",
    body: "Glisse plusieurs PDF dans la zone, ou clique pour les choisir un par un.",
  },
  {
    title: "Réordonne par glisser-déposer",
    body: "Utilise les boutons Monter / Descendre pour fixer l'ordre exact des documents dans le PDF final.",
  },
  {
    title: "Lance la fusion",
    body: "Clique sur Fusionner — l'opération se fait localement, même sur de gros fichiers.",
  },
  {
    title: "Télécharge le PDF combiné",
    body: "Le fichier unique est prêt à enregistrer. Tes PDF d'origine restent intacts.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Combien de PDF puis-je fusionner ?",
    a: "Autant que tu veux. Les fichiers sont assemblés dans l'ordre de la liste, et toutes leurs pages sont conservées.",
  },
  {
    q: "Comment changer l'ordre des fichiers ?",
    a: "Utilise les flèches « monter » et « descendre » sur chaque fichier. Le PDF final suit exactement l'ordre affiché à l'écran.",
  },
  {
    q: "La mise en page des PDF est-elle conservée ?",
    a: "Oui. Chaque page est copiée telle quelle, avec sa taille, ses polices et ses images. La fusion ne modifie pas le contenu.",
  },
  {
    q: "Puis-je fusionner un PDF protégé par mot de passe ?",
    a: "Non. Les PDF chiffrés doivent d'abord être déverrouillés. Si un fichier est protégé ou endommagé, la fusion s'interrompt avec un message d'erreur.",
  },
  {
    q: "Mes fichiers sont-ils envoyés sur un serveur ?",
    a: "Jamais. La fusion s'effectue intégralement dans ton navigateur. Aucun document n'est téléversé ni conservé ailleurs que sur ton appareil.",
  },
  {
    q: "Y a-t-il une limite de taille ?",
    a: "Tu peux fusionner des fichiers jusqu'à 100 Mo chacun. Pour de très gros documents, le traitement dépend de la mémoire disponible sur ton appareil.",
  },
];

const content = (
  <>
    <h2>Comment fusionner des fichiers PDF</h2>
    <p>Combiner plusieurs PDF en un seul document avec Toolify est immédiat :</p>
    <ol>
      <li>
        Dépose ou sélectionne les fichiers PDF à fusionner — tu peux en ajouter
        plusieurs d&apos;un coup.
      </li>
      <li>
        Réorganise la liste avec les flèches pour définir l&apos;ordre des
        documents.
      </li>
      <li>
        Retire un fichier si besoin, ou ajoute-en d&apos;autres à tout moment.
      </li>
      <li>
        Clique sur « Fusionner les PDF » : le document combiné est créé et
        téléchargé automatiquement.
      </li>
    </ol>
    <p>
      Toutes les pages de chaque fichier sont copiées dans l&apos;ordre choisi,
      sans altération de leur contenu ni de leur mise en page. L&apos;opération
      se déroule entièrement dans ton navigateur grâce à une bibliothèque PDF
      moderne : aucun document n&apos;est envoyé sur internet.
    </p>

    <h2>Pourquoi fusionner des PDF</h2>
    <p>
      Au quotidien, les documents arrivent souvent en plusieurs fichiers
      séparés : un contrat et ses annexes, plusieurs factures, les chapitres
      d&apos;un rapport ou les pièces d&apos;un dossier administratif. Les
      réunir en un seul PDF simplifie l&apos;envoi, l&apos;archivage et
      l&apos;impression.
    </p>
    <p>
      Un document unique est aussi plus professionnel et plus facile à
      consulter : le destinataire n&apos;a qu&apos;un fichier à ouvrir, dans le
      bon ordre, sans risque d&apos;en oublier une partie. C&apos;est
      particulièrement utile pour les candidatures, les dossiers de prêt ou tout
      envoi qui doit respecter une structure précise.
    </p>
  </>
);

export default function MergePdfPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <MergePdfTool />
    </ToolLayout>
  );
}

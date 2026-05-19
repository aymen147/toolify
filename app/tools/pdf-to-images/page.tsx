import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import PdfToImagesTool from "@/components/tools/PdfToImagesTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("pdf-to-images")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Importe ton PDF",
    body: "Glisse le fichier dans la zone de dépôt ou clique pour le sélectionner. Aucune limite de taille pratique.",
  },
  {
    title: "Choisis le format de sortie",
    body: "JPG pour des photos plus légères, PNG si tu as besoin de transparence ou d'une qualité maximale.",
  },
  {
    title: "Lance la conversion",
    body: "Chaque page du PDF est rendue en image — l'opération se fait dans ton navigateur.",
  },
  {
    title: "Télécharge les images",
    body: "Récupère les images une par une ou en archive ZIP si le PDF compte plusieurs pages.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Chaque page devient-elle une image séparée ?",
    a: "Oui. Chaque page du PDF est convertie en une image distincte que tu peux télécharger individuellement, ou toutes en une fois.",
  },
  {
    q: "Faut-il choisir le JPG ou le PNG ?",
    a: "Le JPG donne des fichiers plus légers, idéal pour des pages riches en images. Le PNG est sans perte et plus net pour les pages contenant surtout du texte ou des graphiques.",
  },
  {
    q: "Quelle est la qualité des images obtenues ?",
    a: "Les pages sont rendues à une résolution doublée pour rester nettes, y compris à l'impression ou en cas de zoom.",
  },
  {
    q: "Puis-je convertir un PDF protégé par mot de passe ?",
    a: "Non. Un PDF chiffré doit d'abord être déverrouillé. Si le fichier est protégé ou endommagé, l'outil affiche un message d'erreur.",
  },
  {
    q: "Mes fichiers sont-ils envoyés sur un serveur ?",
    a: "Jamais. La lecture du PDF et la création des images se font entièrement dans ton navigateur. Aucun document n'est téléversé.",
  },
  {
    q: "Pourquoi le bouton « Tout télécharger » lance-t-il plusieurs téléchargements ?",
    a: "Chaque page étant un fichier séparé, l'outil enregistre les images une par une. Ton navigateur peut demander l'autorisation de télécharger plusieurs fichiers : accepte-la.",
  },
];

const content = (
  <>
    <h2>Comment convertir un PDF en images</h2>
    <p>Extraire les pages d&apos;un PDF sous forme d&apos;images est immédiat :</p>
    <ol>
      <li>Importe le fichier PDF à convertir.</li>
      <li>
        Patiente quelques instants : chaque page est rendue sous forme
        d&apos;image.
      </li>
      <li>Choisis le format de sortie souhaité, JPG ou PNG.</li>
      <li>
        Télécharge les pages une par une, ou toutes d&apos;un coup avec « Tout
        télécharger ».
      </li>
    </ol>
    <p>
      Les pages sont rendues à haute résolution directement dans ton navigateur,
      puis encodées dans le format choisi. Aucun fichier n&apos;est envoyé sur
      internet : ton document reste entièrement privé.
    </p>

    <h2>Pourquoi convertir un PDF en images</h2>
    <p>
      Une image s&apos;intègre là où un PDF ne passe pas : dans une présentation,
      un document de traitement de texte, un message ou une publication sur les
      réseaux sociaux. Convertir une page de PDF en JPG ou PNG permet de la
      réutiliser librement.
    </p>
    <p>
      C&apos;est aussi pratique pour partager un aperçu rapide sans imposer
      l&apos;ouverture d&apos;un PDF, pour archiver visuellement certaines pages,
      ou pour récupérer un graphique ou un schéma contenu dans un document. Cet
      outil complète naturellement les autres outils PDF de Toolify.
    </p>
  </>
);

export default function PdfToImagesPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <PdfToImagesTool />
    </ToolLayout>
  );
}

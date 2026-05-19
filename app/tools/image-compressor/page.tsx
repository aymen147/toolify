import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("image-compressor")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Importe ton image",
    body: "Glisse ton JPG, PNG ou WebP dans la zone de dépôt, ou clique pour le sélectionner sur ton appareil.",
  },
  {
    title: "Ajuste la qualité",
    body: "Déplace le curseur pour trouver le bon compromis entre poids et netteté. 75 % est un point de départ sûr.",
  },
  {
    title: "Compare avant / après",
    body: "L'aperçu et le pourcentage de réduction se mettent à jour à chaque essai — ajuste jusqu'à être satisfait.",
  },
  {
    title: "Télécharge le résultat",
    body: "Clique sur Télécharger pour enregistrer la version compressée. Rien n'a quitté ton navigateur.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Quels formats d'image sont supportés ?",
    a: "JPG, JPEG, PNG et WebP. Tu peux compresser des images jusqu'à 50 Mo. Au-delà, ton navigateur risque de manquer de mémoire.",
  },
  {
    q: "La qualité de l'image va-t-elle baisser ?",
    a: "Une légère perte est inévitable, mais entre 70 et 85 % de qualité elle est invisible à l'œil nu. Baisse le curseur pour gagner plus d'espace, monte-le pour préserver les détails.",
  },
  {
    q: "Mes images sont-elles envoyées sur un serveur ?",
    a: "Non, jamais. La compression se fait entièrement dans ton navigateur. Tu peux même couper internet après le chargement de la page : l'outil continue de fonctionner.",
  },
  {
    q: "Pourquoi compresser une image plutôt que de la redimensionner ?",
    a: "La compression réduit le poids du fichier en conservant les dimensions. Le redimensionnement change la taille en pixels. Pour un gain maximal, les deux peuvent être combinés.",
  },
  {
    q: "Puis-je compresser plusieurs images à la fois ?",
    a: "Pour l'instant, l'outil traite une image à la fois afin de garantir un résultat optimal. Tu peux enchaîner les fichiers avec le bouton « Nouveau fichier ».",
  },
  {
    q: "Quel pourcentage de réduction puis-je espérer ?",
    a: "Cela dépend de l'image, mais une photo de 3 Mo passe souvent sous 500 Ko sans différence visible. Les captures d'écran et images peu détaillées se compressent encore davantage.",
  },
];

const content = (
  <>
    <h2>Comment compresser une image</h2>
    <p>
      Réduire le poids d&apos;une image avec Toolify prend moins de dix
      secondes :
    </p>
    <ol>
      <li>
        Glisse ton image dans la zone de dépôt, ou clique pour la sélectionner
        depuis ton appareil.
      </li>
      <li>
        Ajuste le curseur de qualité — 75 % offre un bon compromis entre poids
        et netteté.
      </li>
      <li>
        Compare les aperçus « Avant » et « Après » ainsi que le pourcentage de
        réduction affiché.
      </li>
      <li>
        Clique sur « Télécharger » pour enregistrer ta version compressée.
      </li>
    </ol>
    <p>
      La compression s&apos;effectue dans ton navigateur grâce à une
      bibliothèque JavaScript moderne, exécutée dans un thread dédié pour ne pas
      figer la page. L&apos;aperçu se recalcule automatiquement à chaque
      changement de qualité, ce qui te permet de trouver le bon équilibre en
      quelques essais. Aucune image n&apos;est téléversée : tes fichiers restent
      sur ton ordinateur du début à la fin.
    </p>

    <h2>Pourquoi compresser tes images</h2>
    <p>
      Les images représentent souvent la majeure partie du poids d&apos;une page
      web ou d&apos;un email. Les compresser accélère le chargement des sites,
      économise les données mobiles de tes visiteurs et améliore le
      référencement, car la vitesse est un critère pris en compte par les
      moteurs de recherche.
    </p>
    <p>
      La compression est aussi pratique au quotidien : elle permet de respecter
      la limite de pièce jointe des messageries (souvent 25 Mo), d&apos;envoyer
      des photos plus rapidement ou de libérer de l&apos;espace de stockage. Un
      algorithme intelligent réduit le fichier tout en préservant la qualité
      visuelle, pour un résultat indiscernable de l&apos;original dans la
      plupart des cas.
    </p>
  </>
);

export default function ImageCompressorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <ImageCompressorTool />
    </ToolLayout>
  );
}

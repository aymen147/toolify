import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import ImageResizerTool from "@/components/tools/ImageResizerTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("image-resizer")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Importe ton image",
    body: "Glisse ton fichier JPG, PNG ou WebP dans la zone de dépôt, ou clique pour le sélectionner.",
  },
  {
    title: "Saisis les nouvelles dimensions",
    body: "Entre une largeur ou une hauteur en pixels. Si « Conserver les proportions » est activé, l'autre côté s'ajuste tout seul.",
  },
  {
    title: "Vérifie l'aperçu",
    body: "Le rendu et les dimensions finales s'affichent en direct — règle au pixel près si besoin.",
  },
  {
    title: "Télécharge l'image",
    body: "Clique sur Télécharger pour récupérer le fichier redimensionné, dans le même format que l'original.",
  },
];

const faq: FaqItem[] = [
  {
    q: "À quoi sert l'option « Conserver les proportions » ?",
    a: "Quand elle est activée, modifier la largeur ajuste automatiquement la hauteur (et inversement) pour éviter de déformer l'image. Désactive-la seulement si tu veux étirer l'image volontairement.",
  },
  {
    q: "Puis-je agrandir une image ?",
    a: "Oui, mais agrandir au-delà de sa taille d'origine fait apparaître du flou ou des pixels, car l'outil ne peut pas inventer de détails. Pour de meilleurs résultats, redimensionne vers le bas.",
  },
  {
    q: "Quels formats sont pris en charge ?",
    a: "JPG, PNG et WebP, jusqu'à 50 Mo. L'image redimensionnée conserve le format d'origine.",
  },
  {
    q: "Mes images sont-elles envoyées sur un serveur ?",
    a: "Non. Le redimensionnement utilise le Canvas de ton navigateur. Aucune image n'est téléversée ni stockée ailleurs que sur ton appareil.",
  },
  {
    q: "Quelle différence avec la compression d'image ?",
    a: "Le redimensionnement change les dimensions en pixels. La compression réduit le poids du fichier sans toucher aux dimensions. Réduire la taille en pixels diminue aussi naturellement le poids.",
  },
  {
    q: "Comment connaître les dimensions idéales ?",
    a: "Cela dépend de l'usage : une photo de profil fait souvent 400×400 px, une image d'article de blog environ 1200 px de large. Vérifie les recommandations de la plateforme visée.",
  },
];

const content = (
  <>
    <h2>Comment redimensionner une image</h2>
    <p>
      Changer les dimensions d&apos;une image avec Toolify est immédiat :
    </p>
    <ol>
      <li>Importe ton image en la déposant ou en la sélectionnant.</li>
      <li>
        Les dimensions d&apos;origine s&apos;affichent — saisis la nouvelle
        largeur ou hauteur souhaitée.
      </li>
      <li>
        Laisse « Conserver les proportions » activé pour éviter toute
        déformation, ou désactive-la pour un redimensionnement libre.
      </li>
      <li>
        Observe l&apos;aperçu en direct, puis clique sur « Télécharger » pour
        enregistrer l&apos;image redimensionnée.
      </li>
    </ol>
    <p>
      Le redimensionnement s&apos;appuie sur l&apos;API Canvas du navigateur :
      l&apos;image est redessinée aux nouvelles dimensions, puis exportée dans
      son format d&apos;origine. L&apos;aperçu se met à jour automatiquement à
      chaque modification, sans rechargement de page et sans envoi sur un
      serveur.
    </p>

    <h2>Pourquoi redimensionner une image</h2>
    <p>
      Les appareils photo et les téléphones produisent des images bien plus
      grandes que nécessaire. Publier une photo de 6000 pixels de large sur un
      site qui n&apos;en affiche que 1200 gaspille de la bande passante et
      ralentit le chargement. Redimensionner à la bonne taille rend les pages
      plus rapides et plus légères.
    </p>
    <p>
      Chaque plateforme a aussi ses contraintes : photo de profil carrée,
      bannière à un format précis, pièce jointe sous une certaine résolution.
      Adapter les dimensions à l&apos;avance évite les recadrages automatiques
      malheureux et garantit que ton image s&apos;affiche exactement comme tu le
      souhaites.
    </p>
  </>
);

export default function ImageResizerPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <ImageResizerTool />
    </ToolLayout>
  );
}

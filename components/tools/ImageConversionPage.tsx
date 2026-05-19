import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import ImageConverterTool, { type ImgFmt } from "@/components/tools/ImageConverterTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";

const LABELS: Record<ImgFmt, string> = {
  jpg: "JPG",
  png: "PNG",
  webp: "WebP",
};

/**
 * Renders a ToolLayout for a specific image-format conversion (e.g. JPG → PNG).
 * The same underlying ImageConverterTool is reused; only the locked formats,
 * copy, and SEO data change between pages.
 */
export default function ImageConversionPage({
  slug,
  from,
  to,
}: {
  slug: string;
  from: ImgFmt;
  to: ImgFmt;
}) {
  const tool = getToolBySlug(slug)!;
  const fromLabel = LABELS[from];
  const toLabel = LABELS[to];
  const hasQuality = to !== "png";

  const howTo: HowToStep[] = [
    {
      title: `Importe ton fichier ${fromLabel}`,
      body: `Glisse ton image ${fromLabel} dans la zone de dépôt, ou clique pour la sélectionner sur ton appareil.`,
    },
    {
      title: `Lance la conversion en ${toLabel}`,
      body: `La conversion ${fromLabel} → ${toLabel} démarre automatiquement dès que ton fichier est chargé.`,
    },
    hasQuality
      ? {
          title: "Ajuste la qualité",
          body: `Un curseur te laisse arbitrer entre netteté et poids du fichier ${toLabel}. 90 % est un bon point de départ.`,
        }
      : {
          title: `Vérifie l'aperçu`,
          body: `L'aperçu du ${toLabel} s'affiche immédiatement. Le PNG est sans perte, aucun réglage de qualité à faire.`,
        },
    {
      title: `Télécharge le ${toLabel}`,
      body: `Récupère le fichier converti en un clic. Tout s'est passé dans ton navigateur, rien n'a été téléversé.`,
    },
  ];

  const faq: FaqItem[] = [
    {
      q: `Comment convertir un ${fromLabel} en ${toLabel} ?`,
      a: `Importe ton image ${fromLabel} dans Toolify, attends que la conversion en ${toLabel} se fasse automatiquement, puis clique sur Télécharger.`,
    },
    {
      q: `Mes fichiers sont-ils envoyés sur un serveur ?`,
      a: `Non. La conversion ${fromLabel} → ${toLabel} se fait via l'API Canvas de ton navigateur. Aucune image n'est téléversée ni conservée.`,
    },
    ...(from === "png" || from === "webp"
      ? [
          {
            q: `Que devient la transparence en convertissant vers ${toLabel} ?`,
            a:
              to === "jpg"
                ? `Le JPG ne gère pas la transparence. Les zones transparentes de ton ${fromLabel} sont remplacées par un fond blanc lors de la conversion.`
                : `La transparence est conservée, le ${toLabel} la gère nativement.`,
          },
        ]
      : []),
    hasQuality
      ? {
          q: `À quoi sert le curseur de qualité ?`,
          a: `Il règle la compression du ${toLabel} : plus la qualité est haute, plus le fichier est lourd et net. 90 % est invisible à l'œil dans la plupart des cas.`,
        }
      : {
          q: `Pourquoi n'y a-t-il pas de curseur de qualité ?`,
          a: `Le PNG est un format sans perte : il n'y a pas de niveau de compression à ajuster. La conversion conserve la qualité de l'image source.`,
        },
    {
      q: `Pourquoi convertir ${fromLabel} en ${toLabel} ?`,
      a:
        to === "webp"
          ? `Le WebP produit des fichiers nettement plus légers que le ${fromLabel} à qualité équivalente. C'est le format moderne recommandé pour le web.`
          : to === "png"
            ? `Le PNG est sans perte et gère la transparence. Idéal pour les graphiques, logos, captures d'écran ou archivage.`
            : `Le JPG est universel : il est lu par tous les logiciels et services, et reste le format le plus compact pour les photos.`,
    },
    {
      q: `Quelle taille de fichier ${fromLabel} puis-je convertir ?`,
      a: `Jusqu'à 50 Mo. Au-delà, ton navigateur risque de manquer de mémoire selon ton appareil.`,
    },
    {
      q: `Puis-je convertir plusieurs ${fromLabel} en ${toLabel} d'un coup ?`,
      a: `Pour l'instant, l'outil traite une image à la fois pour garantir un résultat optimal. Tu peux enchaîner les fichiers avec le bouton « Nouveau fichier ».`,
    },
  ];

  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo}>
      <ImageConverterTool from={from} to={to} />
    </ToolLayout>
  );
}

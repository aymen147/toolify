import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import ColorPaletteExtractorTool from "@/components/tools/ColorPaletteExtractorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("color-palette-extractor")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Importe une image",
    body: "Glisse une photo, une illustration ou un screenshot. JPG, PNG ou WebP — l'outil accepte les trois.",
  },
  {
    title: "Laisse l'outil détecter les dominantes",
    body: "L'algorithme extrait les couleurs les plus présentes dans l'image et les classe par importance.",
  },
  {
    title: "Survole pour voir les codes",
    body: "Chaque pastille affiche son code HEX et RGB. Idéal pour reproduire la palette d'une photo dans un design.",
  },
  {
    title: "Copie ou exporte la palette",
    body: "Clique sur une couleur pour copier son code, ou récupère la palette complète d'un coup.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Combien de couleurs sont extraites ?",
    a: "L'outil extrait les 8 couleurs les plus représentatives de l'image. Elles sont déterminées par un algorithme de quantification, sans intelligence artificielle.",
  },
  {
    q: "Quels formats d'image puis-je utiliser ?",
    a: "Tous les formats lus par ton navigateur : JPG, PNG, WebP, GIF… Photos, logos, illustrations ou captures d'écran fonctionnent tous.",
  },
  {
    q: "Comment récupérer un code couleur ?",
    a: "Clique sur n'importe quelle couleur de la palette : son code HEX est copié dans ton presse-papiers. Le code RGB est aussi affiché sous chaque couleur.",
  },
  {
    q: "Puis-je télécharger la palette ?",
    a: "Oui. Le bouton « Télécharger la palette » génère une image PNG regroupant les couleurs et leurs codes HEX, pratique à conserver ou à partager.",
  },
  {
    q: "Mes images sont-elles envoyées sur un serveur ?",
    a: "Non. L'extraction des couleurs se fait entièrement dans ton navigateur. Aucune image n'est téléversée ni conservée.",
  },
  {
    q: "Pourquoi les couleurs extraites diffèrent-elles parfois de ce que je vois ?",
    a: "L'algorithme cherche les couleurs dominantes en surface. Une petite zone très vive peut être ignorée au profit de teintes plus présentes dans l'ensemble de l'image.",
  },
];

const content = (
  <>
    <h2>Comment extraire une palette de couleurs</h2>
    <p>
      Obtenir les couleurs dominantes d&apos;une image avec Toolify est
      instantané :
    </p>
    <ol>
      <li>Importe une image : photo, logo, illustration ou capture d&apos;écran.</li>
      <li>
        L&apos;outil analyse l&apos;image et affiche aussitôt ses 8 couleurs
        principales.
      </li>
      <li>
        Clique sur une couleur pour copier son code HEX ; le code RGB est
        affiché juste en dessous.
      </li>
      <li>
        Télécharge la palette complète au format PNG pour la réutiliser dans tes
        projets.
      </li>
    </ol>
    <p>
      L&apos;analyse repose sur un algorithme de quantification des couleurs
      exécuté localement, sans intelligence artificielle ni serveur distant.
      L&apos;image que tu déposes ne quitte jamais ton appareil.
    </p>

    <h2>Pourquoi extraire une palette de couleurs</h2>
    <p>
      Une palette cohérente est la base de tout travail visuel. Les graphistes
      et créateurs de contenu s&apos;en servent pour bâtir l&apos;identité
      d&apos;une marque, harmoniser une présentation ou décliner un visuel.
      Partir des couleurs d&apos;une photo d&apos;inspiration garantit un rendu
      naturel et équilibré.
    </p>
    <p>
      L&apos;outil est aussi utile pour le développement web : récupérer le code
      HEX exact d&apos;une couleur vue dans une image évite de la deviner à
      l&apos;œil. En quelques secondes, tu disposes d&apos;une gamme prête à
      l&apos;emploi pour ton CSS, ton thème ou ta charte graphique.
    </p>
  </>
);

export default function ColorPaletteExtractorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <ColorPaletteExtractorTool />
    </ToolLayout>
  );
}

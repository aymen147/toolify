import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import ColorConverterTool from "@/components/tools/ColorConverterTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("color-converter")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Saisis une couleur",
    body: "Tape un code HEX (#1F3DFF), une notation RGB, HSL ou HSV — l'outil détecte le format automatiquement.",
  },
  {
    title: "Lis tous les formats équivalents",
    body: "HEX, RGB, HSL, HSV et CMJN apparaissent en parallèle. Idéal pour passer d'un outil à l'autre.",
  },
  {
    title: "Explore la palette de variantes",
    body: "Nuances plus claires et plus sombres sont générées automatiquement — pratique pour bâtir une palette cohérente.",
  },
  {
    title: "Copie le code",
    body: "Clique sur n'importe quelle valeur pour la copier instantanément dans ton presse-papiers.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Quelle est la différence entre RGB, HSL et HSV ?",
    a: "RGB décrit une couleur par ses composantes rouge, verte et bleue. HSL et HSV la décrivent par sa teinte, sa saturation et sa luminosité (ou sa valeur) — des modèles plus intuitifs pour ajuster une couleur.",
  },
  {
    q: "Qu'est-ce que le CMYK ?",
    a: "Le CMYK (cyan, magenta, jaune, noir) est le modèle utilisé pour l'impression. Les valeurs affichées ici sont une conversion indicative : le rendu imprimé final dépend du profil colorimétrique de l'imprimeur.",
  },
  {
    q: "Comment copier une valeur ?",
    a: "Clique simplement sur n'importe quelle ligne (HEX, RGB, HSL…) ou sur une nuance de la palette. La valeur est copiée dans ton presse-papiers et une confirmation s'affiche.",
  },
  {
    q: "Comment fonctionne la palette de nuances ?",
    a: "À partir de ta couleur, l'outil génère cinq variantes plus claires et cinq plus foncées en ajustant la luminosité tout en conservant la teinte. Pratique pour bâtir une gamme cohérente.",
  },
  {
    q: "Mes couleurs sont-elles envoyées sur un serveur ?",
    a: "Non. Toutes les conversions sont calculées dans ton navigateur en JavaScript pur. Aucune donnée n'est transmise.",
  },
  {
    q: "Puis-je saisir une couleur autrement qu'avec le sélecteur ?",
    a: "Le sélecteur natif de ton navigateur permet déjà de saisir une valeur HEX précise. Choisis la couleur, et toutes les autres notations se mettent à jour instantanément.",
  },
];

const content = (
  <>
    <h2>Comment convertir une couleur</h2>
    <p>
      Le convertisseur de couleurs traduit n&apos;importe quelle couleur dans
      les cinq notations les plus courantes :
    </p>
    <ol>
      <li>
        Clique sur le grand aperçu coloré pour ouvrir le sélecteur de couleur de
        ton navigateur.
      </li>
      <li>
        Choisis ta couleur — les valeurs HEX, RGB, HSL, HSV et CMYK
        s&apos;affichent aussitôt.
      </li>
      <li>
        Clique sur une ligne pour copier la valeur correspondante dans ton
        presse-papiers.
      </li>
      <li>
        Parcours la palette de nuances en bas : cinq tons plus clairs et cinq
        plus foncés, eux aussi copiables d&apos;un clic.
      </li>
    </ol>
    <p>
      Toutes les conversions sont recalculées en temps réel, directement dans
      ton navigateur. L&apos;outil n&apos;utilise aucune bibliothèque externe :
      les formules de conversion entre espaces colorimétriques sont écrites en
      JavaScript pur, ce qui garantit rapidité et confidentialité totale.
    </p>

    <h2>Pourquoi utiliser un convertisseur de couleurs</h2>
    <p>
      Chaque environnement de travail attend un format différent. Le CSS d&apos;un
      site web utilise le HEX ou le RGB, un logiciel de design préfère souvent
      le HSL pour ajuster finement une teinte, et l&apos;impression repose sur le
      CMYK. Passer de l&apos;un à l&apos;autre à la main est source
      d&apos;erreurs : un convertisseur donne instantanément la valeur exacte
      dans chaque notation.
    </p>
    <p>
      La palette de nuances rend l&apos;outil particulièrement utile aux
      designers et développeurs. À partir d&apos;une seule couleur de base, tu
      obtiens une gamme harmonieuse de variantes claires et foncées — idéale
      pour définir des états (survol, actif), des fonds ou un thème complet sans
      tâtonner.
    </p>
  </>
);

export default function ColorConverterPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <ColorConverterTool />
    </ToolLayout>
  );
}

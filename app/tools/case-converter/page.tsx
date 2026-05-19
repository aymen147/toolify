import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import CaseConverterTool from "@/components/tools/CaseConverterTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("case-converter")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Colle ou rédige ton texte",
    body: "Saisis ou colle ton contenu dans la zone de texte. La conversion s'applique à tout le texte présent.",
  },
  {
    title: "Choisis le format",
    body: "MAJUSCULES, minuscules, Title Case, Sentence case, camelCase, snake_case ou kebab-case — un clic par format.",
  },
  {
    title: "Lis l'aperçu",
    body: "Le texte se transforme instantanément, prêt à être relu ou modifié à nouveau.",
  },
  {
    title: "Copie le résultat",
    body: "Récupère le texte converti en un clic, prêt à coller ailleurs.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Quelle est la différence entre Title Case et Sentence case ?",
    a: "Title Case met une majuscule à chaque mot, comme dans un titre. Sentence case ne met une majuscule qu'au début de chaque phrase, comme dans un texte courant.",
  },
  {
    q: "À quoi servent camelCase, snake_case et kebab-case ?",
    a: "Ce sont des conventions de nommage en programmation : camelCase et PascalCase pour les variables et classes, snake_case pour les bases de données et Python, kebab-case pour les URL et noms de fichiers.",
  },
  {
    q: "Les accents sont-ils conservés ?",
    a: "Oui pour les conversions de texte (majuscules, minuscules, casse de titre et de phrase). Pour camelCase, snake_case et kebab-case, les caractères accentués sont traités comme des séparateurs de mots, conformément à l'usage en programmation.",
  },
  {
    q: "Mon texte est-il envoyé sur un serveur ?",
    a: "Non. Toutes les conversions sont effectuées dans ton navigateur. Aucun texte n'est transmis ni enregistré.",
  },
  {
    q: "Puis-je convertir un texte de plusieurs lignes ?",
    a: "Oui. Les conversions s'appliquent à l'ensemble du texte, sauts de ligne compris. Tu peux coller un paragraphe entier.",
  },
  {
    q: "Le résultat se met-il à jour si je modifie le texte ?",
    a: "Oui. Tant qu'une conversion est sélectionnée, le résultat se recalcule automatiquement à chaque modification du texte d'entrée.",
  },
];

const content = (
  <>
    <h2>Comment convertir la casse d&apos;un texte</h2>
    <p>
      Le convertisseur de casse transforme ton texte en huit formats
      différents, en un clic et sans rechargement de page :
    </p>
    <ol>
      <li>Colle ou écris ton texte dans la première zone.</li>
      <li>
        Choisis le format voulu parmi les huit boutons : MAJUSCULES,
        minuscules, Title Case, Sentence case, camelCase, PascalCase,
        snake_case ou kebab-case.
      </li>
      <li>Le résultat s&apos;affiche immédiatement dans la seconde zone.</li>
      <li>
        Clique sur « Copier le résultat » pour récupérer le texte converti.
      </li>
      <li>
        Modifie le texte d&apos;origine si besoin : le résultat se met à jour
        automatiquement.
      </li>
    </ol>
    <p>
      Chaque conversion est instantanée car elle se déroule entièrement dans ton
      navigateur. Tu peux enchaîner les formats sans perdre ton texte
      d&apos;origine, puisqu&apos;il reste affiché dans la zone du haut.
    </p>

    <h2>Pourquoi utiliser un convertisseur de casse</h2>
    <p>
      Reformater un texte à la main est lent et fastidieux : retaper un titre en
      majuscules, transformer une phrase en nom de variable ou nettoyer un texte
      collé tout en capitales prend du temps et génère des erreurs. Un
      convertisseur applique la règle uniformément, en une fraction de seconde,
      même sur un long paragraphe.
    </p>
    <p>
      L&apos;outil est utile à des profils variés : les rédacteurs harmonisent
      la casse de leurs titres, les développeurs transforment des libellés en
      camelCase ou snake_case pour leur code, et tout le monde peut corriger un
      texte reçu entièrement en majuscules. Les huit formats couvrent aussi bien
      les besoins éditoriaux que techniques.
    </p>
  </>
);

export default function CaseConverterPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <CaseConverterTool />
    </ToolLayout>
  );
}

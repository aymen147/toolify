import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import DateDifferenceTool from "@/components/tools/DateDifferenceTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("date-difference")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Choisis la date de début",
    body: "Sélectionne la première date dans le calendrier ou saisis-la directement.",
  },
  {
    title: "Choisis la date de fin",
    body: "Sélectionne la seconde date. L'ordre n'a pas d'importance : la durée est toujours positive.",
  },
  {
    title: "Lis la durée",
    body: "Le résultat s'affiche en jours, en semaines, et décomposé en années / mois / jours pour une lecture plus concrète.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Comment compter le nombre de jours entre deux dates ?",
    a: "Sélectionne une date de début et une date de fin : l'outil affiche aussitôt le nombre exact de jours qui les séparent.",
  },
  {
    q: "L'ordre des dates est-il important ?",
    a: "Non. Que tu mettes la date la plus récente en premier ou en second, l'outil calcule toujours une durée positive.",
  },
  {
    q: "La durée inclut-elle le premier et le dernier jour ?",
    a: "L'outil calcule le nombre de jours écoulés entre les deux dates. Si tu as besoin d'inclure les deux bornes, ajoute simplement un jour au résultat.",
  },
  {
    q: "Pourquoi la durée est-elle aussi affichée en années et mois ?",
    a: "Un grand nombre de jours est peu parlant. La décomposition en années, mois et jours rend la durée plus concrète.",
  },
  {
    q: "Mes dates sont-elles enregistrées ?",
    a: "Non. Le calcul se fait entièrement dans ton navigateur, aucune donnée n'est transmise.",
  },
];

export default function DateDifferencePage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo}>
      <DateDifferenceTool />
    </ToolLayout>
  );
}

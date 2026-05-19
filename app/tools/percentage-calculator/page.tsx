import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("percentage-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Choisis le mode",
    body: "Trois calculs au choix : pourcentage d'un nombre, proportion (part d'un total), ou variation entre deux valeurs.",
  },
  {
    title: "Saisis les valeurs",
    body: "Entre les deux nombres dans les champs. Les libellés s'adaptent automatiquement au mode sélectionné.",
  },
  {
    title: "Lis le résultat",
    body: "Le calcul s'affiche instantanément, accompagné d'une phrase qui explique l'opération effectuée.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Comment calculer le pourcentage d'un nombre ?",
    a: "Choisis le mode « % d'un nombre », entre le pourcentage puis le nombre. Par exemple, 20 % de 150 donne 30.",
  },
  {
    q: "Comment calculer une proportion en pourcentage ?",
    a: "Utilise le mode « Proportion » : entre une valeur et un total. L'outil indique quel pourcentage la valeur représente par rapport au total.",
  },
  {
    q: "Comment calculer une augmentation ou une baisse en pourcentage ?",
    a: "Le mode « Variation » compare une valeur initiale et une valeur finale, et renvoie l'évolution en pourcentage (positive pour une hausse, négative pour une baisse).",
  },
  {
    q: "Les nombres décimaux sont-ils acceptés ?",
    a: "Oui. Tu peux saisir des décimales avec un point ou une virgule, l'outil gère les deux.",
  },
  {
    q: "Mes calculs sont-ils enregistrés ?",
    a: "Non. Tout est calculé localement dans ton navigateur, rien n'est transmis ni conservé.",
  },
];

export default function PercentageCalculatorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo}>
      <PercentageCalculatorTool />
    </ToolLayout>
  );
}

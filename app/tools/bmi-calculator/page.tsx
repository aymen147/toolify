import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import BmiCalculatorTool from "@/components/tools/BmiCalculatorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("bmi-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Indique ta taille",
    body: "Saisis ta taille en centimètres dans le premier champ — par exemple 175 pour 1,75 m.",
  },
  {
    title: "Indique ton poids",
    body: "Saisis ton poids en kilogrammes dans le second champ. Les décimales sont acceptées.",
  },
  {
    title: "Lis ton IMC",
    body: "L'indice et sa catégorie (maigreur, normal, surpoids, obésité) s'affichent immédiatement, avec un repère visuel.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Comment calcule-t-on l'IMC ?",
    a: "L'indice de masse corporelle se calcule en divisant le poids (en kg) par le carré de la taille (en mètres). Par exemple, 65 kg pour 1,70 m donne un IMC d'environ 22,5.",
  },
  {
    q: "Quels sont les seuils de l'IMC ?",
    a: "En dessous de 18,5 : maigreur. De 18,5 à 25 : corpulence normale. De 25 à 30 : surpoids. De 30 à 35 : obésité modérée. Au-delà de 35 : obésité sévère.",
  },
  {
    q: "L'IMC est-il fiable pour tout le monde ?",
    a: "L'IMC est un indicateur général. Il ne distingue pas la masse musculaire de la masse grasse et n'est pas adapté aux sportifs, aux femmes enceintes ni aux enfants.",
  },
  {
    q: "L'IMC remplace-t-il un avis médical ?",
    a: "Non. C'est un repère indicatif. Pour une évaluation complète de ta santé, consulte un professionnel de santé.",
  },
  {
    q: "Mes données sont-elles enregistrées ?",
    a: "Non. La taille et le poids saisis ne sont jamais transmis ni conservés : tout est calculé dans ton navigateur.",
  },
];

export default function BmiCalculatorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo}>
      <BmiCalculatorTool />
    </ToolLayout>
  );
}

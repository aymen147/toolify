import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import AgeCalculatorTool from "@/components/tools/AgeCalculatorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("age-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Saisis une date de naissance",
    body: "Sélectionne la date dans le calendrier, ou tape-la directement au format JJ/MM/AAAA.",
  },
  {
    title: "Le calcul est instantané",
    body: "L'âge est calculé à partir de la date du jour, en tenant compte des années bissextiles et des mois de longueurs variables.",
  },
  {
    title: "Lis le détail",
    body: "L'âge s'affiche en années / mois / jours, ainsi qu'en nombre total de jours vécus — pratique pour fêter un cap symbolique.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Comment l'âge est-il calculé ?",
    a: "L'outil compare la date de naissance à la date du jour et décompte le nombre exact d'années, de mois et de jours écoulés.",
  },
  {
    q: "Les années bissextiles sont-elles prises en compte ?",
    a: "Oui. Le calcul s'appuie sur le calendrier réel, en tenant compte des mois de 28 à 31 jours et des années bissextiles.",
  },
  {
    q: "Puis-je calculer l'âge à une autre date que celle d'aujourd'hui ?",
    a: "Pour l'instant, l'âge est toujours calculé par rapport à la date du jour. Pour une durée entre deux dates précises, utilise l'outil « Nombre de jours entre deux dates ».",
  },
  {
    q: "Que signifie le nombre total de jours ?",
    a: "C'est le nombre de jours qui se sont écoulés depuis la naissance — utile pour fêter un cap symbolique, comme 10 000 jours.",
  },
  {
    q: "Ma date de naissance est-elle enregistrée ?",
    a: "Non. La date saisie reste dans ton navigateur et n'est jamais transmise ni conservée.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo}>
      <AgeCalculatorTool />
    </ToolLayout>
  );
}

import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import WordCounterTool from "@/components/tools/WordCounterTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("word-counter")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Colle ou rédige ton texte",
    body: "Clique dans la zone de texte et colle ton contenu, ou commence à écrire directement. Tout se fait dans ton navigateur — rien n'est envoyé.",
  },
  {
    title: "Lis les statistiques en direct",
    body: "Mots, caractères (avec et sans espaces), phrases et paragraphes se mettent à jour à chaque frappe, sans bouton à cliquer.",
  },
  {
    title: "Vérifie les temps estimés",
    body: "Le temps de lecture est calculé sur 200 mots/min, le temps de parole sur 130 mots/min — pratique pour caler un article ou un script.",
  },
  {
    title: "Copie ou vide en un clic",
    body: "Le bouton Copier récupère ton texte intégral ; Vider réinitialise la zone pour analyser un nouveau contenu.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Comment le temps de lecture est-il calculé ?",
    a: "Toolify se base sur une vitesse de 200 mots par minute, la moyenne d'un lecteur adulte. Le temps de parole utilise 130 mots par minute, plus lent car on articule à voix haute.",
  },
  {
    q: "Mon texte est-il enregistré quelque part ?",
    a: "Non. Le texte reste dans ton navigateur et n'est jamais transmis à un serveur. Il disparaît dès que tu fermes ou rafraîchis la page.",
  },
  {
    q: "Y a-t-il une limite de longueur ?",
    a: "Aucune limite pratique. Tu peux analyser un message court comme un manuscrit de plusieurs dizaines de milliers de mots sans ralentissement.",
  },
  {
    q: "Le compteur fonctionne-t-il avec les accents et la ponctuation française ?",
    a: "Oui. Les mots accentués, les caractères spéciaux et la ponctuation française (guillemets, points de suspension…) sont correctement pris en compte.",
  },
  {
    q: "Comment les paragraphes sont-ils comptés ?",
    a: "Chaque bloc de texte séparé par au moins un retour à la ligne compte comme un paragraphe. Les lignes vides ne sont pas comptabilisées.",
  },
  {
    q: "Puis-je utiliser le compteur de mots sur mobile ?",
    a: "Oui, l'outil est entièrement responsive. Sur mobile, le panneau de statistiques s'affiche sous la zone de texte et se met à jour de la même manière.",
  },
];

const content = (
  <>
    <h2>Comment utiliser le compteur de mots</h2>
    <p>
      Le compteur de mots de Toolify fonctionne en temps réel : il n&apos;y a
      aucun bouton « Analyser » à cliquer. Dès que tu écris ou que tu colles du
      texte, toutes les statistiques se recalculent instantanément. Voici
      comment t&apos;en servir :
    </p>
    <ol>
      <li>
        Clique dans la zone de texte à gauche, puis colle ton contenu ou
        commence à rédiger directement.
      </li>
      <li>
        Observe le panneau de droite : le nombre de mots s&apos;affiche en
        grand, suivi des caractères, des phrases et des paragraphes.
      </li>
      <li>
        Consulte l&apos;estimation du temps de lecture et du temps de parole,
        utile pour préparer un article ou une présentation.
      </li>
      <li>
        Utilise le bouton « Copier » pour récupérer ton texte en un clic et le
        coller ailleurs.
      </li>
      <li>
        Clique sur « Vider » pour effacer la zone et analyser un nouveau texte.
      </li>
    </ol>
    <p>
      Tout se passe dans ton navigateur : ton texte n&apos;est jamais envoyé sur
      un serveur. Tu peux même continuer à travailler hors ligne une fois la
      page chargée. L&apos;outil gère aussi bien un simple paragraphe
      qu&apos;un document de plusieurs milliers de mots, sans ralentissement.
      Que tu rédiges une dissertation, un article de blog, une fiche produit ou
      un script vidéo, les chiffres restent précis et lisibles — les milliers
      sont séparés par une espace, selon les conventions françaises.
    </p>

    <h2>Pourquoi utiliser un compteur de mots</h2>
    <p>
      Beaucoup de formats imposent une longueur précise. Une dissertation peut
      exiger 500 mots, un article optimisé pour le référencement vise souvent
      1 000 à 1 500 mots, une méta-description ne doit pas dépasser 155
      caractères et un message court est parfois limité à 280 caractères.
      Compter à la main est fastidieux et source d&apos;erreurs : un compteur
      automatique te donne le chiffre exact en permanence, pendant que tu
      rédiges.
    </p>
    <p>
      Au-delà du simple comptage, connaître le nombre de phrases et de
      paragraphes aide à évaluer la lisibilité d&apos;un texte. Des phrases trop
      longues fatiguent le lecteur ; des paragraphes équilibrés rendent un
      article plus agréable. Le temps de lecture estimé permet d&apos;annoncer
      honnêtement la durée d&apos;un contenu à ton audience, tandis que le temps
      de parole est précieux pour calibrer un discours, une vidéo ou un
      podcast.
    </p>

    <h2>Ce que chaque statistique mesure</h2>
    <ul>
      <li>
        <strong>Mots</strong> : chaque suite de caractères séparée par une
        espace.
      </li>
      <li>
        <strong>Caractères</strong> : tous les caractères, espaces et sauts de
        ligne compris.
      </li>
      <li>
        <strong>Sans espaces</strong> : utile pour les réseaux sociaux et les
        méta-descriptions.
      </li>
      <li>
        <strong>Phrases</strong> : segments terminés par un point, un point
        d&apos;exclamation ou d&apos;interrogation.
      </li>
      <li>
        <strong>Paragraphes</strong> : blocs de texte séparés par un retour à la
        ligne.
      </li>
      <li>
        <strong>Temps de lecture et de parole</strong> : basés respectivement
        sur 200 et 130 mots par minute.
      </li>
    </ul>
  </>
);

export default function WordCounterPage() {
  return (
    <ToolLayout
      tool={tool}
      faq={faq}
      howTo={howTo}
      content={content}
      relatedCategories={["util", "design", "pdf"]}
    >
      <WordCounterTool />
    </ToolLayout>
  );
}

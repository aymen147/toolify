import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import QrGeneratorTool from "@/components/tools/QrGeneratorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("qr-generator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Saisis ton contenu",
    body: "Une URL, un texte, des coordonnées de contact — tout ce que tu veux encoder dans le QR.",
  },
  {
    title: "Personnalise l'apparence",
    body: "Choisis la couleur du QR, la couleur de fond et la taille. Garde un contraste suffisant pour la lisibilité.",
  },
  {
    title: "Vérifie l'aperçu",
    body: "Le QR code se met à jour à chaque modification. Scanne-le pour vérifier qu'il fonctionne.",
  },
  {
    title: "Télécharge en PNG ou SVG",
    body: "PNG pour le web et les documents, SVG si tu veux l'imprimer sans perte de qualité.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Le QR code expire-t-il ?",
    a: "Non. Les QR codes générés sont statiques : ils encodent directement ton texte ou ton URL. Ils fonctionneront tant que la page ou le contenu vers lequel ils pointent existe, sans date d'expiration.",
  },
  {
    q: "Quelle différence entre le PNG et le SVG ?",
    a: "Le PNG est une image classique, parfaite pour le web et la plupart des usages. Le SVG est un format vectoriel : il reste net à n'importe quelle taille, idéal pour l'impression sur de grands formats.",
  },
  {
    q: "Quelle taille choisir ?",
    a: "200×200 convient pour un usage à l'écran, 400×400 pour un flyer ou une carte de visite, et 800×800 pour une affiche ou un grand format imprimé.",
  },
  {
    q: "Puis-je personnaliser les couleurs ?",
    a: "Oui. Tu peux choisir la couleur du code et celle du fond. Veille à garder un contraste suffisant entre les deux, sinon certains lecteurs ne reconnaîtront pas le code.",
  },
  {
    q: "Que puis-je encoder dans un QR code ?",
    a: "N'importe quel texte : une adresse de site web, un numéro de téléphone, une adresse email, un message ou des coordonnées. Plus le contenu est court, plus le code est simple à scanner.",
  },
  {
    q: "Mes données sont-elles envoyées sur un serveur ?",
    a: "Non. Le QR code est généré entièrement dans ton navigateur. Le contenu que tu saisis ne quitte jamais ton appareil.",
  },
];

const content = (
  <>
    <h2>Comment créer un QR code</h2>
    <p>
      Générer un QR code personnalisé avec Toolify ne prend que quelques
      secondes :
    </p>
    <ol>
      <li>
        Saisis le texte ou l&apos;URL à encoder dans le champ prévu — l&apos;
        aperçu se met à jour en direct.
      </li>
      <li>
        Choisis la taille du fichier final : 200, 400 ou 800 pixels de côté.
      </li>
      <li>
        Personnalise les couleurs du code et de l&apos;arrière-plan si tu le
        souhaites.
      </li>
      <li>
        Télécharge le résultat en PNG pour un usage courant, ou en SVG pour une
        qualité parfaite à l&apos;impression.
      </li>
    </ol>
    <p>
      L&apos;aperçu reflète exactement le QR code final. Avant de
      l&apos;imprimer ou de le diffuser, scanne-le avec ton téléphone pour
      vérifier qu&apos;il pointe bien vers le bon contenu. Tout est généré
      localement : ton contenu n&apos;est jamais envoyé sur un serveur.
    </p>

    <h2>Pourquoi utiliser un générateur de QR code</h2>
    <p>
      Le QR code fait le pont entre le monde physique et le numérique. Sur une
      carte de visite, une affiche, un menu de restaurant ou un emballage, il
      permet d&apos;ouvrir un site, un profil ou un document sans avoir à taper
      une adresse. Un simple scan avec l&apos;appareil photo du téléphone
      suffit.
    </p>
    <p>
      Beaucoup de générateurs en ligne créent des QR codes « dynamiques » qui
      passent par leurs serveurs et peuvent cesser de fonctionner si le service
      ferme. Toolify génère des QR codes <strong>statiques</strong> : le contenu
      est encodé directement dans l&apos;image. Ton code t&apos;appartient,
      fonctionne hors ligne et ne dépend d&apos;aucun intermédiaire.
    </p>
  </>
);

export default function QrGeneratorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <QrGeneratorTool />
    </ToolLayout>
  );
}

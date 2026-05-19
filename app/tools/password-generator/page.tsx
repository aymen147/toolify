import type { Metadata } from "next";
import ToolLayout, { type HowToStep } from "@/components/ToolLayout";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import type { FaqItem } from "@/components/FAQ";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("password-generator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

const howTo: HowToStep[] = [
  {
    title: "Choisis la longueur",
    body: "Entre 12 et 64 caractères. Plus c'est long, plus c'est solide — 16 minimum pour un compte sensible.",
  },
  {
    title: "Sélectionne les types de caractères",
    body: "Coche minuscules, majuscules, chiffres et symboles. Plus de variété, plus de robustesse.",
  },
  {
    title: "Génère plusieurs propositions",
    body: "Une liste de mots de passe candidats apparaît, avec un indicateur de force pour chacun.",
  },
  {
    title: "Copie celui qui te plaît",
    body: "Clique sur l'icône pour le copier dans ton presse-papiers. Rien n'est conservé après fermeture.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Les mots de passe générés sont-ils vraiment aléatoires ?",
    a: "Oui. Toolify utilise crypto.getRandomValues, le générateur cryptographique de ton navigateur, et non le Math.random classique. Le tirage est uniforme et sans biais.",
  },
  {
    q: "Mes mots de passe sont-ils envoyés quelque part ?",
    a: "Jamais. Tout est généré localement dans ton navigateur. Aucun mot de passe n'est transmis, enregistré ni journalisé. Tu peux même couper internet après le chargement de la page.",
  },
  {
    q: "Quelle longueur choisir ?",
    a: "16 caractères est un bon minimum pour un compte courant. Pour un compte sensible (banque, email principal), vise 20 caractères ou plus avec les quatre types de caractères activés.",
  },
  {
    q: "Que signifie l'indicateur de force ?",
    a: "Il estime l'entropie du mot de passe — sa résistance à une attaque par force brute — à partir de sa longueur et de la variété des caractères. « Très fort » correspond à un mot de passe pratiquement impossible à deviner.",
  },
  {
    q: "Pourquoi inclure des symboles ?",
    a: "Chaque type de caractère supplémentaire agrandit le nombre de combinaisons possibles. Les symboles augmentent fortement la sécurité, sauf si un site les interdit — dans ce cas, allonge simplement le mot de passe.",
  },
  {
    q: "Comment retenir un mot de passe aléatoire ?",
    a: "Tu n'as pas à le retenir : utilise un gestionnaire de mots de passe. Génère un mot de passe unique par site, copie-le dans ton gestionnaire, et tu n'auras plus qu'un seul mot de passe maître à mémoriser.",
  },
];

const content = (
  <>
    <h2>Comment générer un mot de passe sécurisé</h2>
    <p>
      Créer un mot de passe solide avec Toolify prend quelques secondes, et un
      nouveau mot de passe est déjà prêt dès l&apos;ouverture de la page :
    </p>
    <ol>
      <li>
        Règle la longueur souhaitée avec le curseur — entre 6 et 64 caractères.
      </li>
      <li>
        Choisis les types de caractères à inclure : majuscules, minuscules,
        chiffres et symboles.
      </li>
      <li>
        Vérifie l&apos;indicateur de force : vise « Fort » ou « Très fort ».
      </li>
      <li>
        Clique sur « Générer » pour obtenir un nouveau mot de passe, ou sur
        « Générer 5 d&apos;un coup » pour comparer plusieurs propositions.
      </li>
      <li>
        Clique sur l&apos;icône de copie pour récupérer le mot de passe et le
        coller dans ton gestionnaire ou ton formulaire d&apos;inscription.
      </li>
    </ol>
    <p>
      Le générateur garantit qu&apos;au moins un caractère de chaque catégorie
      sélectionnée est présent, puis mélange l&apos;ensemble de façon aléatoire.
      Le résultat est donc à la fois imprévisible et conforme aux règles de la
      plupart des sites. Comme tout se passe dans ton navigateur, aucun mot de
      passe ne transite par internet.
    </p>

    <h2>Pourquoi utiliser un générateur de mot de passe</h2>
    <p>
      Les mots de passe que l&apos;on invente soi-même sont prévisibles : ils
      reposent sur des prénoms, des dates ou des suites de touches du clavier.
      Les attaquants le savent et testent ces schémas en premier. Un générateur
      produit des chaînes véritablement aléatoires, sans logique exploitable,
      qui résistent aux attaques par dictionnaire comme par force brute.
    </p>
    <p>
      Réutiliser le même mot de passe partout est l&apos;autre grande
      faiblesse : si un seul site est piraté, tous tes comptes deviennent
      vulnérables. La bonne pratique consiste à générer un mot de passe unique
      et long pour chaque service, puis à les conserver dans un gestionnaire de
      mots de passe. Tu ne mémorises alors qu&apos;un seul mot de passe maître,
      et chaque compte reste isolé des autres.
    </p>
  </>
);

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout tool={tool} faq={faq} howTo={howTo} content={content}>
      <PasswordGeneratorTool />
    </ToolLayout>
  );
}

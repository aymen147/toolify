import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "À propos",
  description:
    "Toolify, c'est 13 outils en ligne gratuits qui tournent dans ton navigateur. Découvre pourquoi ce site existe et qui est derrière.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <ContentPage
      title="À propos de Toolify"
      lead="Des outils du quotidien, gratuits, rapides et respectueux de ta vie privée."
    >
      <h2>Pourquoi Toolify existe</h2>
      <p>
        Je m&apos;appelle Aymen et j&apos;ai créé Toolify pour une raison
        simple : la plupart des outils en ligne « gratuits » envoient tes
        fichiers sur un serveur. Compresser une photo, fusionner deux PDF ou
        générer un QR code ne devrait pas obliger à confier tes documents
        personnels à une entreprise inconnue.
      </p>
      <p>
        Toolify fait l&apos;inverse. Chaque outil tourne{" "}
        <strong>entièrement dans ton navigateur</strong>. Tes fichiers ne sont
        jamais téléversés, jamais stockés, jamais analysés. Le traitement se
        fait sur ta machine, instantanément, et le résultat reste entre tes
        mains.
      </p>

      <h2>Ce que tu trouveras ici</h2>
      <p>
        Toolify regroupe 13 outils répartis en cinq familles : images, PDF,
        texte, utilitaires et design. Compression et conversion d&apos;images,
        fusion et découpage de PDF, compteur de mots, générateur de mots de
        passe, créateur de QR codes, convertisseur de couleurs… Tous sont
        gratuits, sans inscription et sans limite d&apos;utilisation.
      </p>

      <h2>Comment le site est financé</h2>
      <p>
        Toolify est et restera gratuit. Pour couvrir les frais
        d&apos;hébergement et le temps de développement, le site affiche de la
        publicité discrète. C&apos;est le seul modèle économique : aucune
        revente de données, aucun abonnement caché. Tu peux consulter notre{" "}
        <Link href="/privacy">politique de confidentialité</Link> pour les
        détails.
      </p>

      <h2>La suite</h2>
      <p>
        De nouveaux outils sont ajoutés régulièrement. Si tu as une idée
        d&apos;outil ou un retour à partager, écris-moi via la{" "}
        <Link href="/contact">page contact</Link> — chaque message est lu.
      </p>
    </ContentPage>
  );
}

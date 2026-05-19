import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conditions d'utilisation",
  description:
    "Conditions d'utilisation de Toolify : règles d'usage des outils en ligne gratuits, propriété intellectuelle, limitation de responsabilité.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ContentPage
      title="Conditions d'utilisation"
      lead="Dernière mise à jour : 18 mai 2026"
    >
      <h2>Acceptation des conditions</h2>
      <p>
        En accédant au site Toolify et en utilisant ses outils, tu acceptes les
        présentes conditions d&apos;utilisation. Si tu n&apos;es pas
        d&apos;accord avec l&apos;un de ces points, merci de ne pas utiliser le
        site.
      </p>

      <h2>Utilisation des outils</h2>
      <p>
        Toolify met à disposition 13 outils en ligne, gratuitement et sans
        inscription. Tu peux les utiliser pour un usage personnel comme
        professionnel. Tu t&apos;engages à ne pas employer le site à des fins
        illégales, ni à tenter d&apos;en perturber le fonctionnement (surcharge,
        rétro-ingénierie malveillante, etc.).
      </p>

      <h2>Aucune garantie</h2>
      <p>
        Les outils sont fournis « en l&apos;état ». Bien que nous fassions notre
        possible pour qu&apos;ils fonctionnent correctement, nous ne garantissons
        pas l&apos;absence d&apos;erreurs ni l&apos;adéquation à un usage
        particulier. Nous te recommandons de toujours conserver une copie de tes
        fichiers originaux avant tout traitement.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Toolify ne pourra être tenu responsable d&apos;une perte de données,
        d&apos;un dommage matériel ou immatériel résultant de l&apos;utilisation
        du site. Comme le traitement est local, tu restes seul responsable des
        fichiers que tu manipules et de leur sauvegarde.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le nom « Toolify », le design du site et son code source sont la
        propriété de leur auteur. En revanche, les fichiers que tu traites
        t&apos;appartiennent entièrement : nous n&apos;y accédons pas et
        n&apos;en revendiquons aucun droit.
      </p>

      <h2>Publicité et liens externes</h2>
      <p>
        Le site affiche de la publicité et peut contenir des liens vers des
        sites tiers. Nous n&apos;avons aucun contrôle sur le contenu de ces
        sites et déclinons toute responsabilité à leur égard.
      </p>

      <h2>Modification des conditions</h2>
      <p>
        Ces conditions peuvent évoluer. La date de dernière mise à jour figure
        en haut de cette page. Pour toute question, utilise la{" "}
        <Link href="/contact">page contact</Link>.
      </p>
    </ContentPage>
  );
}

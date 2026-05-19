import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Toolify : aucun fichier n'est envoyé sur un serveur, tout le traitement est local. Cookies, publicité et droits RGPD.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Politique de confidentialité"
      lead="Dernière mise à jour : 18 mai 2026"
    >
      <h2>Le principe : tout reste sur ton appareil</h2>
      <p>
        Toolify est conçu autour d&apos;une promesse : tes fichiers ne quittent
        jamais ton ordinateur. Lorsque tu utilises un outil — compression
        d&apos;image, fusion de PDF, génération de QR code, etc. — le traitement
        se déroule <strong>intégralement dans ton navigateur</strong>. Aucun
        fichier, aucune image et aucun texte saisi n&apos;est téléversé,
        transmis ou stocké sur un serveur.
      </p>

      <h2>Données que nous ne collectons pas</h2>
      <ul>
        <li>Les fichiers que tu traites avec nos outils.</li>
        <li>Le contenu des textes que tu colles ou rédiges.</li>
        <li>Les mots de passe, couleurs ou QR codes que tu génères.</li>
        <li>Aucun compte utilisateur : il n&apos;y a pas d&apos;inscription.</li>
      </ul>

      <h2>Données techniques</h2>
      <p>
        Comme tout site web, notre hébergeur peut enregistrer des informations
        techniques standard (adresse IP, type de navigateur, pages consultées)
        à des fins de sécurité et de statistiques agrégées. Ces journaux ne
        permettent pas de t&apos;identifier personnellement et ne sont pas
        recoupés avec ton activité dans les outils.
      </p>

      <h2>Cookies</h2>
      <p>
        Toolify utilise un cookie strictement nécessaire pour mémoriser ton
        choix concernant le bandeau de consentement. Si tu acceptes la
        publicité, des cookies supplémentaires peuvent être déposés par notre
        régie publicitaire (voir ci-dessous). Tu peux à tout moment refuser ou
        effacer ces cookies depuis les réglages de ton navigateur.
      </p>

      <h2>Publicité</h2>
      <p>
        Pour rester gratuit, Toolify affiche de la publicité fournie par Google
        AdSense. Google et ses partenaires peuvent utiliser des cookies pour
        proposer des annonces basées sur tes visites sur ce site et
        d&apos;autres sites. Tu peux désactiver la publicité personnalisée
        depuis la page{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paramètres des annonces Google
        </a>
        . Pour en savoir plus sur l&apos;usage des données par Google, consulte{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          la page dédiée de Google
        </a>
        .
      </p>

      <h2>Tes droits</h2>
      <p>
        Conformément au Règlement général sur la protection des données (RGPD),
        tu disposes d&apos;un droit d&apos;accès, de rectification et
        d&apos;effacement de tes données. Comme Toolify ne collecte aucune
        donnée personnelle liée à ton usage des outils, ces droits portent
        uniquement sur les éventuels échanges par email. Pour toute demande,
        contacte-nous.
      </p>

      <h2>Contact</h2>
      <p>
        Une question sur cette politique ? Écris-nous via la{" "}
        <Link href="/contact">page contact</Link>. Cette politique pourra être
        mise à jour ; la date en haut de page indique la dernière révision.
      </p>
    </ContentPage>
  );
}

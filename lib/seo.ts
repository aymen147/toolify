import type { Metadata } from "next";

export const SITE_NAME = "Toolify";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolify.fr"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "13 outils en ligne gratuits qui tournent dans ton navigateur : compression d'image, PDF, texte, mots de passe, QR codes et plus. 100% privé, aucun upload.";

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Chemin relatif, ex. "/tools/word-counter". */
  path?: string;
}

/**
 * Construit un objet Metadata cohérent (canonical + OpenGraph + Twitter)
 * pour n'importe quelle page du site.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

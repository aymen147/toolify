import type { LucideIcon } from "lucide-react";
import {
  AlignLeft,
  ArrowLeftRight,
  Cake,
  CalendarDays,
  CaseSensitive,
  FileImage,
  FileStack,
  HeartPulse,
  Images,
  KeyRound,
  Minimize2,
  Palette,
  Percent,
  QrCode,
  Scaling,
  Scissors,
  SwatchBook,
} from "lucide-react";

export type ToolCategory =
  | "image"
  | "pdf"
  | "text"
  | "util"
  | "design"
  | "calc";

export interface CategoryMeta {
  id: ToolCategory;
  label: string;
  bgClass: string;
  inkClass: string;
  hex: string;
  inkHex: string;
}

export const CATEGORIES: Record<ToolCategory, CategoryMeta> = {
  image: {
    id: "image",
    label: "Outils image",
    bgClass: "bg-cat-image",
    inkClass: "text-cat-imageInk",
    hex: "#fef3c7",
    inkHex: "#d97706",
  },
  pdf: {
    id: "pdf",
    label: "Outils PDF",
    bgClass: "bg-cat-pdf",
    inkClass: "text-cat-pdfInk",
    hex: "#fee2e2",
    inkHex: "#dc2626",
  },
  text: {
    id: "text",
    label: "Outils texte",
    bgClass: "bg-cat-text",
    inkClass: "text-cat-textInk",
    hex: "#dbeafe",
    inkHex: "#2563eb",
  },
  util: {
    id: "util",
    label: "Utilitaires",
    bgClass: "bg-cat-util",
    inkClass: "text-cat-utilInk",
    hex: "#d1fae5",
    inkHex: "#059669",
  },
  design: {
    id: "design",
    label: "Outils design",
    bgClass: "bg-cat-design",
    inkClass: "text-cat-designInk",
    hex: "#ede9fe",
    inkHex: "#7c3aed",
  },
  calc: {
    id: "calc",
    label: "Calculateurs",
    bgClass: "bg-cat-calc",
    inkClass: "text-cat-calcInk",
    hex: "#cffafe",
    inkHex: "#0891b2",
  },
};

export interface Tool {
  slug: string;
  /** Nom court en anglais, utilisé comme identifiant produit. */
  name: string;
  /** Titre H1 de la page outil, en français. */
  h1: string;
  /** Sous-titre affiché sous le H1. */
  tagline: string;
  /** Description courte affichée sur la carte du grid de la landing. */
  shortDescription: string;
  category: ToolCategory;
  icon: LucideIcon;
  /** Titre SEO (sans le suffixe « | Toolify », ajouté par le template). */
  seoTitle: string;
  /** Meta description (150-160 caractères). */
  seoDescription: string;
  /** Mis en avant dans la navbar pour faciliter la découverte. */
  featured?: boolean;
  /** Libellé court affiché dans la navbar (uniquement si `featured`). */
  navLabel?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    h1: "Compresser une image en ligne",
    tagline:
      "Réduis la taille de tes images JPG et PNG en quelques secondes. Garde la qualité, économise de l'espace.",
    shortDescription:
      "Réduis la taille de tes images JPG/PNG sans perdre la qualité.",
    category: "image",
    icon: Minimize2,
    seoTitle: "Image Compressor — Compresser une image en ligne gratuit",
    seoDescription:
      "Compresseur d'image gratuit en ligne. Réduis la taille de tes JPG et PNG sans perdre la qualité. 100% privé, traitement local dans ton navigateur.",
    featured: true,
    navLabel: "Compresser une image",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    h1: "Redimensionner une image en ligne",
    tagline:
      "Change les dimensions de tes images en pixels. Conserve les proportions, télécharge en un clic.",
    shortDescription:
      "Change les dimensions en pixels, conserve les proportions.",
    category: "image",
    icon: Scaling,
    seoTitle: "Image Resizer — Redimensionner une image en ligne gratuit",
    seoDescription:
      "Redimensionne tes images en ligne gratuitement. Modifie largeur et hauteur en pixels, conserve les proportions. 100% local, aucun upload de fichier.",
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    h1: "Convertir JPG en PNG en ligne",
    tagline:
      "Transforme tes photos JPG en PNG sans perte, directement dans ton navigateur. Idéal pour conserver une qualité maximale ou ajouter de la transparence ensuite.",
    shortDescription: "Transforme un JPG en PNG sans perte, en un clic.",
    category: "image",
    icon: ArrowLeftRight,
    seoTitle: "JPG to PNG — Convertir JPG en PNG gratuit en ligne",
    seoDescription:
      "Convertis tes images JPG en PNG gratuitement en ligne. Sans perte, sans logiciel, sans inscription. Traitement 100% local dans ton navigateur.",
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    h1: "Convertir PNG en JPG en ligne",
    tagline:
      "Transforme tes images PNG en JPG plus légers. Parfait pour partager rapidement, envoyer par mail ou réduire le poids d'un site.",
    shortDescription: "Convertis un PNG en JPG plus léger en un clic.",
    category: "image",
    icon: ArrowLeftRight,
    seoTitle: "PNG to JPG — Convertir PNG en JPG gratuit en ligne",
    seoDescription:
      "Convertis tes images PNG en JPG gratuitement en ligne. Fichier plus léger, qualité préservée. Traitement 100% local, aucun upload.",
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WebP",
    h1: "Convertir JPG en WebP en ligne",
    tagline:
      "Allège tes JPG en les convertissant en WebP, le format moderne qui réduit le poids des images sans sacrifier la qualité visuelle.",
    shortDescription: "Convertis un JPG en WebP nettement plus léger.",
    category: "image",
    icon: ArrowLeftRight,
    seoTitle: "JPG to WebP — Convertir JPG en WebP gratuit en ligne",
    seoDescription:
      "Convertis tes images JPG en WebP gratuitement. Fichiers nettement plus légers à qualité équivalente. 100% local, traitement dans ton navigateur.",
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    h1: "Convertir WebP en JPG en ligne",
    tagline:
      "Transforme tes images WebP en JPG universel. Lisible par tous les logiciels et services, idéal pour partager une photo.",
    shortDescription: "Convertis un WebP en JPG universel en un clic.",
    category: "image",
    icon: ArrowLeftRight,
    seoTitle: "WebP to JPG — Convertir WebP en JPG gratuit en ligne",
    seoDescription:
      "Convertis tes images WebP en JPG gratuitement en ligne. Format universel, lu par tous les logiciels. 100% local, aucun upload.",
  },
  {
    slug: "png-to-webp",
    name: "PNG to WebP",
    h1: "Convertir PNG en WebP en ligne",
    tagline:
      "Allège tes PNG en les convertissant en WebP. La transparence est conservée, le fichier devient plus léger pour le web.",
    shortDescription: "Convertis un PNG en WebP léger, transparence conservée.",
    category: "image",
    icon: ArrowLeftRight,
    seoTitle: "PNG to WebP — Convertir PNG en WebP gratuit en ligne",
    seoDescription:
      "Convertis tes images PNG en WebP gratuitement en ligne. Transparence conservée, poids réduit. Traitement 100% local et privé.",
  },
  {
    slug: "webp-to-png",
    name: "WebP to PNG",
    h1: "Convertir WebP en PNG en ligne",
    tagline:
      "Transforme tes images WebP en PNG, format sans perte universellement compatible avec les logiciels de design et d'édition.",
    shortDescription: "Convertis un WebP en PNG sans perte en un clic.",
    category: "image",
    icon: ArrowLeftRight,
    seoTitle: "WebP to PNG — Convertir WebP en PNG gratuit en ligne",
    seoDescription:
      "Convertis tes images WebP en PNG gratuitement en ligne. Sans perte, transparence conservée. Traitement 100% local dans ton navigateur.",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    h1: "Convertir des images en PDF",
    tagline:
      "Combine plusieurs images JPG ou PNG dans un seul fichier PDF. Réorganise l'ordre comme tu veux.",
    shortDescription: "Combine plusieurs images dans un fichier PDF unique.",
    category: "pdf",
    icon: FileImage,
    seoTitle: "Image to PDF — Convertir des images en PDF gratuit",
    seoDescription:
      "Convertis tes images en PDF gratuitement. Combine plusieurs JPG ou PNG en un seul document, format A4 ou Letter. 100% local et privé.",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    h1: "Fusionner des fichiers PDF",
    tagline:
      "Combine plusieurs PDF en un seul document. Glisse-dépose pour réorganiser les fichiers.",
    shortDescription: "Fusionne plusieurs PDF, glisse-dépose pour réordonner.",
    category: "pdf",
    icon: FileStack,
    seoTitle: "Merge PDF — Fusionner des PDF en ligne gratuit",
    seoDescription:
      "Fusionne plusieurs fichiers PDF en un seul gratuitement. Réorganise l'ordre des documents par glisser-déposer. 100% local, aucun upload.",
    featured: true,
    navLabel: "Fusionner des PDF",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    h1: "Extraire des pages d'un PDF",
    tagline:
      "Sélectionne les pages que tu veux garder et crée un nouveau PDF en un clic.",
    shortDescription: "Extrais des pages spécifiques d'un PDF en quelques clics.",
    category: "pdf",
    icon: Scissors,
    seoTitle: "Split PDF — Extraire des pages d'un PDF gratuit",
    seoDescription:
      "Divise un PDF et extrais les pages de ton choix gratuitement. Aperçu des pages, sélection multiple. Traitement 100% local et privé.",
  },
  {
    slug: "pdf-to-images",
    name: "PDF to Images",
    h1: "Convertir un PDF en images",
    tagline:
      "Extrais chaque page d'un PDF sous forme d'image JPG ou PNG, prête à télécharger.",
    shortDescription: "Convertis chaque page d'un PDF en image JPG/PNG.",
    category: "pdf",
    icon: Images,
    seoTitle: "PDF to Images — Convertir un PDF en JPG ou PNG",
    seoDescription:
      "Convertis un PDF en images gratuitement. Extrais chaque page en JPG ou PNG en un clic. Traitement 100% local dans ton navigateur.",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    h1: "Compteur de mots",
    tagline:
      "Compte mots, caractères, phrases et temps de lecture en temps réel. Idéal pour rédacteurs, étudiants et créateurs de contenu.",
    shortDescription: "Mots, caractères, temps de lecture en temps réel.",
    category: "text",
    icon: AlignLeft,
    seoTitle: "Word Counter — Compteur de mots et caractères en ligne",
    seoDescription:
      "Compteur de mots gratuit en ligne. Compte les mots, caractères, phrases et temps de lecture en temps réel. 100% gratuit, sans inscription.",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    h1: "Convertir la casse d'un texte",
    tagline:
      "Transforme ton texte en MAJUSCULES, minuscules, camelCase, snake_case et bien d'autres formats en un clic.",
    shortDescription: "MAJUSCULES, minuscules, camelCase en 1 clic.",
    category: "text",
    icon: CaseSensitive,
    seoTitle: "Case Converter — Convertir la casse d'un texte en ligne",
    seoDescription:
      "Convertisseur de casse gratuit : MAJUSCULES, minuscules, Title Case, camelCase, snake_case. Transforme ton texte instantanément en ligne.",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    h1: "Générateur de mot de passe",
    tagline:
      "Crée des mots de passe forts et aléatoires. Choisis la longueur et les caractères, vérifie la force.",
    shortDescription: "Mots de passe forts avec indicateur de sécurité.",
    category: "util",
    icon: KeyRound,
    seoTitle: "Password Generator — Générateur de mot de passe sécurisé",
    seoDescription:
      "Générateur de mot de passe gratuit et sécurisé. Crée des mots de passe forts et aléatoires, longueur réglable. 100% local, rien n'est envoyé.",
  },
  {
    slug: "qr-generator",
    name: "QR Generator",
    h1: "Générateur de QR code",
    tagline:
      "Crée des QR codes personnalisés pour une URL ou un texte. Choisis les couleurs et la taille.",
    shortDescription: "Crée des QR codes personnalisés en PNG ou SVG.",
    category: "util",
    icon: QrCode,
    seoTitle: "QR Generator — Générateur de QR code gratuit",
    seoDescription:
      "Générateur de QR code gratuit en ligne. Crée des QR codes personnalisés (couleurs, taille) pour une URL ou un texte. Export PNG et SVG.",
    featured: true,
    navLabel: "Générateur QR",
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    h1: "Convertisseur de couleurs",
    tagline:
      "Convertis une couleur entre HEX, RGB, HSL, HSV et CMJN. Génère une palette de nuances.",
    shortDescription: "HEX, RGB, HSL, CMYK avec palette de variantes.",
    category: "design",
    icon: Palette,
    seoTitle: "Color Converter — Convertir une couleur HEX, RGB, HSL",
    seoDescription:
      "Convertisseur de couleurs gratuit : HEX, RGB, HSL, HSV, CMJN. Convertis une couleur et génère une palette de nuances en ligne.",
  },
  {
    slug: "color-palette-extractor",
    name: "Color Palette Extractor",
    h1: "Extraire une palette de couleurs",
    tagline:
      "Importe une image et obtiens instantanément ses couleurs dominantes, avec leurs codes HEX et RGB.",
    shortDescription: "Extrais les couleurs dominantes d'une image.",
    category: "design",
    icon: SwatchBook,
    seoTitle: "Color Palette Extractor — Extraire les couleurs d'une image",
    seoDescription:
      "Extracteur de palette de couleurs gratuit. Importe une image et obtiens ses couleurs dominantes en HEX et RGB. 100% local, sans inscription.",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    h1: "Calculateur de pourcentage",
    tagline:
      "Calcule un pourcentage, une part ou une variation en pourcentage, instantanément.",
    shortDescription: "Pourcentage, part et variation en un calcul.",
    category: "calc",
    icon: Percent,
    seoTitle: "Calculateur de pourcentage en ligne gratuit",
    seoDescription:
      "Calculateur de pourcentage gratuit : calcule le pourcentage d'un nombre, une proportion ou une hausse/baisse en pourcentage. Rapide et 100% en ligne.",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    h1: "Calcul de l'IMC",
    tagline:
      "Calcule ton indice de masse corporelle à partir de ta taille et de ton poids, et situe-toi.",
    shortDescription: "Indice de masse corporelle (IMC) et interprétation.",
    category: "calc",
    icon: HeartPulse,
    seoTitle: "Calcul de l'IMC — Indice de masse corporelle gratuit",
    seoDescription:
      "Calcul de l'IMC gratuit en ligne. Indique ta taille et ton poids pour connaître ton indice de masse corporelle et sa catégorie. Résultat instantané.",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    h1: "Calculateur d'âge",
    tagline:
      "Indique une date de naissance et obtiens l'âge exact en années, mois et jours.",
    shortDescription: "Âge exact en années, mois et jours.",
    category: "calc",
    icon: Cake,
    seoTitle: "Calculateur d'âge — Calculer son âge exact en ligne",
    seoDescription:
      "Calculateur d'âge gratuit : entre une date de naissance et obtiens l'âge exact en années, mois et jours, ainsi que le nombre total de jours vécus.",
  },
  {
    slug: "date-difference",
    name: "Date Difference",
    h1: "Nombre de jours entre deux dates",
    tagline:
      "Calcule la durée entre deux dates en jours, semaines, mois et années.",
    shortDescription: "Durée entre deux dates : jours, semaines, mois.",
    category: "calc",
    icon: CalendarDays,
    seoTitle: "Calcul du nombre de jours entre deux dates",
    seoDescription:
      "Calcule gratuitement le nombre de jours entre deux dates. Obtiens aussi la durée en semaines, mois et années. Outil de calcul de date en ligne.",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((tool) => tool.category === category);
}

/** Outils mis en avant dans la navbar. */
export function getFeaturedTools(): Tool[] {
  return TOOLS.filter((tool) => tool.featured);
}

/**
 * Outils similaires : priorité aux outils de la même catégorie, complété
 * par d'autres outils si la catégorie ne suffit pas (4 par défaut).
 */
export function getRelatedTools(slug: string, count = 4): Tool[] {
  const current = getToolBySlug(slug);
  if (!current) return TOOLS.slice(0, count);

  const sameCategory = TOOLS.filter(
    (tool) => tool.category === current.category && tool.slug !== slug,
  );
  const others = TOOLS.filter(
    (tool) => tool.category !== current.category && tool.slug !== slug,
  );

  return [...sameCategory, ...others].slice(0, count);
}

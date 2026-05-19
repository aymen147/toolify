/** Formate un nombre d'octets en taille lisible (o, Ko, Mo, Go). */
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 o";
  const units = ["o", "Ko", "Mo", "Go"];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024)),
  );
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/** Formate un nombre avec séparateur de milliers (espace insécable, style français). */
export function formatNumber(value: number): string {
  return value.toLocaleString("fr-FR");
}

import type { LucideIcon, LucideProps } from "lucide-react";

interface IconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
}

/**
 * Thin wrapper around a lucide-react icon. Centralises default stroke + size
 * so icons stay visually consistent across the site. Pass `size` (px) or
 * `className="size-N"` to override.
 *
 * Never use emoji as iconography — always pass a lucide icon here.
 */
export default function Icon({
  icon: LucideIconComp,
  size = 18,
  strokeWidth = 1.75,
  ...rest
}: IconProps) {
  return <LucideIconComp size={size} strokeWidth={strokeWidth} aria-hidden {...rest} />;
}

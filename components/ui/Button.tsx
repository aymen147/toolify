import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap " +
  "transition-colors duration-fast ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover border border-accent",
  secondary:
    "bg-elevated text-fg border border-line hover:border-line-strong",
  ghost:
    "bg-transparent text-fg hover:bg-sunken",
  link:
    "bg-transparent text-accent hover:text-accent-hover underline underline-offset-4 decoration-1 px-0 py-0 h-auto rounded-none",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-lg",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

function styles(variant: Variant = "primary", size: Size = "md", extra = "") {
  const sizeClasses = variant === "link" ? "" : sizes[size];
  return [base, sizeClasses, variants[variant], extra].filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={styles(variant, size, className)} {...rest}>
      {children}
    </button>
  );
});

export function LinkButton({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...rest
}: LinkButtonProps) {
  const isExternal = /^https?:/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={styles(variant, size, className)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={styles(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export default Button;

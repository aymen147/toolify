import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-sunken text-fg-muted border border-line",
  accent: "bg-accent-soft text-accent border border-transparent",
  success: "bg-success-soft text-success border border-transparent",
  warning: "bg-warning-soft text-warning border border-transparent",
  danger: "bg-danger-soft text-danger border border-transparent",
  outline: "bg-transparent text-fg-muted border border-line",
};

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export default function Badge({ tone = "neutral", className = "", children }: BadgeProps) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
        tones[tone] +
        (className ? " " + className : "")
      }
    >
      {children}
    </span>
  );
}

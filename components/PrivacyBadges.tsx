import { Lock, ShieldCheck, Zap } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "100% local" },
  { icon: Lock, label: "Aucun upload" },
  { icon: Zap, label: "Instantané" },
];

export default function PrivacyBadges() {
  return (
    <div className="site-shell mb-8 flex flex-wrap justify-center gap-2 px-5 sm:px-8 lg:px-12">
      {BADGES.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[0.8rem] font-medium text-muted"
        >
          <Icon size={14} className="text-[#16a34a]" strokeWidth={2} />
          {label}
        </span>
      ))}
    </div>
  );
}

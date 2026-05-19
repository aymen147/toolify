import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <details
          key={item.q}
          className="group border-b border-border last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-ink">{item.q}</h3>
            <ChevronDown
              size={18}
              className="shrink-0 text-hint transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="pb-5 text-[0.95rem] leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

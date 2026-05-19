interface ContentPageProps {
  title: string;
  lead?: string;
  children: React.ReactNode;
}

export default function ContentPage({
  title,
  lead,
  children,
}: ContentPageProps) {
  return (
    <article className="site-shell px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <h1 className="mb-3 text-[clamp(2rem,5vw,2.75rem)] font-bold tracking-[-0.035em]">
        {title}
      </h1>
      {lead && (
        <p className="mb-8 text-[1.1rem] leading-relaxed text-muted">{lead}</p>
      )}
      <div className="tool-prose">{children}</div>
    </article>
  );
}

export default function PageHeader({ eyebrow, title, subtitle, actions, meta }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.11em] text-[#2563EB]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#0B2138] sm:text-[25px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
        {meta}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
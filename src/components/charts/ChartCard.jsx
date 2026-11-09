import { cn } from "@/lib/utils";

export default function ChartCard({ title, subtitle, right, children, className, bodyClassName }) {
  return (
    <section className={cn("panel flex flex-col p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-[#0B2138]">
            {title}
          </h3>
          {subtitle && <p className="mt-0.5 text-[11px] text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className={cn("mt-4 flex-1", bodyClassName)}>{children}</div>
    </section>
  );
}
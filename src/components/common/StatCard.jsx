import { cn } from "@/lib/utils";

export default function StatCard({ label, value, hint, icon: Icon, tone = "default" }) {
  return (
    <div className="panel group relative overflow-hidden p-4 transition-shadow duration-200 hover:shadow-[0_2px_10px_rgba(16,24,40,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
          {label}
        </p>
        {Icon && (
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-md ring-1 ring-inset",
              tone === "danger"
                ? "bg-red-50 text-red-600 ring-red-100"
                : tone === "warning"
                  ? "bg-amber-50 text-amber-600 ring-amber-100"
                  : tone === "success"
                    ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
                    : "bg-secondary text-[#12406F] ring-border"
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        )}
      </div>
      <p className="num mt-3 font-heading text-[27px] font-semibold leading-none tracking-[-0.02em] text-foreground">
        {value}
      </p>
      {hint && <p className="mt-2 text-[11.5px] leading-snug text-muted-foreground">{hint}</p>}
    </div>
  );
}
import { CheckCircle2, Star } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

export default function DiagnosticCheckCard({
  check,
  recommended = false,
  selected = false,
  onSelect,
  compact = false,
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-3.5 transition-colors",
        selected ? "border-[#2563EB] ring-1 ring-[#2563EB]/25" : "border-border",
        onSelect && "cursor-pointer hover:border-[#BFD3F2]"
      )}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          {onSelect && (
            <span
              className={cn(
                "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                selected ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-slate-300"
              )}
            >
              {selected && <CheckCircle2 className="h-3 w-3" />}
            </span>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="num rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-[#12406F]">
                {check.id}
              </span>
              <h4 className="font-heading text-[13px] font-semibold text-[#0B2138]">{check.name}</h4>
              {recommended && (
                <span className="inline-flex items-center gap-1 rounded bg-[#EEF4FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#1D4FD8]">
                  <Star className="h-2.5 w-2.5" /> Recommended
                </span>
              )}
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">{check.purpose}</p>
          </div>
        </div>
        <StatusBadge value={check.status} />
      </div>

      {!compact && (
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-border pt-2.5 text-[11px] sm:grid-cols-3">
          <div>
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">Related hypotheses</dt>
            <dd className="mt-0.5 font-medium text-foreground">{check.hypotheses.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">Equipment</dt>
            <dd className="mt-0.5 font-medium text-foreground">{check.equipment}</dd>
          </div>
          <div>
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">Responsible</dt>
            <dd className="mt-0.5 font-medium text-foreground">{check.engineer}</dd>
          </div>
          <div>
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">Duration</dt>
            <dd className="mt-0.5 font-medium text-foreground">{check.duration}</dd>
          </div>
          <div>
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">Risk</dt>
            <dd className="mt-0.5">
              <StatusBadge value={check.risk} dot={false} />
            </dd>
          </div>
          <div>
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">Priority</dt>
            <dd className="mt-0.5">
              <StatusBadge value={check.priority} dot={false} />
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-3">
            <dt className="text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">
              Expected information
            </dt>
            <dd className="mt-0.5 leading-relaxed text-foreground">{check.expected}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
import { useState } from "react";
import { ChevronDown, Info, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const level = (value) => {
  if (value >= 70) return { bar: "bg-[#2563EB]", text: "text-[#1D4FD8]", label: "Leading" };
  if (value >= 45) return { bar: "bg-[#0EA5E9]", text: "text-[#0369A1]", label: "Plausible" };
  if (value >= 25) return { bar: "bg-[#F59E0B]", text: "text-amber-700", label: "Weak" };
  return { bar: "bg-[#94A3B8]", text: "text-slate-600", label: "Unlikely" };
};

export default function HypothesisCard({ hypothesis, rank }) {
  const [open, setOpen] = useState(false);
  const tone = level(hypothesis.confidence);
  const delta =
    hypothesis.previousConfidence !== undefined
      ? hypothesis.confidence - hypothesis.previousConfidence
      : null;

  return (
    <article
      className={cn(
        "panel p-3.5 transition-shadow",
        rank === 0 && "ring-1 ring-[#2563EB]/25"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-secondary text-[10px] font-semibold text-[#12406F]">
            {rank + 1}
          </span>
          <div>
            <h4 className="font-heading text-[13px] font-semibold leading-tight text-[#0B2138]">
              {hypothesis.name}
            </h4>
            <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
              {hypothesis.summary}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className={cn("num font-heading text-[17px] font-semibold leading-none", tone.text)}>
            {hypothesis.confidence}%
          </span>
          {delta !== null && delta !== 0 && (
            <span
              className={cn(
                "mt-1 flex items-center justify-end gap-0.5 text-[10px] font-medium",
                delta > 0 ? "text-emerald-700" : "text-red-600"
              )}
            >
              {delta > 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {delta > 0 ? "+" : ""}
              {delta}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", tone.bar)}
          style={{ width: `${Math.max(3, hypothesis.confidence)}%` }}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {tone.label}
        </span>
        {hypothesis.supporting.length > 0 && (
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
            {hypothesis.supporting.length} supporting
          </span>
        )}
        {hypothesis.contradicting.length > 0 && (
          <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-700">
            {hypothesis.contradicting.length} contradicting
          </span>
        )}
        {hypothesis.missing.length > 0 && (
          <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
            {hypothesis.missing.length} missing
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-2.5 flex w-full items-center justify-between gap-2 rounded-md border border-border px-2 py-1.5 text-left text-[11px] font-medium text-[#12406F] transition-colors hover:bg-secondary/50"
      >
        <span className="flex items-center gap-1.5">
          <Info className="h-3 w-3" />
          Why is the AI considering this hypothesis?
        </span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="mt-2 space-y-2 rounded-md bg-secondary/50 p-2.5">
          <p className="text-[11.5px] leading-relaxed text-muted-foreground">
            {hypothesis.rationale}
          </p>
          <div className="space-y-1">
            {hypothesis.supporting.length > 0 && (
              <p className="text-[10.5px] leading-relaxed text-emerald-800">
                <span className="font-semibold">Supporting:</span> {hypothesis.supporting.join(", ")}
              </p>
            )}
            {hypothesis.contradicting.length > 0 && (
              <p className="text-[10.5px] leading-relaxed text-red-700">
                <span className="font-semibold">Contradicting:</span>{" "}
                {hypothesis.contradicting.join(", ")}
              </p>
            )}
            {hypothesis.missing.length > 0 && (
              <p className="text-[10.5px] leading-relaxed text-amber-800">
                <span className="font-semibold">Missing:</span> {hypothesis.missing.join(", ")}
              </p>
            )}
          </div>
          <p className="text-[10px] italic text-muted-foreground/80">
            Confidence values are illustrative and not scientifically calibrated probabilities.
          </p>
        </div>
      )}
    </article>
  );
}
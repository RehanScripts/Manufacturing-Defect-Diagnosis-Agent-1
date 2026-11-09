import { ArrowRight, Loader2, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import HypothesisCard from "@/components/investigation/HypothesisCard";
import InvestigationTimeline from "@/components/investigation/InvestigationTimeline";
import { useInvestigation } from "@/lib/investigationStore";
import { getEvidenceItem } from "@/lib/mockData";

export default function StepRootCause({ item, goToStep }) {
  const { recommendCheck, agent } = useInvestigation();
  const run = agent[item.id];
  const busy = Boolean(run && !run.done);
  const hypotheses = [...(item.hypotheses || [])].sort((a, b) => b.confidence - a.confidence);
  const missing = Array.from(
    new Set(hypotheses.flatMap((hypothesis) => hypothesis.missing || []))
  ).slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)_290px]">
        <aside className="panel h-fit p-3.5">
          <h3 className="mb-2.5 font-heading text-[12px] font-semibold tracking-[-0.01em] text-[#0B2138]">
            Investigation timeline
          </h3>
          <InvestigationTimeline events={item.timeline.slice(-6)} compact />
        </aside>

        <div className="space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-heading text-[14px] font-semibold tracking-[-0.01em] text-[#0B2138]">
                Competing root cause hypotheses
              </h2>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Ranked by illustrative confidence. None is treated as confirmed.
              </p>
            </div>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
              {hypotheses.length} hypotheses
            </span>
          </div>

          {hypotheses.length === 0 && (
            <div className="panel p-8 text-center text-[12.5px] text-muted-foreground">
              No hypotheses yet. Return to evidence retrieval to generate them.
            </div>
          )}

          {hypotheses.map((hypothesis, index) => (
            <HypothesisCard key={hypothesis.id || hypothesis.name} hypothesis={hypothesis} rank={index} />
          ))}
        </div>

        <aside className="space-y-3">
          <div className="panel p-3.5">
            <h3 className="font-heading text-[12px] font-semibold tracking-[-0.01em] text-[#0B2138]">
              Evidence considered
            </h3>
            <ul className="mt-2 space-y-1.5">
              {item.evidenceIds.slice(0, 7).map((id) => {
                const evidence = getEvidenceItem(id);
                if (!evidence) return null;
                return (
                  <li key={id} className="flex items-start gap-2">
                    <span className="num mt-0.5 shrink-0 rounded bg-secondary px-1 py-0.5 text-[9.5px] font-semibold text-[#12406F]">
                      {id.replace("EVD-", "")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-foreground">
                        {evidence.recordName}
                      </p>
                      <p className="text-[9.5px] text-muted-foreground">
                        {evidence.sourceType} · {evidence.relevance}% relevance
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
            <h3 className="flex items-center gap-1.5 font-heading text-[12px] font-semibold text-amber-900">
              <Radar className="h-3.5 w-3.5" />
              Missing evidence
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-amber-900/80">
              The current evidence supports the leading hypothesis, but additional measurement is
              needed to confirm the diagnosis and separate it from the alternatives.
            </p>
            <ul className="mt-2 space-y-1">
              {missing.length === 0 && (
                <li className="text-[11px] text-amber-900/70">No material gaps recorded.</li>
              )}
              {missing.map((entry) => (
                <li key={entry} className="text-[11px] leading-snug text-amber-900">
                  · {entry}
                </li>
              ))}
            </ul>
          </div>

          {hypotheses.length === 0 && (
            <p className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-[11px] leading-relaxed text-amber-900">
              Hypotheses must be generated before a diagnostic check can be selected. Return to
              evidence retrieval to run the scoring step.
            </p>
          )}

          <Button
            className="w-full bg-[#2563EB] hover:bg-[#1D4FD8]"
            disabled={busy || hypotheses.length === 0 || Boolean(item.escalation)}
            onClick={() => recommendCheck(item.id, () => goToStep(5))}
          >
            {busy ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Selecting check…
              </>
            ) : (
              <>
                Select Next Diagnostic Check
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>
        </aside>
      </div>
    </div>
  );
}
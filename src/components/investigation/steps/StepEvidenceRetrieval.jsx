import { ArrowRight, Database, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import EvidenceCard from "@/components/investigation/EvidenceCard";
import EvidenceSummary from "@/components/investigation/EvidenceSummary";
import { useInvestigation } from "@/lib/investigationStore";

export default function StepEvidenceRetrieval({ item, goToStep }) {
  const { retrieveEvidence, generateHypotheses, markEvidence, agent } = useInvestigation();
  const run = agent[item.id];
  const busy = Boolean(run && !run.done);

  return (
    <div className="space-y-4">
      <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EEF4FF] text-[#2563EB]">
            <Database className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-heading text-[14px] font-semibold tracking-[-0.01em] text-[#0B2138]">
              Evidence retrieval
            </h2>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">
              The agent searches production records, machine parameters, material reports, quality
              procedures, historical cases and maintenance logs for this batch.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            className="bg-[#2563EB] hover:bg-[#1D4FD8]"
            disabled={busy}
            onClick={() => retrieveEvidence(item.id)}
          >
            {busy ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Retrieving…
              </>
            ) : (
              <>
                <RefreshCw className="mr-1.5 h-4 w-4" />
                {item.evidenceRetrieved ? "Re-run retrieval" : "Retrieve Evidence"}
              </>
            )}
          </Button>
        </div>
      </div>

      {!item.evidenceRetrieved && !busy && (
        <div className="panel p-8 text-center">
          <p className="text-[12.5px] text-muted-foreground">
            No evidence retrieved yet. Run the retrieval to search the six connected record sources
            for batch {item.batchId}.
          </p>
        </div>
      )}

      {item.evidenceRetrieved && (
        <>
          <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
            <div className="grid gap-3 md:grid-cols-2">
              {item.evidenceIds.map((id) => (
                <EvidenceCard
                  key={id}
                  evidenceId={id}
                  reviewStatus={item.evidenceReviews?.[id]}
                  onMark={(evidenceId, status) => markEvidence(item.id, evidenceId, status)}
                />
              ))}
            </div>
            <div className="space-y-3">
              <EvidenceSummary item={item} />
              <div className="panel p-4">
                <h3 className="font-heading text-[12.5px] font-semibold text-[#0B2138]">
                  Next step
                </h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                  The agent will weigh this evidence into competing root cause hypotheses. You can
                  review each one and its supporting records before any check is approved.
                </p>
                <Button
                  className="mt-3 w-full bg-[#2563EB] hover:bg-[#1D4FD8]"
                  disabled={busy}
                  onClick={() => {
                    generateHypotheses(item.id, () => goToStep(4));
                  }}
                >
                  Generate Investigation Hypotheses
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
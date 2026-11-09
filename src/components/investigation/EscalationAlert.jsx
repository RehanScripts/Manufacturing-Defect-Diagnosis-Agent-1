import { AlertOctagon, ArrowLeft, FileSearch, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInvestigation } from "@/lib/investigationStore";
import { getEvidenceItem } from "@/lib/mockData";

export default function EscalationAlert({ item, goToStep }) {
  const { resolveEscalation, reviewDiagnosis } = useInvestigation();
  if (!item.escalation) return null;

  return (
    <section className="rounded-xl border border-red-200 bg-red-50/70 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-100 text-red-700">
          <AlertOctagon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-[13.5px] font-semibold text-red-900">
              Escalation required — {item.escalation.reason}
            </h3>
            <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.07em] text-white">
              Agent stopped
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-red-900/80">
            {item.escalation.detail}
          </p>
          {item.escalation.evidence?.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-red-800">
                Evidence:
              </span>
              {item.escalation.evidence.map((id) => {
                const evidence = getEvidenceItem(id);
                return (
                  <span
                    key={id}
                    className="num rounded border border-red-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-red-800"
                    title={evidence?.finding}
                  >
                    {id}
                  </span>
                );
              })}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {item.status === "Escalated" ? (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-[11px] font-semibold text-red-800 ring-1 ring-inset ring-red-200">
                <ShieldAlert className="h-3.5 w-3.5" />
                Escalated to senior quality engineer
              </span>
            ) : (
              <Button
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() =>
                  reviewDiagnosis(item.id, "escalate", {
                    reason: item.escalation.reason,
                    detail: item.escalation.detail,
                    evidence: item.escalation.evidence,
                  })
                }
              >
                <ShieldAlert className="mr-1.5 h-3.5 w-3.5" />
                Escalate to senior engineer
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => goToStep(3)}>
              <FileSearch className="mr-1.5 h-3.5 w-3.5" />
              Request more information
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => resolveEscalation(item.id, "Returned to investigation by engineer.")}
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Return to investigation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
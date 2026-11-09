import { useState } from "react";
import { ArrowRight, BadgeCheck, FileSearch, ShieldAlert, ThumbsDown, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useInvestigation } from "@/lib/investigationStore";
import { getEvidenceItem } from "@/lib/mockData";
import { cn } from "@/lib/utils";

function EvidenceLine({ id, tone }) {
  const evidence = getEvidenceItem(id);
  if (!evidence) return null;
  return (
    <li className="flex gap-2 text-[11.5px] leading-snug">
      <span
        className={cn(
          "num mt-0.5 shrink-0 rounded px-1 py-0.5 text-[9.5px] font-semibold",
          tone === "support" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
        )}
      >
        {id}
      </span>
      <span className="text-muted-foreground">{evidence.finding}</span>
    </li>
  );
}

export default function StepDiagnosis({ item, goToStep }) {
  const { reviewDiagnosis } = useInvestigation();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [escalateOpen, setEscalateOpen] = useState(false);
  const [reason, setReason] = useState("");

  const diagnosis = item.diagnosis;
  if (!diagnosis) {
    return (
      <div className="panel p-8 text-center">
        <p className="text-[12.5px] text-muted-foreground">
          No diagnosis yet. Run a diagnostic check and enter its result to produce an updated
          assessment.
        </p>
        <Button className="mt-3" variant="outline" onClick={() => goToStep(5)}>
          Go to diagnostic checks
        </Button>
      </div>
    );
  }

  const previous = item.previousHypotheses || [];
  const rows = [...item.hypotheses]
    .map((hypothesis) => {
      const before = previous.find((entry) => entry.name === hypothesis.name);
      return {
        name: hypothesis.name,
        before: before ? before.confidence : null,
        after: hypothesis.confidence,
        delta: before ? hypothesis.confidence - before.confidence : null,
      };
    })
    .sort((a, b) => b.after - a.after);

  const approved = item.diagnosisReview?.state === "approved";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="panel p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
                  Primary root cause
                </p>
                <h2 className="mt-1 font-heading text-[19px] font-semibold tracking-[-0.02em] text-[#0B2138]">
                  {diagnosis.primary}
                </h2>
              </div>
              <div className="text-right">
                <p className="num font-heading text-[24px] font-semibold leading-none text-[#1D4FD8]">
                  {diagnosis.confidence}%
                </p>
                <p className="mt-1 text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground">
                  illustrative score
                </p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
                  diagnosis.lowConfidence
                    ? "bg-red-50 text-red-700 ring-red-200"
                    : "bg-amber-50 text-amber-700 ring-amber-200"
                )}
              >
                {diagnosis.status}
              </span>
              <StatusBadge value={item.severity} />
              <StatusBadge value={item.status} />
            </div>

            <p className="mt-3 rounded-lg bg-secondary/60 p-3 text-[12px] leading-relaxed text-foreground">
              {diagnosis.summary}
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-emerald-700">
                  Supporting evidence
                </p>
                <ul className="space-y-1.5">
                  {diagnosis.supporting.length === 0 && (
                    <li className="text-[11.5px] text-muted-foreground">No supporting records.</li>
                  )}
                  {diagnosis.supporting.map((id) => (
                    <EvidenceLine key={id} id={id} tone="support" />
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-red-700">
                  Contradicting evidence
                </p>
                <ul className="space-y-1.5">
                  {diagnosis.contradicting.length === 0 && (
                    <li className="text-[11.5px] text-muted-foreground">
                      None recorded — contradictory records are retained where present.
                    </li>
                  )}
                  {diagnosis.contradicting.map((id) => (
                    <EvidenceLine key={id} id={id} tone="contradict" />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="panel overflow-hidden">
            <div className="border-b border-border px-4 py-2.5">
              <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-[#0B2138]">
                Original vs updated hypotheses
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Change produced by the diagnostic result
              </p>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/50 text-[10px] uppercase tracking-[0.07em] text-muted-foreground">
                  <th className="px-4 py-2 font-semibold">Hypothesis</th>
                  <th className="px-3 py-2 font-semibold">Original</th>
                  <th className="px-3 py-2 font-semibold">Updated</th>
                  <th className="px-4 py-2 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-[12px]">
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td className="px-4 py-2 font-medium text-foreground">{row.name}</td>
                    <td className="num px-3 py-2 text-muted-foreground">
                      {row.before !== null ? `${row.before}%` : "—"}
                    </td>
                    <td className="num px-3 py-2 font-semibold text-foreground">{row.after}%</td>
                    <td className="px-4 py-2">
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10.5px] font-medium",
                          row.delta === null
                            ? "bg-secondary text-muted-foreground"
                            : row.delta > 0
                              ? "bg-emerald-50 text-emerald-700"
                              : row.delta < 0
                                ? "bg-red-50 text-red-700"
                                : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {row.delta === null
                          ? "New"
                          : row.delta === 0
                            ? "Unchanged"
                            : `${row.delta > 0 ? "+" : ""}${row.delta} pts`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="panel p-4">
            <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-[#0B2138]">
              Diagnosis review
            </h3>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
              The agent cannot approve a diagnosis or release a corrective action. A quality
              engineer must decide.
            </p>

            {approved ? (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-800">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Diagnosis approved
                </p>
                <p className="mt-0.5 text-[11px] text-emerald-900/80">
                  Approved by {item.diagnosisReview.by}. Corrective action drafting is available.
                </p>
                <Button className="mt-2 w-full" size="sm" onClick={() => goToStep(7)}>
                  Open corrective action
                </Button>
              </div>
            ) : item.escalation ? (
              <p className="mt-3 rounded-lg border border-red-200 bg-red-50/70 p-3 text-[11.5px] leading-relaxed text-red-900/80">
                This case is escalated. Have the senior quality engineer review it and return the case
                to investigation before approving a diagnosis.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                <Button
                  className="w-full bg-[#2563EB] hover:bg-[#1D4FD8]"
                  onClick={() => setApproveOpen(true)}
                >
                  <BadgeCheck className="mr-1.5 h-4 w-4" />
                  Approve Diagnosis
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setRejectOpen(true)}>
                  <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
                  Reject Diagnosis
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    reviewDiagnosis(item.id, "more_evidence");
                    toast.info("Returned for more evidence");
                    goToStep(5);
                  }}
                >
                  <FileSearch className="mr-1.5 h-3.5 w-3.5" />
                  Request More Evidence
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => setEscalateOpen(true)}
                >
                  <ShieldAlert className="mr-1.5 h-3.5 w-3.5" />
                  Escalate to Senior Engineer
                </Button>
              </div>
            )}
          </div>

          {item.diagnosisReview?.state === "rejected" && (
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-3">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-red-800">
                <XCircle className="h-3.5 w-3.5" />
                Diagnosis rejected
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-red-900/80">
                {item.diagnosisReview.reason}
              </p>
            </div>
          )}

          {!approved && (
            <p className="px-1 text-[10.5px] leading-relaxed text-muted-foreground">
              Remaining uncertainty stays visible after approval: the case keeps its supporting and
              contradicting evidence.
            </p>
          )}
        </aside>
      </div>

      <ConfirmationModal
        open={approveOpen}
        onOpenChange={setApproveOpen}
        title="Approve this diagnosis?"
        description={`${diagnosis.primary} at ${diagnosis.confidence}% illustrative confidence. Approval records your decision in the audit trail and opens the corrective action stage.`}
        confirmLabel="Approve diagnosis"
        onConfirm={() => {
          reviewDiagnosis(item.id, "approve");
          setApproveOpen(false);
          toast.success("Diagnosis approved", { description: "Corrective action stage opened." });
          goToStep(7);
        }}
      >
        <div className="rounded-lg bg-secondary/60 p-3 text-[11.5px] leading-relaxed text-muted-foreground">
          You are confirming the root cause on the evidence available. The agent will draft a
          corrective action plan, which you must approve separately.
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        title="Reject this diagnosis"
        description="The case returns to investigation and the diagnostic checks are reopened."
        confirmLabel="Reject and return"
        tone="destructive"
        confirmDisabled={reason.trim().length < 5}
        onConfirm={() => {
          reviewDiagnosis(item.id, "reject", { reason });
          setRejectOpen(false);
          setReason("");
          toast.info("Diagnosis rejected", { description: "Case returned to investigation." });
          goToStep(4);
        }}
      >
        <div>
          <Label className="mb-1.5 block text-[11.5px] font-medium">Reason for rejection</Label>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={3}
            className="text-[12px]"
            placeholder="Which evidence was not given sufficient weight?"
          />
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        open={escalateOpen}
        onOpenChange={setEscalateOpen}
        title="Escalate to senior quality engineer"
        description="The case status changes to Escalated and the reason is recorded in the audit trail."
        confirmLabel="Escalate case"
        confirmDisabled={reason.trim().length < 5}
        onConfirm={() => {
          reviewDiagnosis(item.id, "escalate", {
            reason: reason || "Diagnosis requires senior review",
            detail: `Escalated by ${item.engineer}: ${reason}`,
          });
          setEscalateOpen(false);
          setReason("");
          toast.info("Case escalated");
        }}
      >
        <div>
          <Label className="mb-1.5 block text-[11.5px] font-medium">Escalation reason</Label>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={3}
            className="text-[12px]"
            placeholder="Why does this diagnosis need senior review?"
          />
        </div>
      </ConfirmationModal>

      {approved && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-white p-3">
          <p className="text-[11.5px] text-muted-foreground">
            Diagnosis approved. Continue to the corrective action plan.
          </p>
          <Button size="sm" className="bg-[#2563EB] hover:bg-[#1D4FD8]" onClick={() => goToStep(7)}>
            Corrective action
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
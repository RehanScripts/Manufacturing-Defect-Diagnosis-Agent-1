import { useState } from "react";
import { CheckCircle2, ClipboardList, FlaskConical, Info, Loader2, Plus, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import DiagnosticCheckCard from "@/components/investigation/DiagnosticCheckCard";
import { useInvestigation } from "@/lib/investigationStore";

const OUTCOMES = ["Supports hypothesis", "Contradicts hypothesis", "Inconclusive"];

export default function StepDiagnosticCheck({ item, goToStep }) {
  const { approveCheck, rejectCheck, submitCheckResult, agent } = useInvestigation();
  const recommended =
    item.checks.find((check) => check.recommended && check.status !== "rejected") ||
    item.checks.find((check) => check.status === "available") ||
    item.checks[0];
  const approved = item.checks.filter((check) => check.status === "approved");
  const completed = item.checks.filter((check) => check.status === "completed");
  const rejected = item.checks.filter((check) => check.status === "rejected");

  const [picker, setPicker] = useState(false);
  const [selected, setSelected] = useState(null);
  const [approveTarget, setApproveTarget] = useState(null);
  const [resultTarget, setResultTarget] = useState(null);
  const [outcome, setOutcome] = useState(OUTCOMES[0]);
  const [notes, setNotes] = useState("");

  const run = agent[item.id];
  const busy = Boolean(run && !run.done);
  const hasProgress = item.checks.some(
    (check) => check.status === "approved" || check.status === "completed"
  );

  const confirmApprove = () => {
    if (!approveTarget) return;
    approveCheck(item.id, approveTarget.id);
    toast.success(`${approveTarget.name} approved`, { description: "Approved — Awaiting Result" });
    setApproveTarget(null);
    setPicker(false);
    setSelected(null);
  };

  const confirmResult = () => {
    if (!resultTarget) return;
    const checkId = resultTarget.id;
    setResultTarget(null);
    toast.info("Result recorded", { description: "The agent is revising the hypotheses." });
    submitCheckResult(item.id, checkId, { outcome, notes }, () => goToStep(6));
    setOutcome(OUTCOMES[0]);
    setNotes("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-heading text-[14px] font-semibold tracking-[-0.01em] text-[#0B2138]">
            Diagnostic check recommendation
          </h2>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            The agent selected the check with the highest expected information gain. Your approval is
            required before it is released.
          </p>
        </div>
        <StatusBadge value={approved.length ? "approved" : "recommended"} />
      </div>

      {!hasProgress && (
        <div className="panel p-4">
          <div className="mb-3 flex items-start gap-2 rounded-lg bg-[#F4F8FF] p-2.5">
            <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563EB]" />
            <p className="text-[11.5px] leading-relaxed text-[#12406F]">
              <span className="font-semibold">Recommended check:</span> {recommended.name}. The check
              can distinguish {recommended.hypotheses.join(", ").toLowerCase()} from the competing
              hypotheses and improve the investigation confidence.
            </p>
          </div>

          <DiagnosticCheckCard check={recommended} recommended />

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              className="bg-[#2563EB] hover:bg-[#1D4FD8]"
              onClick={() => setApproveTarget(recommended)}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              Accept recommendation
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                rejectCheck(item.id, recommended.id);
                toast.info("Recommendation rejected", {
                  description: "Choose a different check to continue.",
                });
                setPicker(true);
              }}
            >
              <XCircle className="mr-1.5 h-3.5 w-3.5" />
              Reject recommendation
            </Button>
            <Button variant="outline" onClick={() => setPicker((value) => !value)}>
              <ClipboardList className="mr-1.5 h-3.5 w-3.5" />
              Choose a different check
            </Button>
          </div>
        </div>
      )}

      {hasProgress && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setPicker((value) => !value)}>
            <ClipboardList className="mr-1.5 h-3.5 w-3.5" />
            {picker ? "Hide check selection" : "Run another diagnostic check"}
          </Button>
        </div>
      )}

      {picker && (
        <div className="panel p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-heading text-[13px] font-semibold text-[#0B2138]">
              Available diagnostic checks
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setPicker(false)}>
              Close
            </Button>
          </div>
          <div className="space-y-2">
            {item.checks.map((check) => (
              <DiagnosticCheckCard
                key={check.id}
                check={check}
                recommended={check.recommended}
                selected={selected === check.id}
                compact
                onSelect={
                  check.status === "approved" || check.status === "completed"
                    ? undefined
                    : () => setSelected(check.id)
                }
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              className="bg-[#2563EB] hover:bg-[#1D4FD8]"
              disabled={!selected}
              onClick={() => setApproveTarget(item.checks.find((check) => check.id === selected))}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              Approve selected check
            </Button>
            <Button
              variant="outline"
              disabled={!selected}
              onClick={() => setApproveTarget(item.checks.find((check) => check.id === selected))}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Request additional check
            </Button>
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div className="panel p-4">
          <h3 className="mb-2 font-heading text-[13px] font-semibold text-[#0B2138]">
            Approved checks awaiting result
          </h3>
          <div className="space-y-2">
            {approved.map((check) => (
              <div
                key={check.id}
                className="flex flex-col gap-2 rounded-lg border border-indigo-100 bg-indigo-50/40 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[12.5px] font-medium text-foreground">
                    {check.id} · {check.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Assigned to {check.engineer} · estimated {check.duration}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge value="approved" label="Approved — Awaiting Result" />
                  <Button
                    size="sm"
                    className="bg-[#2563EB] hover:bg-[#1D4FD8]"
                    disabled={busy}
                    onClick={() => setResultTarget(check)}
                  >
                    Enter Check Result
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div className="panel p-4">
          <h3 className="mb-2 font-heading text-[13px] font-semibold text-[#0B2138]">
            Completed checks
          </h3>
          <div className="space-y-2">
            {completed.map((check) => (
              <div key={check.id} className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[12.5px] font-medium text-foreground">
                    {check.id} · {check.name}
                  </p>
                  <span className="rounded bg-white px-1.5 py-0.5 text-[10.5px] font-medium text-emerald-800">
                    {check.result?.outcome}
                  </span>
                </div>
                {check.result?.notes && (
                  <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                    {check.result.notes}
                  </p>
                )}
                <p className="mt-1 text-[10.5px] text-muted-foreground">
                  Recorded by {check.result?.by} · result evidence {check.resultEvidenceId}
                </p>
              </div>
            ))}
            <Button
              className="w-full bg-[#2563EB] hover:bg-[#1D4FD8]"
              onClick={() => goToStep(6)}
            >
              Continue to Updated Diagnosis
            </Button>
          </div>
        </div>
      )}

      {rejected.length > 0 && (
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Info className="h-3 w-3" />
          Rejected: {rejected.map((check) => `${check.id} ${check.name}`).join(", ")}
        </p>
      )}

      <ConfirmationModal
        open={Boolean(approveTarget)}
        onOpenChange={(open) => !open && setApproveTarget(null)}
        title="Approve Diagnostic Check?"
        description={
          approveTarget
            ? `${approveTarget.id} · ${approveTarget.name}. This releases the check to ${approveTarget.engineer} and records the approval in the audit trail.`
            : ""
        }
        confirmLabel="Approve Check"
        onConfirm={confirmApprove}
      >
        {approveTarget && (
          <div className="rounded-lg bg-secondary/60 p-3 text-[11.5px] leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground">Expected information</p>
            <p className="mt-0.5">{approveTarget.expected}</p>
            <p className="mt-2 text-[10.5px]">
              Approved checks cannot be released back to the agent automatically; the engineer
              enters the result.
            </p>
          </div>
        )}
      </ConfirmationModal>

      <ConfirmationModal
        open={Boolean(resultTarget)}
        onOpenChange={(open) => !open && setResultTarget(null)}
        title="Enter Check Result"
        description={
          resultTarget
            ? `${resultTarget.id} · ${resultTarget.name}. The result will revise the hypothesis set.`
            : ""
        }
        confirmLabel="Submit result"
        onConfirm={confirmResult}
        confirmDisabled={!outcome}
      >
        <div className="space-y-3">
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Result</Label>
            <RadioGroup value={outcome} onValueChange={setOutcome} className="space-y-1.5">
              {OUTCOMES.map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <RadioGroupItem value={option} id={`outcome-${option}`} />
                  <Label htmlFor={`outcome-${option}`} className="text-[12px] font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Engineer notes</Label>
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              className="text-[12px]"
              placeholder="Measured values, observations, and any deviation from the expected result."
            />
          </div>
        </div>
      </ConfirmationModal>

      {busy && (
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          The agent is revising hypotheses against the new result…
        </p>
      )}
    </div>
  );
}
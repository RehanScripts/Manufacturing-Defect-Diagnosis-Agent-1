import { useState } from "react";
import { ArrowRight, Info, Loader2, Play, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import VisualInspectionPanel from "@/components/investigation/VisualInspectionPanel";
import { useInvestigation } from "@/lib/investigationStore";

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-0">
      <span className="text-[11.5px] text-muted-foreground">{label}</span>
      <span className="text-right text-[12px] font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function StepVisualInspection({ item, goToStep }) {
  const { runVision, agent, updateCase } = useInvestigation();
  const run = agent[item.id];
  const busy = Boolean(run && !run.done);
  const vision = item.vision;

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
      <VisualInspectionPanel item={item} />

      <div className="space-y-4">
        <div className="panel p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-[14px] font-semibold tracking-[-0.01em] text-[#0B2138]">
                AI visual inspection
              </h2>
              <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                Simulated defect detection on the uploaded image
              </p>
            </div>
            <StatusBadge value={vision ? "Completed" : "Pending"} />
          </div>

          {!vision && (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-secondary/40 p-4">
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                Run the simulated inspection to classify the defect pattern. The inspection
                identifies the pattern only — it does not determine the root cause.
              </p>
              <Button
                className="mt-3 bg-[#2563EB] hover:bg-[#1D4FD8]"
                disabled={busy}
                onClick={() => runVision(item.id)}
              >
                {busy ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Analyzing…
                  </>
                ) : (
                  <>
                    <Play className="mr-1.5 h-4 w-4" /> Run AI visual inspection
                  </>
                )}
              </Button>
            </div>
          )}

          {vision && (
            <>
              <div className="mt-3">
                <Row label="Detected defect" value={vision.category} />
                <Row
                  label="Confidence (illustrative)"
                  value={
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full bg-[#2563EB]"
                          style={{ width: `${vision.confidence}%` }}
                        />
                      </span>
                      <span className="num">{vision.confidence}%</span>
                    </span>
                  }
                />
                <Row label="Severity classification" value={<StatusBadge value={vision.severity} />} />
                <Row label="Defect region" value="Highlighted on image" />
                <Row label="Source image" value={item.imageName || "inspection-image.png"} />
              </div>

              <div className="mt-3">
                <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Inspection findings
                </p>
                <ul className="space-y-1.5">
                  {vision.findings.map((finding) => (
                    <li key={finding} className="flex gap-2 text-[12px] leading-relaxed text-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
          <div className="flex gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
            <p className="text-[11.5px] leading-relaxed text-amber-900">
              Visual inspection identifies the defect pattern. Root cause determination requires
              production evidence and investigation.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            className="bg-[#2563EB] hover:bg-[#1D4FD8]"
            disabled={!vision}
            onClick={() => {
              updateCase(item.id, { stage: Math.max(item.stage, 3) });
              goToStep(3);
            }}
          >
            Continue to Evidence Retrieval
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          {vision && (
            <Button variant="ghost" size="sm" onClick={() => runVision(item.id)} disabled={busy}>
              <ScanLine className="mr-1.5 h-3.5 w-3.5" /> Re-run inspection
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { CheckCircle2, LineChart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/common/StatusBadge";
import { useInvestigation } from "@/lib/investigationStore";

export default function MonitoringPanel({ item }) {
  const { saveMonitoring, agent } = useInvestigation();
  const [draft, setDraft] = useState({});
  const run = agent[item.id];
  const busy = Boolean(run && !run.done);

  const valueFor = (row, key) => (draft[row.batchId]?.[key] ?? row[key] ?? "");
  const setValue = (batchId, key, value) =>
    setDraft((prev) => ({ ...prev, [batchId]: { ...(prev[batchId] || {}), [key]: value } }));

  const save = (row) => {
    const next = draft[row.batchId] || {};
    const payload = {
      inspections: next.inspections ?? row.inspections,
      defects: next.defects ?? row.defects,
      result: next.result ?? row.result,
      notes: next.notes ?? row.notes,
    };
    if (!payload.inspections || payload.defects === "" || !payload.result) {
      toast.error("Inspection count, defect count and result are required");
      return;
    }
    saveMonitoring(item.id, row.batchId, payload, (effectiveness) => {
      toast.success(`Batch ${row.batchId} recorded`);
      if (effectiveness) {
        toast.success("Monitoring complete", { description: `Effectiveness: ${effectiveness.result}` });
      }
    });
  };

  const completedCount = item.monitoring.filter((row) => row.completed).length;

  return (
    <section className="panel">
      <div className="flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 grid h-6 w-6 place-items-center rounded bg-amber-50 text-amber-600">
            <LineChart className="h-3 w-3" />
          </span>
          <div>
            <h2 className="font-heading text-[13.5px] font-semibold tracking-[-0.01em] text-[#0B2138]">
              Post-action monitoring
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Monitor the next 3 production batches for recurrence of {item.defectCategory.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="num text-[11.5px] font-medium text-muted-foreground">
            {completedCount}/{item.monitoring.length} batches
          </span>
          {item.effectiveness && <StatusBadge value={item.effectiveness.result} />}
        </div>
      </div>

      {!item.actionsApproved && (
        <p className="border-b border-border bg-secondary/40 px-4 py-2 text-[11px] text-muted-foreground">
          Monitoring opens once the corrective action plan is approved.
        </p>
      )}

      <div className="grid gap-3 p-4 md:grid-cols-3">
        {item.monitoring.map((row) => (
          <div key={row.batchId} className="rounded-lg border border-border p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="num font-heading text-[12.5px] font-semibold text-[#0B2138]">
                Batch {row.batchId}
              </p>
              {row.completed ? (
                <span className="flex items-center gap-1 text-[10.5px] font-medium text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" /> Recorded
                </span>
              ) : (
                <span className="text-[10.5px] text-muted-foreground">Pending</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                    Inspections
                  </Label>
                  <Input
                    type="number"
                    value={valueFor(row, "inspections")}
                    onChange={(event) => setValue(row.batchId, "inspections", event.target.value)}
                    className="h-8 text-[11.5px]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                    Defects
                  </Label>
                  <Input
                    type="number"
                    value={valueFor(row, "defects")}
                    onChange={(event) => setValue(row.batchId, "defects", event.target.value)}
                    className="h-8 text-[11.5px]"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                  Inspection result
                </Label>
                <Select
                  value={valueFor(row, "result") || undefined}
                  onValueChange={(value) => setValue(row.batchId, "result", value)}
                >
                  <SelectTrigger className="h-8 text-[11.5px]">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pass">Pass</SelectItem>
                    <SelectItem value="Fail">Fail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                  Notes
                </Label>
                <Input
                  value={valueFor(row, "notes")}
                  onChange={(event) => setValue(row.batchId, "notes", event.target.value)}
                  className="h-8 text-[11.5px]"
                  placeholder="Observation"
                />
              </div>
            </div>

            <Button
              size="sm"
              variant={row.completed ? "outline" : "default"}
              className={row.completed ? "mt-2 w-full" : "mt-2 w-full bg-[#2563EB] hover:bg-[#1D4FD8]"}
              disabled={!item.actionsApproved || busy}
              onClick={() => save(row)}
            >
              {busy ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Assessing…
                </>
              ) : (
                "Save result"
              )}
            </Button>
          </div>
        ))}
      </div>

      {item.effectiveness ? (
        <div className="border-t border-border p-4">
          <div className="rounded-lg border border-border bg-secondary/40 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Corrective action effectiveness
              </p>
              <StatusBadge value={item.effectiveness.result} />
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-foreground">
              {item.effectiveness.rationale}
            </p>
            <p className="mt-1 text-[10.5px] text-muted-foreground">
              Assessed only from the recorded monitoring data — no automatic claim of success.
            </p>
          </div>
        </div>
      ) : (
        <p className="border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          Effectiveness is assessed after all three batches are recorded.
        </p>
      )}
    </section>
  );
}
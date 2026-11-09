import { BadgeCheck, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CorrectiveActionPanel from "@/components/investigation/CorrectiveActionPanel";
import MonitoringPanel from "@/components/investigation/MonitoringPanel";
import { useInvestigation } from "@/lib/investigationStore";

export default function StepCorrectiveAction({ item }) {
  const { closeCase } = useInvestigation();
  const monitoringComplete = item.monitoring.every((row) => row.completed);

  return (
    <div className="space-y-4">
      <CorrectiveActionPanel item={item} />
      <MonitoringPanel item={item} />

      <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading text-[13px] font-semibold text-[#0B2138]">
            Investigation closure
          </h3>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            {item.effectiveness
              ? `Effectiveness assessed as ${item.effectiveness.result}. Closing archives the case with the full audit trail.`
              : "Closure becomes available once the corrective action plan is approved and monitoring is recorded."}
          </p>
        </div>
        {item.status === "Closed" ? (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1.5 text-[11.5px] font-medium text-emerald-800">
            <BadgeCheck className="h-3.5 w-3.5" /> Case closed
          </span>
        ) : (
          <Button
            className="bg-[#2563EB] hover:bg-[#1D4FD8]"
            disabled={!item.actionsApproved || !monitoringComplete}
            onClick={() => {
              closeCase(item.id);
              toast.success("Investigation closed", {
                description: "The audit trail retains every step of the case.",
              });
            }}
          >
            Close investigation
          </Button>
        )}
      </div>

      {(!item.actionsApproved || !monitoringComplete) && (
        <p className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
          <Lock className="h-3 w-3" />
          The agent cannot close a case or approve actions on its own.
        </p>
      )}
    </div>
  );
}
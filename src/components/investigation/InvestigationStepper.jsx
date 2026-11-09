import { AlertOctagon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const STEP_LABELS = [
  "Report Defect",
  "Analyze Inspection",
  "Retrieve Evidence",
  "Investigate Root Cause",
  "Run Diagnostic Checks",
  "Review Diagnosis",
  "Corrective Action",
];

export default function InvestigationStepper({ stage, current, onSelect, escalated }) {
  return (
    <div className="panel p-2">
      <ol className="flex items-stretch gap-0.5 overflow-x-auto">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < stage;
          const active = stepNumber === current;
          const locked = stepNumber > stage;
          const failed = escalated && active;

          return (
            <li key={label} className="min-w-[118px] flex-1">
              <button
                type="button"
                disabled={locked}
                onClick={() => onSelect(stepNumber)}
                className={cn(
                  "group flex w-full flex-col items-start gap-1.5 rounded-md px-2 py-2 text-left transition-colors",
                  active ? "bg-[#F4F8FF]" : "hover:bg-secondary/60",
                  locked && "cursor-not-allowed opacity-55 hover:bg-transparent"
                )}
              >
                <span className="flex w-full items-center gap-1.5">
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold",
                      failed
                        ? "bg-red-600 text-white"
                        : completed
                          ? "bg-emerald-600 text-white"
                          : active
                            ? "bg-[#2563EB] text-white"
                            : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {failed ? (
                      <AlertOctagon className="h-3 w-3" />
                    ) : completed ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      stepNumber
                    )}
                  </span>
                  <span
                    className={cn(
                      "h-px flex-1",
                      completed ? "bg-emerald-200" : "bg-border"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "text-[10.5px] leading-tight",
                    active
                      ? "font-semibold text-[#0B2138]"
                      : completed
                        ? "font-medium text-slate-600"
                        : "font-medium text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
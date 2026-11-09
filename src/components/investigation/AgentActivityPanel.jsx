import { Bot, CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";
import { useInvestigation } from "@/lib/investigationStore";
import { cn } from "@/lib/utils";

const STATE_ICON = {
  pending: Circle,
  running: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
};

const STATE_STYLE = {
  pending: "text-slate-300",
  running: "text-[#2563EB] animate-spin",
  completed: "text-emerald-600",
  failed: "text-red-600",
};

export default function AgentActivityPanel({ caseId, title = "Agent activity" }) {
  const { agent } = useInvestigation();
  const run = agent[caseId];
  if (!run) return null;

  const completed = run.steps.filter((step) => step.state === "completed").length;
  const pct = Math.round((completed / run.steps.length) * 100);

  return (
    <section className="panel border-[#D7E3F4] bg-[#F8FBFF] p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded bg-[#2563EB] text-white">
            <Bot className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="font-heading text-[12px] font-semibold text-[#0B2138]">{title}</p>
            <p className="text-[10px] text-muted-foreground">
              Simulated processing · {completed}/{run.steps.length} steps
            </p>
          </div>
        </div>
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.07em]",
            run.done ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
          )}
        >
          {run.done ? "Completed" : "Running"}
        </span>
      </div>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#E3ECF9]">
        <div
          className="h-full rounded-full bg-[#2563EB] transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-2.5 space-y-1.5">
        {run.steps.map((step, index) => {
          const Icon = STATE_ICON[step.state] || Circle;
          return (
            <li key={`${step.label}-${index}`} className="flex items-center gap-2">
              <Icon className={cn("h-3.5 w-3.5 shrink-0", STATE_STYLE[step.state])} />
              <span
                className={cn(
                  "text-[11.5px]",
                  step.state === "pending" ? "text-muted-foreground/70" : "text-foreground",
                  step.state === "failed" && "text-red-700"
                )}
              >
                {step.label}
              </span>
              <span className="ml-auto text-[9.5px] uppercase tracking-[0.06em] text-muted-foreground/70">
                {step.state}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
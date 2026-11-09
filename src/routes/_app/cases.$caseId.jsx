import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { History, SearchX } from "lucide-react";
import CaseHeader from "@/components/investigation/CaseHeader";
import InvestigationStepper from "@/components/investigation/InvestigationStepper";
import AgentActivityPanel from "@/components/investigation/AgentActivityPanel";
import EscalationAlert from "@/components/investigation/EscalationAlert";
import InvestigationTimeline from "@/components/investigation/InvestigationTimeline";
import StepReportDefect from "@/components/investigation/steps/StepReportDefect";
import StepVisualInspection from "@/components/investigation/steps/StepVisualInspection";
import StepEvidenceRetrieval from "@/components/investigation/steps/StepEvidenceRetrieval";
import StepRootCause from "@/components/investigation/steps/StepRootCause";
import StepDiagnosticCheck from "@/components/investigation/steps/StepDiagnosticCheck";
import StepDiagnosis from "@/components/investigation/steps/StepDiagnosis";
import StepCorrectiveAction from "@/components/investigation/steps/StepCorrectiveAction";
import { useInvestigation } from "@/lib/investigationStore";

export const Route = createFileRoute("/_app/cases/$caseId")({
  validateSearch: (search) => ({
    step: search.step ? Number(search.step) : undefined,
  }),
  component: CaseDetailPage,
  head: () => ({ meta: [{ title: "Investigation — Manufacturing Quality AI" }] }),
});

const STEP_COMPONENTS = [
  StepReportDefect,
  StepVisualInspection,
  StepEvidenceRetrieval,
  StepRootCause,
  StepDiagnosticCheck,
  StepDiagnosis,
  StepCorrectiveAction,
];

export function CaseDetailPage() {
  const { caseId } = Route.useParams();
  const { step } = Route.useSearch();
  const navigate = useNavigate();
  const { getCase } = useInvestigation();
  const item = getCase(caseId);
  const [timelineOpen, setTimelineOpen] = useState(false);

  if (!item) {
    return (
      <div className="panel p-10 text-center">
        <SearchX className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-2 font-heading text-[15px] font-semibold text-foreground">
          Case not found
        </p>
        <p className="mt-1 text-[12px] text-muted-foreground">
          {caseId} is not available. It may have been cleared by a demo reset.
        </p>
      </div>
    );
  }

  const current = step && step >= 1 && step <= item.stage ? step : item.stage;
  const StepComponent = STEP_COMPONENTS[current - 1] || StepVisualInspection;
  const goToStep = (next) =>
    navigate({
      to: "/cases/$caseId",
      params: { caseId: item.id },
      search: { step: next },
    });

  return (
    <div className="space-y-4">
      <CaseHeader item={item} />

      <InvestigationStepper
        stage={item.stage}
        current={current}
        onSelect={goToStep}
        escalated={item.status === "Escalated"}
      />

      <AgentActivityPanel caseId={item.id} />

      <EscalationAlert item={item} goToStep={goToStep} />

      <StepComponent item={item} goToStep={goToStep} />

      <section className="panel">
        <button
          type="button"
          onClick={() => setTimelineOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2">
            <History className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-heading text-[12.5px] font-semibold text-[#0B2138]">
              Case timeline
            </span>
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {item.timeline.length} events
            </span>
          </span>
          <span className="text-[11px] text-[#2563EB]">{timelineOpen ? "Hide" : "Show"}</span>
        </button>
        {timelineOpen && (
          <div className="border-t border-border px-4 py-4">
            <InvestigationTimeline events={item.timeline} />
          </div>
        )}
      </section>
    </div>
  );
}
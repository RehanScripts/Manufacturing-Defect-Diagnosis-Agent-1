import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SCENARIOS } from "@/lib/mockData";
import { useInvestigation } from "@/lib/investigationStore";
import StatusBadge from "@/components/common/StatusBadge";

export default function ScenarioModal({ open, onOpenChange }) {
  const { loadScenario, resetDemo } = useInvestigation();
  const navigate = useNavigate();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleLoad = (scenario) => {
    const nextCase = loadScenario(scenario.id);
    onOpenChange(false);
    if (nextCase) {
      toast.success(`${scenario.code} loaded`, {
        description: `${nextCase.id} · starting at step ${scenario.startStage}`,
      });
      navigate({ to: "/cases/$caseId", params: { caseId: nextCase.id } });
    }
  };

  const handleReset = () => {
    resetDemo();
    setConfirmReset(false);
    onOpenChange(false);
    toast.success("Demo data restored", { description: "Locally created cases were cleared." });
    navigate({ to: "/" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-[18px] tracking-[-0.01em]">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            Load a demo scenario
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Each scenario populates a complete investigation with evidence, hypotheses and
            diagnostic state. Replay it from the beginning at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => handleLoad(scenario)}
              className="group flex w-full items-start gap-3 rounded-lg border border-border bg-white p-3 text-left transition-colors hover:border-[#BFD3F2] hover:bg-[#F7FAFF]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-secondary font-heading text-[12px] font-semibold text-[#12406F]">
                {scenario.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-[13px] font-semibold text-foreground">
                    {scenario.title}
                  </span>
                  <StatusBadge value={scenario.severity} dot={false} />
                </span>
                <span className="mt-1 block text-[12px] leading-relaxed text-muted-foreground">
                  {scenario.summary}
                </span>
                <span className="mt-1.5 block text-[11px] text-muted-foreground">
                  {scenario.defect} · starts at step {scenario.startStage} · {scenario.note}
                </span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[#2563EB]" />
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 rounded-lg border border-dashed border-border bg-secondary/40 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[12.5px] font-medium text-foreground">Reset demo</p>
            <p className="text-[11.5px] text-muted-foreground">
              Restores the seeded cases and clears everything created in this session.
            </p>
          </div>
          {confirmReset ? (
            <div className="flex shrink-0 items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleReset}
              >
                Reset everything
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setConfirmReset(true)}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset Demo
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { toast } from "sonner";
import DefectForm from "@/components/investigation/DefectForm";
import { useInvestigation } from "@/lib/investigationStore";

export default function StepReportDefect({ item, goToStep }) {
  const { updateCase } = useInvestigation();

  const handleSubmit = (form) => {
    updateCase(
      item.id,
      {
        ...form,
        status: item.status === "Draft" ? "Under Investigation" : item.status,
        stage: Math.max(item.stage, 2),
      },
      {
        action: "Defect report submitted",
        actor: item.inspector,
        actorType: "Human",
        description: `Report confirmed for ${form.defectCategory} on batch ${form.batchId}.`,
      }
    );
    toast.success("Defect report saved");
    goToStep(2);
  };

  const handleDraft = (form) => {
    updateCase(item.id, { ...form, status: "Draft" }, {
      action: "Draft saved",
      actor: item.inspector,
      actorType: "Human",
      description: `Report draft updated for ${item.id}.`,
    });
    toast.success("Draft saved");
  };

  return (
    <DefectForm
      initial={item}
      onSubmit={handleSubmit}
      onSaveDraft={item.status === "Draft" ? handleDraft : undefined}
      submitLabel={item.status === "Draft" ? "Start Investigation" : "Save and continue"}
    />
  );
}
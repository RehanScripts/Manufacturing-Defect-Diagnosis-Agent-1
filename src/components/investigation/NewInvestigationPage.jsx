import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import PageHeader from "@/components/common/PageHeader";
import DefectForm from "@/components/investigation/DefectForm";
import { useInvestigation } from "@/lib/investigationStore";

export default function NewInvestigationPage() {
  const { createCase } = useInvestigation();
  const navigate = useNavigate();

  const handleSubmit = (form) => {
    const created = createCase(form);
    toast.success(`Investigation ${created.id} created`, {
      description: "Simulated visual inspection is ready to run.",
    });
    navigate({ to: "/cases/$caseId", params: { caseId: created.id } });
  };

  const handleDraft = (form) => {
    const created = createCase(form, { draft: true });
    toast.success("Draft saved", { description: created.id });
    navigate({ to: "/cases/$caseId", params: { caseId: created.id } });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="New investigation · Step 1 of 7"
        title="Report a defect"
        subtitle="Record the inspection finding, then let the agent retrieve production evidence before any root cause is proposed."
      />
      <DefectForm onSubmit={handleSubmit} onSaveDraft={handleDraft} />
    </div>
  );
}
import { useState } from "react";
import { BadgeCheck, Plus, Trash2, ThumbsDown, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useInvestigation } from "@/lib/investigationStore";
import {
  ACTION_OWNERS,
  ACTION_PRIORITIES,
  ACTION_STATUSES,
  CORRECTIVE_ACTION_TEMPLATES,
} from "@/lib/mockData";

export default function CorrectiveActionPanel({ item }) {
  const { saveActions, approveActions, rejectActions, setActionStatus } = useInvestigation();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");

  const actions = item.actions || [];

  const update = (id, patch) =>
    saveActions(
      item.id,
      actions.map((action) => (action.id === id ? { ...action, ...patch } : action))
    );

  const addAction = () =>
    saveActions(item.id, [
      ...actions,
      {
        id: `CA-${actions.length + 1}-${Math.random().toString(36).slice(2, 5)}`,
        description: "",
        owner: ACTION_OWNERS[0],
        priority: "Medium",
        dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        status: "Not Started",
        verification: "",
      },
    ]);

  const removeAction = (id) => saveActions(item.id, actions.filter((action) => action.id !== id));

  const generateDraft = () => {
    const template =
      CORRECTIVE_ACTION_TEMPLATES[item.diagnosis?.primary] ||
      CORRECTIVE_ACTION_TEMPLATES["Tool Wear"];
    saveActions(
      item.id,
      template.map((entry, index) => ({
        id: `CA-${index + 1}`,
        description: entry.description,
        owner: entry.owner,
        priority: entry.priority,
        dueDate: new Date(Date.now() + entry.dueDays * 86400000).toISOString(),
        status: "Not Started",
        verification: entry.verification,
      }))
    );
    toast.success("Draft plan generated");
  };

  return (
    <section className="panel">
      <div className="flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 grid h-6 w-6 place-items-center rounded bg-[#EEF4FF] text-[#2563EB]">
            <Wrench className="h-3 w-3" />
          </span>
          <div>
            <h2 className="font-heading text-[13.5px] font-semibold tracking-[-0.01em] text-[#0B2138]">
              Corrective action plan
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Root cause: {item.diagnosis?.primary || "not yet approved"} · plan requires engineer
              approval
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {item.actionsApproved && <StatusBadge value="Approved" label="Plan approved" />}
          <StatusBadge value={item.status} />
        </div>
      </div>

      {actions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-[12.5px] text-muted-foreground">
            No actions drafted yet for this case.
          </p>
          <Button className="mt-3" onClick={generateDraft}>
            <Plus className="mr-1.5 h-4 w-4" />
            Draft corrective action plan
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {actions.map((action, index) => (
            <div key={action.id} className="p-3.5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="num rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-[#12406F]">
                    {index + 1}
                  </span>
                  <StatusBadge value={action.priority} dot={false} />
                  <StatusBadge value={action.status} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Select
                    value={action.status}
                    onValueChange={(value) => setActionStatus(item.id, action.id, value)}
                  >
                    <SelectTrigger className="h-7 w-[126px] text-[11px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTION_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-red-600"
                    onClick={() => removeAction(action.id)}
                    aria-label="Remove action"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <Textarea
                value={action.description}
                onChange={(event) => update(action.id, { description: event.target.value })}
                rows={2}
                className="text-[12px]"
                placeholder="Action description"
              />

              <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                    Owner
                  </Label>
                  <Select
                    value={action.owner}
                    onValueChange={(value) => update(action.id, { owner: value })}
                  >
                    <SelectTrigger className="h-8 text-[11.5px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTION_OWNERS.map((owner) => (
                        <SelectItem key={owner} value={owner}>
                          {owner}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                    Priority
                  </Label>
                  <Select
                    value={action.priority}
                    onValueChange={(value) => update(action.id, { priority: value })}
                  >
                    <SelectTrigger className="h-8 text-[11.5px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTION_PRIORITIES.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                    Due date
                  </Label>
                  <Input
                    type="date"
                    value={(action.dueDate || "").slice(0, 10)}
                    onChange={(event) => {
                      if (!event.target.value) return;
                      update(action.id, {
                        dueDate: new Date(`${event.target.value}T12:00:00Z`).toISOString(),
                      });
                    }}
                    className="h-8 text-[11.5px]"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                    Verification method
                  </Label>
                  <Input
                    value={action.verification}
                    onChange={(event) => update(action.id, { verification: event.target.value })}
                    className="h-8 text-[11.5px]"
                    placeholder="How completion is verified"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3">
        <Button variant="outline" size="sm" onClick={addAction}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add another action
        </Button>
        {!item.actionsApproved && actions.length > 0 && (
          <>
            <Button
              size="sm"
              className="bg-[#2563EB] hover:bg-[#1D4FD8]"
              onClick={() => setApproveOpen(true)}
            >
              <BadgeCheck className="mr-1.5 h-3.5 w-3.5" />
              Approve corrective action plan
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-700 hover:bg-red-50"
              onClick={() => setRejectOpen(true)}
            >
              <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
              Reject plan
            </Button>
          </>
        )}
        {item.actionsApproved && (
          <p className="text-[11px] text-muted-foreground">
            Plan approved — update action status as work progresses. Actions remain
            human-controlled.
          </p>
        )}
      </div>

      {item.actionsRejectedReason && (
        <div className="border-t border-red-100 bg-red-50/60 px-4 py-2.5">
          <p className="text-[11.5px] text-red-800">Plan rejected: {item.actionsRejectedReason}</p>
        </div>
      )}

      <ConfirmationModal
        open={approveOpen}
        onOpenChange={setApproveOpen}
        title="Approve corrective action plan?"
        description={`${actions.length} actions will be released to their owners and recorded in the audit trail.`}
        confirmLabel="Approve plan"
        onConfirm={() => {
          approveActions(item.id);
          setApproveOpen(false);
          toast.success("Corrective action plan approved");
        }}
      >
        <ul className="max-h-48 space-y-1 overflow-y-auto rounded-lg bg-secondary/60 p-3">
          {actions.map((action) => (
            <li key={action.id} className="text-[11.5px] leading-snug text-muted-foreground">
              · {action.description || "(no description)"} — {action.owner}
            </li>
          ))}
        </ul>
      </ConfirmationModal>

      <ConfirmationModal
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        title="Reject corrective action plan"
        description="The plan stays editable and no actions are released."
        confirmLabel="Reject plan"
        tone="destructive"
        confirmDisabled={reason.trim().length < 5}
        onConfirm={() => {
          rejectActions(item.id, reason);
          setRejectOpen(false);
          setReason("");
          toast.info("Corrective action plan rejected");
        }}
      >
        <div>
          <Label className="mb-1.5 block text-[11.5px] font-medium">Reason</Label>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={3}
            className="text-[12px]"
            placeholder="What needs to change before this plan can be approved?"
          />
        </div>
      </ConfirmationModal>
    </section>
  );
}
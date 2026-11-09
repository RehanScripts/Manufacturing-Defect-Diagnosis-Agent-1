import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/common/StatusBadge";
import PageHeader from "@/components/common/PageHeader";
import { useInvestigation } from "@/lib/investigationStore";
import { ACTION_STATUSES } from "@/lib/mockData";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/actions")({
  component: CorrectiveActionsPage,
  head: () => ({ meta: [{ title: "Corrective Actions — Manufacturing Quality AI" }] }),
});

function CorrectiveActionsPage() {
  const { cases, setActionStatus } = useInvestigation();
  const withActions = cases.filter((item) => item.actions.length > 0);
  const allActions = withActions.flatMap((item) => item.actions);
  const open = allActions.filter(
    (action) => action.status === "Not Started" || action.status === "In Progress"
  ).length;
  const verified = allActions.filter((action) => action.status === "Verified").length;

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow={`${withActions.length} cases with an action plan`}
        title="Corrective Actions"
        subtitle="Every corrective action stays human-controlled. Update status as work progresses and verify completion."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total actions", value: allActions.length },
          { label: "Open actions", value: open },
          { label: "Verified actions", value: verified },
        ].map((metric) => (
          <div key={metric.label} className="panel p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {metric.label}
            </p>
            <p className="num mt-2 font-heading text-[24px] font-semibold leading-none text-foreground">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {withActions.length === 0 && (
        <div className="panel p-10 text-center text-[12.5px] text-muted-foreground">
          No corrective action plans yet. Approve a diagnosis to draft one.
        </div>
      )}

      <div className="space-y-3">
        {withActions.map((item) => {
          const done = item.actions.filter(
            (action) => action.status === "Completed" || action.status === "Verified"
          ).length;
          const pct = Math.round((done / item.actions.length) * 100);
          return (
            <section key={item.id} className="panel overflow-hidden">
              <div className="flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded bg-[#EEF4FF] text-[#2563EB]">
                    <ClipboardCheck className="h-3 w-3" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to="/cases/$caseId"
                        params={{ caseId: item.id }}
                        className="num text-[12.5px] font-semibold text-[#2563EB] hover:underline"
                      >
                        {item.id}
                      </Link>
                      <StatusBadge value={item.status} />
                      {item.actionsApproved && <StatusBadge value="Approved" label="Plan approved" />}
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      Root cause: {item.diagnosis?.primary || "not approved"} · {item.defectCategory} · batch{" "}
                      {item.batchId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[110px]">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Progress</span>
                      <span className="num">
                        {done}/{item.actions.length}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-emerald-600"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/cases/$caseId" params={{ caseId: item.id }}>
                      Open <ExternalLink className="ml-1.5 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] text-left">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50 text-[10px] uppercase tracking-[0.07em] text-muted-foreground">
                      <th className="px-4 py-2 font-semibold">Action</th>
                      <th className="px-3 py-2 font-semibold">Owner</th>
                      <th className="px-3 py-2 font-semibold">Priority</th>
                      <th className="px-3 py-2 font-semibold">Due</th>
                      <th className="px-3 py-2 font-semibold">Verification</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-[12px]">
                    {item.actions.map((action, index) => (
                      <tr key={action.id}>
                        <td className="px-4 py-2">
                          <span className="num mr-1.5 text-[10px] text-muted-foreground">
                            {index + 1}.
                          </span>
                          {action.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">
                          {action.owner}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2">
                          <StatusBadge value={action.priority} dot={false} />
                        </td>
                        <td className="num whitespace-nowrap px-3 py-2 text-muted-foreground">
                          {formatDate(action.dueDate)}
                        </td>
                        <td className="px-3 py-2 text-[11px] text-muted-foreground">
                          {action.verification}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <Select
                            value={action.status}
                            onValueChange={(value) => setActionStatus(item.id, action.id, value)}
                          >
                            <SelectTrigger className="h-7 w-[124px] text-[11px]">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
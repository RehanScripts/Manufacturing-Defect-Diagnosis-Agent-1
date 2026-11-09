import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import ChartCard from "@/components/charts/ChartCard";
import MonitoringTrendChart from "@/components/charts/MonitoringTrendChart";
import CategoryDonut from "@/components/charts/CategoryDonut";
import StatusBadge from "@/components/common/StatusBadge";
import { useInvestigation } from "@/lib/investigationStore";
import { effectivenessData, repeatDefectData } from "@/lib/mockData";

export const Route = createFileRoute("/_app/monitoring")({
  component: MonitoringPage,
  head: () => ({ meta: [{ title: "Quality Monitoring — Manufacturing Quality AI" }] }),
});

function MonitoringPage() {
  const { cases } = useInvestigation();
  const monitored = cases.filter((item) => item.actions.length > 0 || item.monitoring.some((row) => row.completed));

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Post-action quality performance"
        title="Quality Monitoring"
        subtitle="Defect rate, repeat defects and corrective action effectiveness — assessed only from recorded inspection evidence."
      />

      <div className="grid gap-3 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          title="Defect rate by batch"
          subtitle="Percentage of inspected units with a recorded defect"
        >
          <MonitoringTrendChart />
        </ChartCard>
        <ChartCard title="Corrective action effectiveness" subtitle="Assessed actions, quarter to date">
          <CategoryDonut data={effectivenessData} centerLabel="Actions" />
        </ChartCard>
      </div>

      <ChartCard title="Repeat defect frequency" subtitle="Defects per batch before and after action">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-[0.07em] text-muted-foreground">
              <th className="py-2 pr-3 font-semibold">Defect category</th>
              <th className="px-3 py-2 font-semibold">Before action</th>
              <th className="px-3 py-2 font-semibold">After action</th>
              <th className="px-3 py-2 font-semibold">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-[12px]">
            {repeatDefectData.map((row) => {
              const delta = row.before - row.after;
              return (
                <tr key={row.label}>
                  <td className="py-2 pr-3 font-medium text-foreground">{row.label}</td>
                  <td className="num px-3 py-2 text-muted-foreground">{row.before}</td>
                  <td className="num px-3 py-2 text-foreground">{row.after}</td>
                  <td className="px-3 py-2">
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-medium text-emerald-700">
                      −{delta} per batch
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ChartCard>

      <div className="space-y-3">
        {monitored.map((item) => {
          const completed = item.monitoring.filter((row) => row.completed).length;
          return (
            <section key={item.id} className="panel overflow-hidden">
              <div className="flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
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
                    {item.effectiveness && <StatusBadge value={item.effectiveness.result} />}
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                    Monitor the next 3 production batches for recurrence of{" "}
                    {item.defectCategory.toLowerCase()} · {completed}/3 recorded
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/cases/$caseId" params={{ caseId: item.id }} search={{ step: 7 }}>
                    Record results <ExternalLink className="ml-1.5 h-3 w-3" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-3">
                {item.monitoring.map((row) => {
                  const rate =
                    row.completed && Number(row.inspections)
                      ? ((Number(row.defects) / Number(row.inspections)) * 100).toFixed(1)
                      : null;
                  return (
                    <div key={row.batchId} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between">
                        <p className="num font-heading text-[12px] font-semibold text-[#0B2138]">
                          Batch {row.batchId}
                        </p>
                        {row.completed ? <StatusBadge value={row.result} /> : <StatusBadge value="Pending" />}
                      </div>
                      <dl className="mt-2 space-y-1 text-[11.5px]">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Inspected</dt>
                          <dd className="num text-foreground">{row.inspections || "—"}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Defects</dt>
                          <dd className="num text-foreground">{row.defects || "—"}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Defect rate</dt>
                          <dd className="num text-foreground">{rate ? `${rate}%` : "—"}</dd>
                        </div>
                      </dl>
                      {row.notes && (
                        <p className="mt-1.5 text-[10.5px] leading-snug text-muted-foreground">
                          {row.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {item.effectiveness && (
                <p className="border-t border-border px-4 py-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Effectiveness:</span>{" "}
                  {item.effectiveness.rationale}
                </p>
              )}
            </section>
          );
        })}

        {monitored.length === 0 && (
          <div className="panel p-10 text-center text-[12.5px] text-muted-foreground">
            No post-action monitoring is active. Approve a corrective action plan to start monitoring.
          </div>
        )}
      </div>
    </div>
  );
}
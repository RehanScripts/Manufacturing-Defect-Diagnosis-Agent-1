import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  ClipboardCheck,
  FolderSearch,
  Plus,
  ScanLine,
  Sparkles,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import ScenarioModal from "@/components/common/ScenarioModal";
import ChartCard from "@/components/charts/ChartCard";
import TrendAreaChart from "@/components/charts/TrendAreaChart";
import CategoryDonut from "@/components/charts/CategoryDonut";
import BatchBarChart from "@/components/charts/BatchBarChart";
import HorizontalBars from "@/components/charts/HorizontalBars";
import ActiveInvestigationsTable from "@/components/overview/ActiveInvestigationsTable";
import RecentActivity from "@/components/overview/RecentActivity";
import { useInvestigation } from "@/lib/investigationStore";
import {
  KPIS,
  defectByCategory,
  rootCauseDistribution,
  investigationStatusDistribution,
} from "@/lib/mockData";

export const Route = createFileRoute("/_app/")({
  component: OverviewPage,
  head: () => ({
    meta: [
      { title: "Manufacturing Quality Overview — Manufacturing Quality AI" },
      {
        name: "description",
        content:
          "Monitor defects, investigations, evidence and corrective actions across production.",
      },
    ],
  }),
});

const ICONS = {
  inspections: ScanLine,
  defects: AlertTriangle,
  active: FolderSearch,
  approvals: ClipboardCheck,
  verified: BadgeCheck,
  avg: Timer,
};

const TONES = {
  inspections: "default",
  defects: "danger",
  active: "warning",
  approvals: "default",
  verified: "success",
  avg: "default",
};

function OverviewPage() {
  const { cases } = useInvestigation();
  const [scenarioOpen, setScenarioOpen] = useState(false);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Pune Manufacturing Lab · Week 45"
        title="Manufacturing Quality Overview"
        subtitle="Monitor defects, investigations, evidence, and corrective actions across production."
        actions={
          <>
            <Button variant="outline" onClick={() => setScenarioOpen(true)}>
              <Sparkles className="mr-1.5 h-4 w-4" />
              Load Demo Scenario
            </Button>
            <Button asChild className="bg-[#2563EB] hover:bg-[#1D4FD8]">
              <Link to="/new">
                <Plus className="mr-1.5 h-4 w-4" />
                New Investigation
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {KPIS.map((kpi) => (
          <StatCard
            key={kpi.key}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            icon={ICONS[kpi.key]}
            tone={TONES[kpi.key]}
          />
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          title="Defect trends"
          subtitle="Daily recorded defects by category, last 5 weeks"
          right={
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
              86 total
            </span>
          }
        >
          <TrendAreaChart />
        </ChartCard>

        <ChartCard title="Defect distribution" subtitle="Share of the 86 defects by category">
          <CategoryDonut data={defectByCategory} centerLabel="Defects" />
        </ChartCard>
      </div>

      <div className="grid gap-3 xl:grid-cols-3">
        <ChartCard title="Defects by production batch" subtitle="Bars: defects · Line: defect rate">
          <BatchBarChart />
        </ChartCard>

        <ChartCard title="Root cause distribution" subtitle="Verified causes, quarter to date">
          <HorizontalBars data={rootCauseDistribution} />
        </ChartCard>

        <ChartCard title="Investigation status" subtitle="All open and closed cases">
          <CategoryDonut data={investigationStatusDistribution} centerLabel="Cases" />
        </ChartCard>
      </div>

      <ActiveInvestigationsTable cases={cases} />

      <RecentActivity />

      <ScenarioModal open={scenarioOpen} onOpenChange={setScenarioOpen} />
    </div>
  );
}
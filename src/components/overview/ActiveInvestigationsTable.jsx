import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDateTime } from "@/lib/format";

function Confidence({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-[#2563EB]"
          style={{ width: `${Math.max(4, value)}%` }}
        />
      </div>
      <span className="num text-[11.5px] font-medium text-foreground">{value}%</span>
    </div>
  );
}

export default function ActiveInvestigationsTable({ cases, className }) {
  const rows = cases
    .filter((item) => item.status !== "Draft")
    .slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);

  return (
    <section className={`panel overflow-hidden ${className || ""}`}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div>
          <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-[#0B2138]">
            Active Investigations
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Open cases across the facility, sorted by latest activity
          </p>
        </div>
        <Link
          to="/cases"
          className="hidden items-center gap-1 text-[11.5px] font-medium text-[#2563EB] hover:underline sm:flex"
        >
          All cases <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {[
                "Case ID",
                "Component",
                "Defect Type",
                "Batch ID",
                "Severity",
                "AI Confidence",
                "Status",
                "Engineer",
                "Last Updated",
                "",
              ].map((heading) => (
                <th
                  key={heading}
                  className="whitespace-nowrap px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted-foreground"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((item) => (
              <tr key={item.id} className="group transition-colors hover:bg-[#FAFBFD]">
                <td className="whitespace-nowrap px-4 py-2.5">
                  <Link
                    to="/cases/$caseId"
                    params={{ caseId: item.id }}
                    className="num text-[12px] font-semibold text-[#2563EB] hover:underline"
                  >
                    {item.id}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[12px] text-foreground">
                  {item.component}
                  <span className="ml-1.5 text-[10.5px] text-muted-foreground">
                    {item.componentId}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[12px] text-muted-foreground">
                  {item.defectCategory}
                </td>
                <td className="num whitespace-nowrap px-4 py-2.5 text-[12px] text-foreground">
                  {item.batchId}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <StatusBadge value={item.severity} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <Confidence value={item.vision?.confidence ?? item.diagnosis?.confidence ?? 0} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <StatusBadge value={item.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[12px] text-muted-foreground">
                  {item.engineer}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[11px] text-muted-foreground">
                  {formatDateTime(item.updatedAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-right">
                  <Link
                    to="/cases/$caseId"
                    params={{ caseId: item.id }}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-2 py-1 text-[11.5px] font-medium text-[#12406F] transition-colors hover:border-[#BFD3F2] hover:bg-[#F1F6FD]"
                  >
                    View Case
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-[12px] text-muted-foreground">
                  No investigations yet. Start one from New Investigation.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
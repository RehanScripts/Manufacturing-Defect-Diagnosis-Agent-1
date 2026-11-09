import { Link } from "@tanstack/react-router";
import { ArrowUpDown } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { key: "id", label: "Case ID" },
  { key: "component", label: "Component" },
  { key: "defectCategory", label: "Defect Category" },
  { key: "batchId", label: "Batch ID" },
  { key: "severity", label: "Severity" },
  { key: "rootCause", label: "Root Cause" },
  { key: "confidence", label: "Confidence" },
  { key: "status", label: "Status" },
  { key: "engineer", label: "Engineer" },
  { key: "createdAt", label: "Created" },
  { key: "updatedAt", label: "Updated" },
];

export default function CaseTable({ rows, sortKey, sortDir, onSort }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1080px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            {COLUMNS.map((column) => (
              <th key={column.key} className="whitespace-nowrap px-3 py-2">
                <button
                  type="button"
                  onClick={() => onSort(column.key)}
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.07em] transition-colors hover:text-foreground",
                    sortKey === column.key ? "text-[#2563EB]" : "text-muted-foreground"
                  )}
                >
                  {column.label}
                  <ArrowUpDown className="h-2.5 w-2.5" />
                  {sortKey === column.key && (
                    <span className="text-[9px]">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
            ))}
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-[#FAFBFD]">
              <td className="whitespace-nowrap px-3 py-2.5">
                <Link
                  to="/cases/$caseId"
                  params={{ caseId: item.id }}
                  className="num text-[12px] font-semibold text-[#2563EB] hover:underline"
                >
                  {item.id}
                </Link>
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-[12px] text-foreground">
                {item.component}
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-[12px] text-muted-foreground">
                {item.defectCategory}
              </td>
              <td className="num whitespace-nowrap px-3 py-2.5 text-[12px] text-foreground">
                {item.batchId}
              </td>
              <td className="whitespace-nowrap px-3 py-2.5">
                <StatusBadge value={item.severity} />
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-[12px] text-foreground">
                {item.diagnosis?.primary || "—"}
              </td>
              <td className="num whitespace-nowrap px-3 py-2.5 text-[12px] text-foreground">
                {item.diagnosis?.confidence ?? item.vision?.confidence ?? 0}%
              </td>
              <td className="whitespace-nowrap px-3 py-2.5">
                <StatusBadge value={item.status} />
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-[12px] text-muted-foreground">
                {item.engineer}
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-[11px] text-muted-foreground">
                {formatDate(item.createdAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-[11px] text-muted-foreground">
                {formatDate(item.updatedAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 text-right">
                <Link
                  to="/cases/$caseId"
                  params={{ caseId: item.id }}
                  className="rounded-md border border-border bg-white px-2 py-1 text-[11px] font-medium text-[#12406F] transition-colors hover:border-[#BFD3F2] hover:bg-[#F1F6FD]"
                >
                  Open case
                </Link>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={12} className="px-3 py-10 text-center text-[12px] text-muted-foreground">
                No cases match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
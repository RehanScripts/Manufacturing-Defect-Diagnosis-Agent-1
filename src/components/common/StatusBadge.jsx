import { cn } from "@/lib/utils";

const TONE = {
  Draft: "bg-slate-50 text-slate-600 ring-slate-200",
  "Under Investigation": "bg-amber-50 text-amber-700 ring-amber-200",
  "Diagnosis Approved": "bg-blue-50 text-blue-700 ring-blue-200",
  "Corrective Action Approved": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "Corrective Action In Progress": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Verified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Closed: "bg-slate-100 text-slate-700 ring-slate-200",
  Escalated: "bg-red-50 text-red-700 ring-red-200",
  Low: "bg-slate-50 text-slate-600 ring-slate-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  High: "bg-orange-50 text-orange-700 ring-orange-200",
  Critical: "bg-red-50 text-red-700 ring-red-200",
  Relevant: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Inconclusive: "bg-amber-50 text-amber-700 ring-amber-200",
  Conflicting: "bg-red-50 text-red-700 ring-red-200",
  Pending: "bg-slate-50 text-slate-600 ring-slate-200",
  available: "bg-slate-50 text-slate-600 ring-slate-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  recommended: "bg-blue-50 text-blue-700 ring-blue-200",
  approved: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
  "Not Started": "bg-slate-50 text-slate-600 ring-slate-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Fail: "bg-red-50 text-red-700 ring-red-200",
  Effective: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Partially Effective": "bg-amber-50 text-amber-700 ring-amber-200",
  Ineffective: "bg-red-50 text-red-700 ring-red-200",
  "Insufficient Data": "bg-slate-100 text-slate-700 ring-slate-200",
  running: "bg-blue-50 text-blue-700 ring-blue-200",
  failed: "bg-red-50 text-red-700 ring-red-200",
  Failed: "bg-red-50 text-red-700 ring-red-200",
  human: "bg-slate-100 text-slate-700 ring-slate-200",
  agent: "bg-blue-50 text-blue-700 ring-blue-200",
};

export default function StatusBadge({ value, className, dot = true, label }) {
  if (!value) return null;
  const tone = TONE[value] || "bg-slate-50 text-slate-600 ring-slate-200";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        tone,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />}
      {label || value}
    </span>
  );
}
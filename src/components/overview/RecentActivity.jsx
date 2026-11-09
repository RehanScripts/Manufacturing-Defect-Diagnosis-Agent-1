import { Link } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileSearch,
  FlaskConical,
  ScanLine,
  ShieldAlert,
} from "lucide-react";
import { useInvestigation } from "@/lib/investigationStore";
import { formatDateTime } from "@/lib/format";

function iconFor(action = "") {
  if (/escalat/i.test(action)) return { icon: ShieldAlert, tone: "bg-red-50 text-red-600 ring-red-100" };
  if (/monitor/i.test(action)) return { icon: FileSearch, tone: "bg-amber-50 text-amber-600 ring-amber-100" };
  if (/approv|reject/i.test(action)) return { icon: ClipboardCheck, tone: "bg-indigo-50 text-indigo-600 ring-indigo-100" };
  if (/evidence/i.test(action)) return { icon: Database, tone: "bg-slate-50 text-slate-600 ring-slate-200" };
  if (/hypothes|diagnos|image|vision/i.test(action))
    return { icon: FlaskConical, tone: "bg-sky-50 text-sky-600 ring-sky-100" };
  if (/verified|closed|completed/i.test(action))
    return { icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600 ring-emerald-100" };
  if (/created|draft|report/i.test(action))
    return { icon: ScanLine, tone: "bg-blue-50 text-blue-600 ring-blue-100" };
  return { icon: Activity, tone: "bg-slate-50 text-slate-600 ring-slate-200" };
}

export default function RecentActivity({ className }) {
  const { audit } = useInvestigation();
  const events = audit.slice(0, 8);

  return (
    <section className={`panel ${className || ""}`}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
        <div>
          <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-[#0B2138]">
            Recent Activity
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Agent and engineer events across all investigations
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <ul className="divide-y divide-border">
        {events.map((event) => {
          const { icon: Icon, tone } = iconFor(event.action);
          return (
            <li key={event.id} className="flex gap-3 px-4 py-2.5 sm:px-5">
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md ring-1 ring-inset ${tone}`}
              >
                <Icon className="h-3 w-3" strokeWidth={2.1} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] leading-snug text-foreground">{event.description}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10.5px] text-muted-foreground">
                  <span className="font-medium text-[#12406F]">{event.action}</span>
                  <span className="text-muted-foreground/50">·</span>
                  {event.caseId ? (
                    <Link
                      to="/cases/$caseId"
                      params={{ caseId: event.caseId }}
                      className="num font-medium text-[#2563EB] hover:underline"
                    >
                      {event.caseId}
                    </Link>
                  ) : (
                    <span>{event.actor}</span>
                  )}
                  <span className="text-muted-foreground/50">·</span>
                  <span>{formatDateTime(event.at)}</span>
                </div>
              </div>
            </li>
          );
        })}
        {events.length === 0 && (
          <li className="px-4 py-6 text-center text-[12px] text-muted-foreground">
            No activity recorded yet.
          </li>
        )}
      </ul>
    </section>
  );
}
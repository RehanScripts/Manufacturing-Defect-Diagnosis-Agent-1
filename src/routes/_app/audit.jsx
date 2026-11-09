import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/audit")({
  component: AuditTrailPage,
  head: () => ({ meta: [{ title: "Audit Trail — Manufacturing Quality AI" }] }),
});

function AuditTrailPage() {
  const { audit, cases } = useInvestigation();
  const [query, setQuery] = useState("");
  const [actorType, setActorType] = useState("All");
  const [caseId, setCaseId] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 14;

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return audit
      .filter((event) => {
        if (actorType !== "All" && event.actorType !== actorType) return false;
        if (caseId !== "All" && event.caseId !== caseId) return false;
        if (!term) return true;
        return [event.action, event.actor, event.caseId, event.description]
          .join(" ")
          .toLowerCase()
          .includes(term);
      })
      .sort((a, b) => new Date(b.at) - new Date(a.at));
  }, [audit, query, actorType, caseId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow={`${audit.length} recorded events`}
        title="Audit Trail"
        subtitle="Every agent action and engineer decision is recorded with its timestamp, case and outcome. Entries cannot be edited."
      />

      <div className="panel p-3">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search action, actor, case or description…"
              className="h-9 pl-8 text-[12.5px]"
            />
          </div>
          <Select
            value={actorType}
            onValueChange={(value) => {
              setActorType(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[160px] text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All actors</SelectItem>
              <SelectItem value="Human">Human only</SelectItem>
              <SelectItem value="Agent">Agent only</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={caseId}
            onValueChange={(value) => {
              setCaseId(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[180px] text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All cases</SelectItem>
              {cases.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <p className="text-[11.5px] text-muted-foreground">
            {filtered.length} event{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="rounded border border-border px-2 py-1 text-[11px] disabled:opacity-40"
              disabled={safePage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Previous
            </button>
            <span className="num text-[11px] text-muted-foreground">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              className="rounded border border-border px-2 py-1 text-[11px] disabled:opacity-40"
              disabled={safePage === totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            >
              Next
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-[10px] uppercase tracking-[0.07em] text-muted-foreground">
                <th className="px-4 py-2 font-semibold">Timestamp</th>
                <th className="px-3 py-2 font-semibold">Action</th>
                <th className="px-3 py-2 font-semibold">Actor</th>
                <th className="px-3 py-2 font-semibold">Case</th>
                <th className="px-3 py-2 font-semibold">Description</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-[12px]">
              {rows.map((event) => (
                <tr key={event.id} className="align-top">
                  <td className="num whitespace-nowrap px-4 py-2.5 text-[11px] text-muted-foreground">
                    {formatDateTime(event.at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium text-foreground">
                    {event.action}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                      <span
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded",
                          event.actorType === "Agent"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        )}
                      >
                        {event.actorType === "Agent" ? (
                          <Bot className="h-2.5 w-2.5" />
                        ) : (
                          <User className="h-2.5 w-2.5" />
                        )}
                      </span>
                      {event.actor}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5">
                    {event.caseId ? (
                      <Link
                        to="/cases/$caseId"
                        params={{ caseId: event.caseId }}
                        className="num text-[11.5px] font-medium text-[#2563EB] hover:underline"
                      >
                        {event.caseId}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-[11.5px] leading-snug text-muted-foreground">
                    {event.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <StatusBadge value={event.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[12px] text-muted-foreground">
                    No audit events match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
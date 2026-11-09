import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/common/PageHeader";
import CaseTable from "@/components/cases/CaseTable";
import { useInvestigation } from "@/lib/investigationStore";
import { CASE_STATUSES, DEFECT_CATEGORIES, ENGINEERS, SEVERITIES } from "@/lib/mockData";

export const Route = createFileRoute("/_app/cases/")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: CasesPage,
  head: () => ({ meta: [{ title: "Investigation Cases — Manufacturing Quality AI" }] }),
});

const PAGE_SIZE = 8;

function CasesPage() {
  const { cases } = useInvestigation();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(search.q || "");
  const [status, setStatus] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  const [batch, setBatch] = useState("All");
  const [engineer, setEngineer] = useState("All");
  const [sortKey, setSortKey] = useState("updatedAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setQuery(search.q || "");
    setPage(1);
  }, [search.q]);

  const batches = useMemo(
    () => Array.from(new Set(cases.map((item) => item.batchId))).sort(),
    [cases]
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return cases.filter((item) => {
      if (status !== "All" && item.status !== status) return false;
      if (severity !== "All" && item.severity !== severity) return false;
      if (category !== "All" && item.defectCategory !== category) return false;
      if (batch !== "All" && item.batchId !== batch) return false;
      if (engineer !== "All" && item.engineer !== engineer) return false;
      if (!term) return true;
      return [
        item.id,
        item.component,
        item.componentId,
        item.batchId,
        item.machineId,
        item.defectCategory,
        item.engineer,
        item.diagnosis?.primary || "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [cases, query, status, severity, category, batch, engineer]);

  const sorted = useMemo(() => {
    const rows = [...filtered];
    rows.sort((a, b) => {
      const pick = (item) => {
        if (sortKey === "rootCause") return item.diagnosis?.primary || "";
        if (sortKey === "confidence")
          return item.diagnosis?.confidence ?? item.vision?.confidence ?? 0;
        return item[sortKey] ?? "";
      };
      const left = pick(a);
      const right = pick(b);
      if (typeof left === "number" && typeof right === "number") {
        return sortDir === "asc" ? left - right : right - left;
      }
      const compare = String(left).localeCompare(String(right));
      return sortDir === "asc" ? compare : -compare;
    });
    return rows;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const onSort = (key) => {
    if (key === sortKey) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const resetFilters = () => {
    setQuery("");
    setStatus("All");
    setSeverity("All");
    setCategory("All");
    setBatch("All");
    setEngineer("All");
    setPage(1);
    navigate({ to: "/cases", search: {} });
  };

  const filters = [
    { value: status, setter: setStatus, options: CASE_STATUSES, placeholder: "Status" },
    { value: severity, setter: setSeverity, options: SEVERITIES, placeholder: "Severity" },
    { value: category, setter: setCategory, options: DEFECT_CATEGORIES, placeholder: "Defect category" },
    { value: batch, setter: setBatch, options: batches, placeholder: "Batch ID" },
    { value: engineer, setter: setEngineer, options: ENGINEERS, placeholder: "Engineer" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow={`${cases.length} cases in the workspace`}
        title="Investigation Cases"
        subtitle="Search, filter and open every manufacturing quality investigation with its evidence and audit history."
        actions={
          <Button asChild className="bg-[#2563EB] hover:bg-[#1D4FD8]">
            <Link to="/new">
              <Plus className="mr-1.5 h-4 w-4" />
              New Investigation
            </Link>
          </Button>
        }
      />

      <div className="panel p-3">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search case ID, component, batch, machine or root cause…"
              className="h-9 pl-8 text-[12.5px]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Select
                key={filter.placeholder}
                value={filter.value}
                onValueChange={(value) => {
                  filter.setter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-9 w-[150px] text-[12px]">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All {filter.placeholder.toLowerCase()}s</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9 text-[12px]">
              <Filter className="mr-1.5 h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <p className="text-[11.5px] text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{pageRows.length}</span> of{" "}
            <span className="font-semibold text-foreground">{sorted.length}</span> cases
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={safePage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="num px-1 text-[11.5px] text-muted-foreground">
              {safePage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={safePage === totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              aria-label="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <CaseTable rows={pageRows} sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
      </div>
    </div>
  );
}
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/common/PageHeader";
import EvidenceCard from "@/components/investigation/EvidenceCard";
import { EVIDENCE_LIBRARY, SOURCE_TYPES } from "@/lib/mockData";

export const Route = createFileRoute("/_app/evidence")({
  component: EvidenceRepositoryPage,
  head: () => ({ meta: [{ title: "Evidence Repository — Manufacturing Quality AI" }] }),
});

function EvidenceRepositoryPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [batch, setBatch] = useState("All");

  const batches = useMemo(
    () => Array.from(new Set(EVIDENCE_LIBRARY.map((item) => item.batchId).filter(Boolean))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return EVIDENCE_LIBRARY.filter((item) => {
      if (tab !== "All" && item.sourceType !== tab) return false;
      if (batch !== "All" && item.batchId !== batch) return false;
      if (!term) return true;
      return [item.id, item.recordName, item.finding, item.reference, item.sourceType]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [tab, query, batch]);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow={`${EVIDENCE_LIBRARY.length} records indexed`}
        title="Evidence Repository"
        subtitle="Production records, machine logs, material reports, procedures, historical cases and maintenance records available to investigations."
      />

      <div className="panel p-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {["All", ...SOURCE_TYPES].map((source) => (
              <TabsTrigger
                key={source}
                value={source}
                className="h-8 rounded-md border border-transparent px-2.5 text-[11.5px] data-[state=active]:border-[#D7E3F4] data-[state=active]:bg-[#F4F8FF] data-[state=active]:text-[#12406F] data-[state=active]:shadow-none"
              >
                {source}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search evidence by record name, finding or reference…"
              className="h-9 pl-8 text-[12.5px]"
            />
          </div>
          <Select value={batch} onValueChange={setBatch}>
            <SelectTrigger className="h-9 w-[170px] text-[12px]">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All batches</SelectItem>
              {batches.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-[11.5px] text-muted-foreground">
        {filtered.length} evidence record{filtered.length === 1 ? "" : "s"} match the current view
      </p>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <EvidenceCard key={item.id} evidenceId={item.id} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="panel p-10 text-center text-[12.5px] text-muted-foreground">
          No evidence records match this search.
        </div>
      )}
    </div>
  );
}
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import PageHeader from "@/components/common/PageHeader";
import { KNOWLEDGE_ITEMS } from "@/lib/mockData";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/knowledge")({
  component: KnowledgeBasePage,
  head: () => ({ meta: [{ title: "Knowledge Base — Manufacturing Quality AI" }] }),
});

function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(KNOWLEDGE_ITEMS.map((item) => item.category)))],
    []
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return KNOWLEDGE_ITEMS.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (!term) return true;
      return [item.name, item.description, item.category].join(" ").toLowerCase().includes(term);
    });
  }, [query, category]);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Expert-reviewed knowledge"
        title="Knowledge Base"
        subtitle="Defect taxonomy, diagnostic procedures, inspection standards and corrective action guidance. Every item is reviewed by a quality engineer before it is used."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-800">
            <BadgeCheck className="h-3.5 w-3.5" />
            Expert-Reviewed Knowledge
          </span>
        }
      />

      <div className="panel p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search knowledge items…"
            className="h-9 pl-8 text-[12.5px]"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ${
                category === item
                  ? "border-[#D7E3F4] bg-[#F4F8FF] text-[#12406F]"
                  : "border-transparent text-muted-foreground hover:bg-secondary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="panel flex flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-[#12406F]">
                {item.category}
              </span>
              <StatusBadge value={item.status} dot />
            </div>
            <h3 className="mt-2 font-heading text-[13px] font-semibold leading-snug text-[#0B2138]">
              {item.name}
            </h3>
            <p className="mt-1 flex-1 text-[11.5px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
              <p className="text-[10.5px] text-muted-foreground">
                {item.reviewedBy} · {formatDate(item.lastReviewed)}
              </p>
              <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => setSelected(item)}>
                Open
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="panel p-10 text-center text-[12.5px] text-muted-foreground">
          No knowledge items match this search.
        </div>
      )}

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-start gap-2 font-heading text-[16px] leading-snug tracking-[-0.01em]">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
              {selected?.name}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                <span className="rounded bg-secondary px-1.5 py-0.5 font-medium text-[#12406F]">
                  {selected.category}
                </span>
                <StatusBadge value={selected.status} />
                <span>
                  Last reviewed {formatDate(selected.lastReviewed)} by {selected.reviewedBy}
                </span>
              </div>
              <p className="rounded-lg border border-border bg-white p-3 text-[12.5px] leading-relaxed text-foreground">
                {selected.body}
              </p>
              <p className="text-[10.5px] leading-relaxed text-muted-foreground">
                Knowledge items are updated only after human review — the agent never rewrites the
                knowledge base on its own.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
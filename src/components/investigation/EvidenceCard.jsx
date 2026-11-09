import { useState } from "react";
import { CheckCircle2, ChevronDown, FileText, HelpCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDateTime } from "@/lib/format";
import { getEvidenceItem } from "@/lib/mockData";

export default function EvidenceCard({ evidenceId, reviewStatus, onMark, defaultOpen = false }) {
  const evidence = getEvidenceItem(evidenceId);
  const [open, setOpen] = useState(defaultOpen);
  const [modalOpen, setModalOpen] = useState(false);
  if (!evidence) return null;

  const status = reviewStatus || evidence.status;

  return (
    <article className="panel overflow-hidden">
      <div className="flex flex-col gap-2 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="num rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-[#12406F]">
              {evidence.id}
            </span>
            <span className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
              {evidence.sourceType}
            </span>
          </div>
          <StatusBadge value={status} />
        </div>

        <div>
          <p className="text-[12.5px] font-semibold leading-snug text-foreground">
            {evidence.recordName}
          </p>
          <p className="mt-0.5 text-[10.5px] text-muted-foreground">{evidence.reference}</p>
        </div>

        <p className="text-[12px] leading-relaxed text-muted-foreground">{evidence.finding}</p>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.07em] text-muted-foreground">
            Relevance
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-[#2563EB]"
              style={{ width: `${evidence.relevance}%` }}
            />
          </div>
          <span className="num text-[10.5px] font-semibold text-foreground">
            {evidence.relevance}%
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2">
          <span className="text-[10px] text-muted-foreground">{formatDateTime(evidence.timestamp)}</span>
          <div className="flex items-center gap-1">
            {onMark && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-[11px] text-emerald-700 hover:bg-emerald-50"
                  onClick={() => onMark(evidence.id, status === "Relevant" ? "Pending" : "Relevant")}
                >
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Relevant
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-[11px] text-amber-700 hover:bg-amber-50"
                  onClick={() =>
                    onMark(evidence.id, status === "Inconclusive" ? "Pending" : "Inconclusive")
                  }
                >
                  <HelpCircle className="mr-1 h-3 w-3" />
                  Inconclusive
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-[11px]"
              onClick={() => setModalOpen(true)}
            >
              <FileText className="mr-1 h-3 w-3" />
              Source
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary"
              aria-label="Expand evidence"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="rounded-md bg-secondary/50 p-2.5">
            <p className="text-[11.5px] leading-relaxed text-muted-foreground">{evidence.detail}</p>
            <p className="mt-1.5 text-[10.5px] text-muted-foreground/80">
              Batch reference: {evidence.batchId || "not batch specific"} · Linked cases:{" "}
              {evidence.caseIds.length ? evidence.caseIds.join(", ") : "none"}
            </p>
          </div>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-[16px] tracking-[-0.01em]">
              {evidence.recordName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded-md bg-secondary/60 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-[0.07em] text-muted-foreground">Evidence ID</p>
                <p className="num font-semibold">{evidence.id}</p>
              </div>
              <div className="rounded-md bg-secondary/60 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-[0.07em] text-muted-foreground">Source type</p>
                <p className="font-medium">{evidence.sourceType}</p>
              </div>
              <div className="rounded-md bg-secondary/60 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-[0.07em] text-muted-foreground">Reference</p>
                <p className="font-medium">{evidence.reference}</p>
              </div>
              <div className="rounded-md bg-secondary/60 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-[0.07em] text-muted-foreground">Timestamp</p>
                <p className="num font-medium">{formatDateTime(evidence.timestamp)}</p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
                Record extract
              </p>
              <p className="rounded-md border border-border bg-white p-3 text-[12px] leading-relaxed text-foreground">
                {evidence.detail}
              </p>
            </div>
            <p className="flex items-start gap-1.5 text-[10.5px] text-muted-foreground">
              <XCircle className="mt-0.5 h-3 w-3 shrink-0" />
              Source document preview is simulated in this prototype.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
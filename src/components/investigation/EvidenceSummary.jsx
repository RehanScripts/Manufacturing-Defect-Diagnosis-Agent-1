import { getEvidenceItem } from "@/lib/mockData";
import { AlertTriangle, CheckCircle2, HelpCircle, Layers } from "lucide-react";

export default function EvidenceSummary({ item }) {
  const ids = item.evidenceIds || [];
  const reviews = item.evidenceReviews || {};
  const relevant = ids.filter((id) => (reviews[id] || getEvidenceItem(id)?.status) === "Relevant");
  const inconclusive = ids.filter(
    (id) => (reviews[id] || getEvidenceItem(id)?.status) === "Inconclusive"
  );
  const conflicting = ids.filter(
    (id) => (reviews[id] || getEvidenceItem(id)?.status) === "Conflicting"
  );
  const missing = Array.from(
    new Set((item.hypotheses || []).flatMap((hypothesis) => hypothesis.missing || []))
  ).slice(0, 3);

  const metrics = [
    { label: "Total evidence retrieved", value: ids.length, icon: Layers, tone: "text-[#12406F] bg-secondary" },
    { label: "Relevant evidence", value: relevant.length, icon: CheckCircle2, tone: "text-emerald-700 bg-emerald-50" },
    { label: "Conflicting / inconclusive", value: conflicting.length + inconclusive.length, icon: AlertTriangle, tone: "text-amber-700 bg-amber-50" },
    { label: "Missing information", value: missing.length, icon: HelpCircle, tone: "text-red-700 bg-red-50" },
  ];

  return (
    <section className="panel p-4">
      <h3 className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-[#0B2138]">
        Evidence summary
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border p-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`grid h-5 w-5 place-items-center rounded ${metric.tone}`}>
                <metric.icon className="h-3 w-3" />
              </span>
              <span className="num font-heading text-[16px] font-semibold leading-none text-foreground">
                {metric.value}
              </span>
            </div>
            <p className="mt-1.5 text-[10.5px] leading-tight text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>

      {missing.length > 0 && (
        <div className="mt-3 rounded-lg border border-red-100 bg-red-50/60 p-2.5">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-red-700">
            Still needed to distinguish hypotheses
          </p>
          <ul className="mt-1 space-y-0.5">
            {missing.map((entry) => (
              <li key={entry} className="text-[11.5px] leading-snug text-red-900/80">
                · {entry}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
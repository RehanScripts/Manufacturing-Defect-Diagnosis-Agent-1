import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, User } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDateTime } from "@/lib/format";

function Meta({ label, value, icon: Icon }) {
  return (
    <div>
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[12px] font-medium text-foreground">
        {Icon && <Icon className="h-3 w-3 text-muted-foreground" />}
        {value}
      </p>
    </div>
  );
}

export default function CaseHeader({ item }) {
  return (
    <div className="panel p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link
              to="/cases"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-[#2563EB]"
            >
              <ArrowLeft className="h-3 w-3" /> Cases
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="num text-[11px] font-semibold text-[#2563EB]">{item.id}</span>
          </div>
          <h1 className="mt-1.5 font-heading text-[21px] font-semibold leading-tight tracking-[-0.02em] text-[#0B2138]">
            {item.component}
            <span className="ml-2 text-[13px] font-normal text-muted-foreground">
              {item.componentId}
            </span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <StatusBadge value={item.status} />
            <StatusBadge value={item.severity} />
            <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {item.defectCategory}
            </span>
            <span className="num rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              Batch {item.batchId}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9.5px] uppercase tracking-[0.07em] text-muted-foreground">Last updated</p>
          <p className="num text-[11.5px] font-medium text-foreground">
            {formatDateTime(item.updatedAt)}
          </p>
          <p className="mt-1 text-[10.5px] text-muted-foreground">Opened {formatDateTime(item.createdAt)}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 sm:grid-cols-3 lg:grid-cols-5">
        <Meta label="Production line" value={item.line} icon={MapPin} />
        <Meta label="Machine" value={item.machineId} />
        <Meta label="Inspector" value={item.inspector} icon={User} />
        <Meta label="Assigned engineer" value={item.engineer} icon={User} />
        <Meta label="Inspected" value={formatDateTime(item.inspectedAt)} icon={Clock} />
      </div>

      {item.description && (
        <p className="mt-3 rounded-lg bg-secondary/50 p-3 text-[12px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  );
}
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  ClipboardCheck,
  Database,
  FilePlus2,
  FolderSearch,
  LayoutDashboard,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, FACILITY } from "@/lib/mockData";

const ICONS = {
  LayoutDashboard,
  FolderSearch,
  FilePlus2,
  Database,
  ClipboardCheck,
  Activity,
  BookOpen,
  ScrollText,
};

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2563EB] text-white shadow-sm">
          <ShieldCheck className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-[13.5px] font-semibold leading-tight tracking-[-0.01em] text-white">
            Manufacturing Quality AI
          </p>
          <p className="mt-0.5 truncate text-[10.5px] leading-tight text-[#8FA6C0]">
            Intelligent Defect Investigation
          </p>
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#7E96B2]">
          Facility
        </p>
        <p className="mt-0.5 text-[12px] font-medium text-white/90">{FACILITY}</p>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              activeProps={{
                className: "bg-white/[0.09] text-white",
              }}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[12.5px] font-medium text-[#A9BEDA] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.9} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <p className="text-[10.5px] font-medium uppercase tracking-[0.09em] text-[#8FA6C0]">
            Simulated environment
          </p>
        </div>
        <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#7E96B2]">
          Agent output, evidence and metrology data in this prototype are mock data for
          demonstration only.
        </p>
      </div>
    </div>
  );
}
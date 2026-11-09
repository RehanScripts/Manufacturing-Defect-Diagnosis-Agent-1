import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FACILITY, CURRENT_USER, NOTIFICATIONS } from "@/lib/mockData";
import { formatDateTime, initials } from "@/lib/format";
import ScenarioModal from "@/components/common/ScenarioModal";

export default function Topbar({ onOpenNav }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [read, setRead] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate({ to: "/cases", search: trimmed ? { q: trimmed } : {} });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden min-w-0 items-center gap-2 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <div className="min-w-0">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Manufacturing facility
            </p>
            <p className="truncate font-heading text-[12.5px] font-semibold text-[#0B2138]">
              {FACILITY}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="ml-auto hidden w-full max-w-xs lg:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cases, batches, evidence…"
              className="h-9 pl-8 text-[12.5px]"
            />
          </div>
        </form>

        <span className="ml-auto rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-700 lg:ml-0">
          Demo mode
        </span>

        <Button
          variant="outline"
          size="sm"
          className="hidden h-9 border-[#D7E3F4] text-[12px] text-[#12406F] hover:bg-[#F1F6FD] sm:inline-flex"
          onClick={() => setScenarioOpen(true)}
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Load Demo Scenario
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              {!read && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#2563EB] ring-2 ring-white" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
              <p className="font-heading text-[12.5px] font-semibold">Notifications</p>
              <button
                type="button"
                className="text-[11px] font-medium text-[#2563EB] hover:underline"
                onClick={() => {
                  setRead(true);
                  setNotifications([]);
                }}
              >
                Mark all read
              </button>
            </div>
            {notifications.length === 0 ? (
              <p className="px-3 py-6 text-center text-[12px] text-muted-foreground">
                You are all caught up.
              </p>
            ) : (
              <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                {notifications.map((item) => (
                  <li key={item.id} className="px-3 py-2.5">
                    <p className="text-[12.5px] font-medium text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                      {item.detail}
                    </p>
                    <p className="mt-1 text-[10.5px] text-muted-foreground/80">
                      {formatDateTime(item.at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2 border-l border-border pl-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0B2138] text-[11px] font-semibold text-white">
            {initials(CURRENT_USER.name)}
          </span>
          <div className="hidden sm:block">
            <p className="text-[12px] font-semibold leading-tight text-foreground">
              {CURRENT_USER.name}
            </p>
            <p className="text-[10.5px] leading-tight text-muted-foreground">{CURRENT_USER.role}</p>
          </div>
        </div>
      </div>

      <ScenarioModal open={scenarioOpen} onOpenChange={setScenarioOpen} />
    </header>
  );
}
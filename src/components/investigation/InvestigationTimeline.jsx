import { Bot, User } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function InvestigationTimeline({ events, className, compact = false }) {
  return (
    <ol className={cn("relative space-y-3", className)}>
      {events.map((event, index) => (
        <li key={`${event.at}-${index}`} className="relative pl-5">
          <span
            className={cn(
              "absolute left-0 top-1 grid h-3.5 w-3.5 place-items-center rounded-full ring-2 ring-white",
              event.kind === "human" ? "bg-[#0B2138]" : "bg-[#2563EB]"
            )}
          >
            {event.kind === "human" ? (
              <User className="h-[7px] w-[7px] text-white" />
            ) : (
              <Bot className="h-[7px] w-[7px] text-white" />
            )}
          </span>
          {index < events.length - 1 && (
            <span className="absolute left-[6px] top-5 h-[calc(100%-8px)] w-px bg-border" />
          )}
          <p className="text-[11.5px] font-medium leading-snug text-foreground">{event.title}</p>
          {!compact && (
            <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{event.detail}</p>
          )}
          <p className="mt-0.5 text-[9.5px] text-muted-foreground/80">
            {event.actor} · {formatDateTime(event.at)}
          </p>
        </li>
      ))}
    </ol>
  );
}
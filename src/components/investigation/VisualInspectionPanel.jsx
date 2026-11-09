import { Image } from "@/components/ui/image";
import { ScanLine } from "lucide-react";

export default function VisualInspectionPanel({ item, className }) {
  const vision = item.vision;
  const box = vision?.bbox;

  return (
    <div className={`panel overflow-hidden ${className || ""}`}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <ScanLine className="h-3.5 w-3.5 text-[#2563EB]" />
          <p className="font-heading text-[12px] font-semibold text-[#0B2138]">
            Inspection image
          </p>
        </div>
        <span className="num text-[10.5px] text-muted-foreground">{item.componentId}</span>
      </div>

      <div className="relative bg-[#0B2138]">
        <Image
          src={item.imageUrl}
          alt={`Inspection image for ${item.id}`}
          className="h-[300px] w-full object-cover sm:h-[340px]"
        />
        {box && (
          <div
            className="pointer-events-none absolute border-2 border-amber-400 shadow-[0_0_0_9999px_rgba(8,26,46,0.34)]"
            style={{
              left: `${box.x * 100}%`,
              top: `${box.y * 100}%`,
              width: `${box.w * 100}%`,
              height: `${box.h * 100}%`,
            }}
          >
            <span className="absolute -top-[22px] left-0 whitespace-nowrap rounded-sm bg-amber-400 px-1.5 py-[2px] text-[9.5px] font-semibold uppercase tracking-[0.04em] text-[#3A2600]">
              {vision.category} · {vision.confidence}%
            </span>
            <span className="absolute -left-[2px] -top-[2px] h-2 w-2 border-l-2 border-t-2 border-white/80" />
          </div>
        )}
        <div className="absolute bottom-2 left-2 rounded bg-[#081A2E]/80 px-2 py-1 text-[9.5px] font-medium uppercase tracking-[0.08em] text-white/90">
          Simulated annotation · not a measurement
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[10.5px] text-muted-foreground">
        <span className="truncate">{item.imageName || "inspection-image.png"}</span>
        <span>{item.machineId} · {item.line}</span>
      </div>
    </div>
  );
}
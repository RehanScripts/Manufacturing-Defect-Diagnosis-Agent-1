import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { defectTrend } from "@/lib/mockData";

const SERIES = [
  { key: "scratches", label: "Surface Scratches", color: "#2563EB" },
  { key: "dimensional", label: "Dimensional", color: "#0EA5E9" },
  { key: "burr", label: "Burr Formation", color: "#F59E0B" },
  { key: "cracks", label: "Surface Cracks", color: "#DC2626" },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-white px-2.5 py-2 shadow-lg">
      <p className="mb-1 text-[11px] font-semibold text-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted-foreground">{entry.name}</span>
          <span className="num ml-auto font-semibold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrendAreaChart() {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {SERIES.map((serie) => (
          <span key={serie.key} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: serie.color }} />
            {serie.label}
          </span>
        ))}
      </div>
      <div className="h-[236px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={defectTrend} margin={{ top: 4, right: 6, left: -22, bottom: 0 }}>
            <defs>
              {SERIES.map((serie) => (
                <linearGradient key={serie.key} id={`grad-${serie.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={serie.color} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={serie.color} stopOpacity={0.01} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF0F4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10.5, fill: "#8A94A6" }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis
              tick={{ fontSize: 10.5, fill: "#8A94A6" }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} />
            {SERIES.map((serie) => (
              <Area
                key={serie.key}
                type="monotone"
                dataKey={serie.key}
                name={serie.label}
                stroke={serie.color}
                strokeWidth={1.8}
                fill={`url(#grad-${serie.key})`}
                activeDot={{ r: 3, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
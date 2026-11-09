import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { defectsByBatch } from "@/lib/mockData";

const rows = defectsByBatch.map((row) => ({
  ...row,
  rate: Number(((row.defects / row.inspections) * 100).toFixed(1)),
}));

function BatchTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-white px-2.5 py-2 shadow-lg">
      <p className="mb-1 text-[11px] font-semibold text-foreground">Batch {label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted-foreground">{entry.name}</span>
          <span className="num ml-auto font-semibold text-foreground">
            {entry.value}
            {entry.dataKey === "rate" ? "%" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BatchBarChart() {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={rows} margin={{ top: 6, right: 4, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF0F4" vertical={false} />
          <XAxis
            dataKey="batch"
            tick={{ fontSize: 10.5, fill: "#8A94A6" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10.5, fill: "#8A94A6" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<BatchTooltip />} cursor={{ fill: "#F4F7FB" }} />
          <Bar dataKey="defects" name="Defects" fill="#2563EB" radius={[3, 3, 0, 0]} barSize={18} />
          <Line
            type="monotone"
            dataKey="rate"
            name="Defect rate"
            stroke="#F59E0B"
            strokeWidth={1.8}
            dot={{ r: 2.4, fill: "#F59E0B", strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
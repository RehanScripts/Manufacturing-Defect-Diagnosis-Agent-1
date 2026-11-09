import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monitoringTrend } from "@/lib/mockData";

function RateTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-white px-2.5 py-1.5 shadow-lg">
      <p className="text-[11px] font-semibold text-foreground">Batch {label}</p>
      <p className="num text-[11px] text-muted-foreground">Defect rate {payload[0].value}%</p>
    </div>
  );
}

export default function MonitoringTrendChart() {
  return (
    <div className="h-[210px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monitoringTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF0F4" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10.5, fill: "#8A94A6" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10.5, fill: "#8A94A6" }}
            axisLine={false}
            tickLine={false}
            width={40}
            unit="%"
          />
          <Tooltip content={<RateTooltip />} />
          <ReferenceLine y={4} stroke="#F59E0B" strokeDasharray="4 3" strokeWidth={1.2} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#2563EB"
            strokeWidth={2}
            dot={{ r: 2.6, fill: "#2563EB", strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-1 text-[10px] text-muted-foreground">
        Dashed line marks the 4.0% target defect rate.
      </p>
    </div>
  );
}
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-border bg-white px-2.5 py-1.5 shadow-lg">
      <p className="text-[11px] font-semibold text-foreground">{entry.name}</p>
      <p className="num text-[11px] text-muted-foreground">{entry.value} cases</p>
    </div>
  );
}

export default function CategoryDonut({ data, centerLabel = "Total", unit = "" }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative mx-auto h-[170px] w-[170px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={54}
              outerRadius={78}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="num font-heading text-[19px] font-semibold leading-none text-foreground">
            {total}
            {unit}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {centerLabel}
          </span>
        </div>
      </div>

      <ul className="flex-1 space-y-2">
        {data.map((item) => (
          <li key={item.name} className="flex items-center gap-2 text-[11.5px]">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: item.color }} />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{item.name}</span>
            <span className="num font-semibold text-foreground">{item.value}</span>
            <span className="num w-9 text-right text-[10.5px] text-muted-foreground">
              {total ? Math.round((item.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default function HorizontalBars({ data, unitLabel = "" }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <ul className="space-y-3">
      {data.map((item) => (
        <li key={item.name}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="truncate text-[11.5px] text-muted-foreground">{item.name}</span>
            <span className="num text-[11.5px] font-semibold text-foreground">
              {item.value}
              {unitLabel}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${Math.max(4, (item.value / max) * 100)}%`, background: item.color }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
import { useMemo } from 'react';

interface DayRow {
  day: string;
  clicks: number;
}

/** Turn the API's sparse, newest-first rows into `days` continuous buckets. */
export function fillDays(rows: DayRow[], days: number) {
  const byKey = new Map(rows.map((r) => [new Date(r.day).toISOString().slice(0, 10), r.clicks]));
  const out: { key: string; label: string; clicks: number }[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    const key = d.toISOString().slice(0, 10);
    out.push({
      key,
      label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      clicks: byKey.get(key) ?? 0,
    });
  }
  return out;
}

const ClicksChart: React.FC<{ rows: DayRow[]; days?: number }> = ({ rows, days = 14 }) => {
  const data = useMemo(() => fillDays(rows, days), [rows, days]);
  const max = Math.max(1, ...data.map((d) => d.clicks));
  const total = data.reduce((s, d) => s + d.clicks, 0);

  return (
    <div>
      <div
        className="flex h-40 items-end gap-1 sm:gap-1.5"
        role="img"
        aria-label={`${total} clicks over the last ${days} days`}
      >
        {data.map((d) => (
          <div key={d.key} className="group relative flex h-full min-w-0 flex-1 items-end">
            <div
              className={`w-full rounded-t ${d.clicks ? 'bg-primary' : 'bg-neutral-200'} transition-opacity group-hover:opacity-80`}
              style={{ height: `${d.clicks ? Math.max(6, (d.clicks / max) * 100) : 3}%` }}
            />
            <span className="pointer-events-none absolute -top-7 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white group-hover:block">
              {d.label}: {d.clicks}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-neutral-400">
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
};

export default ClicksChart;

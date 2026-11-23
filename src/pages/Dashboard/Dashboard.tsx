import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { useAuth } from '../../contexts/UserContext/UserContext';
import { Button, CircleLoader, ClicksChart, Input } from '../../components';
import { api, ApiError } from '../../utils/api/apiClient';
import { notify, warn } from '../../App';
import type { LinkData } from './MyLinks/types';

interface Overview {
  totalClicks: number;
  humanClicks: number;
  botClicks: number;
  totalLinks: number;
  byDay: { day: string; clicks: number }[];
}

const Card: React.FC<{ title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  title,
  action,
  children,
  className = '',
}) => (
  <section className={`min-w-0 rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 ${className}`}>
    {title && (
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-bold">{title}</h2>
        {action}
      </div>
    )}
    {children}
  </section>
);

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<Overview | null>(null);
  const [links, setLinks] = useState<LinkData[] | null>(null);
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<string | null>(null);

  useEffect(() => {
    api.get<Overview>('/analytics/overview').then(setStats).catch(() => setStats(null));
    api.get<{ links: LinkData[] }>('/links').then((d) => setLinks(d.links)).catch(() => setLinks([]));
  }, []);

  const handleQuickTrim = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const data = await api.post<{ link: LinkData }>('/links', { longUrl, alias: alias.trim() || undefined });
      setLinks((prev) => [{ ...data.link, clickCount: 0 }, ...(prev ?? [])]);
      setStats((s) => (s ? { ...s, totalLinks: s.totalLinks + 1 } : s));
      setCreated(data.link.shortUrl);
      setLongUrl('');
      setAlias('');
      notify('Success, your link has been trimmed!');
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to trim link');
    } finally {
      setCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center rounded-xl bg-white">
        <CircleLoader color="#005AE2" />
      </div>
    );
  }

  const firstName = user?.name?.split(' ')[0];
  const recent = (links ?? []).slice(0, 5);
  const top = [...(links ?? [])].filter((l) => (l.clickCount ?? 0) > 0).sort((a, b) => (b.clickCount ?? 0) - (a.clickCount ?? 0)).slice(0, 5);
  const tiles = [
    { label: 'Total links', value: stats?.totalLinks ?? links?.length },
    { label: 'Total clicks', value: stats?.totalClicks },
    { label: 'Human clicks', value: stats?.humanClicks },
    { label: 'Bots filtered', value: stats?.botClicks },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome back{firstName ? `, ${firstName}` : ''} 👋</h1>
        <p className="mt-1 text-neutral-500">Here&apos;s how your links are doing.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {tiles.map(({ label, value }) => (
          <Card key={label}>
            <p className="text-sm font-medium text-neutral-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl">{value ?? '–'}</p>
          </Card>
        ))}
      </div>

      <Card title="Quick trim">
        <form onSubmit={handleQuickTrim} className="flex flex-col gap-3 md:flex-row">
          <div className="min-w-0 flex-[3]">
            <Input
              py="12px"
              type="url"
              placeholder="Paste a long URL…"
              aria-label="Long URL"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>
          <div className="min-w-0 flex-[1.5]">
            <Input
              py="12px"
              placeholder="Custom alias (optional)"
              aria-label="Custom alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <Button type="submit" buttonWidth="fit" disabled={creating} style={{ whiteSpace: 'nowrap' }}>
            {creating ? 'Trimming…' : 'Trim URL'}
          </Button>
        </form>
        {created && (
          <div className="mt-3 flex flex-col gap-2 rounded-lg bg-green-50 p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <a href={created} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-green-800">
              {created}
            </a>
            <button
              type="button"
              onClick={() => {
                copy(created);
                notify('Copied URL to clipboard!');
              }}
              className="self-start rounded-lg border border-green-300 bg-white px-3 py-1 font-medium text-green-800 sm:self-auto"
            >
              Copy
            </button>
          </div>
        )}
        <p className="mt-3 text-xs text-neutral-400">
          Need a password or expiry date? Use the{' '}
          <Link to="/dashboard/new" className="text-primary">
            full form
          </Link>
          .
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <Card
          title="Clicks · last 14 days"
          className="md:col-span-3"
          action={
            <Link to="/dashboard/analytics" className="text-sm font-medium text-primary">
              Details →
            </Link>
          }
        >
          {stats && stats.totalClicks > 0 ? (
            <ClicksChart rows={stats.byDay} days={14} />
          ) : (
            <p className="py-10 text-center text-sm text-neutral-400">No clicks yet — share a link to see activity here.</p>
          )}
        </Card>

        <Card title="Top links" className="md:col-span-2">
          {top.length === 0 ? (
            <p className="py-6 text-center text-sm text-neutral-400">Your most-clicked links will show up here.</p>
          ) : (
            <ol className="space-y-3">
              {top.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate font-medium text-primary" title={l.longUrl}>
                    {l.shortUrl.replace(/^https?:\/\//, '')}
                  </span>
                  <span className="shrink-0 font-bold">{l.clickCount}</span>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>

      <Card
        title="Recent links"
        action={
          <Link to="/dashboard/my-links" className="text-sm font-medium text-primary">
            View all →
          </Link>
        }
      >
        {links === null ? (
          <div className="flex h-24 items-center justify-center">
            <CircleLoader color="#005AE2" />
          </div>
        ) : recent.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-400">No links yet — trim your first one above.</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {recent.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <a href={l.shortUrl} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-semibold text-primary">
                    {l.shortUrl}
                  </a>
                  <p className="truncate text-xs text-neutral-500">{l.longUrl}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-neutral-400 sm:inline">{l.clickCount ?? 0} clicks</span>
                  <button
                    type="button"
                    onClick={() => {
                      copy(l.shortUrl);
                      notify('Copied URL to clipboard!');
                    }}
                    className="rounded-lg border border-neutral-300 px-3 py-1 text-sm font-medium hover:bg-neutral-50"
                  >
                    Copy
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;

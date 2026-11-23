import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircleLoader, Modal } from '../../../components';
import MyLink from './MyLink';
import EditLinkModal from './EditLinkModal';
import type { LinkData } from './types';
import { notify, warn } from '../../../App';
import { api, ApiError } from '../../../utils/api/apiClient';

type Sort = 'newest' | 'oldest' | 'clicks';

const MyLinks: React.FC = () => {
  const [allLinks, setAllLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('newest');
  const [editing, setEditing] = useState<LinkData | null>(null);
  const [deleting, setDeleting] = useState<LinkData | null>(null);

  useEffect(() => {
    api
      .get<{ links: LinkData[] }>('/links')
      .then((data) => setAllLinks(data.links))
      .catch((error) => warn(error instanceof ApiError ? error.message : 'Unable to get your links, please try again!'))
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await api.delete(`/links/${deleting.id}`);
      notify('Link deleted');
      setAllLinks((prev) => prev.filter((l) => l.id !== deleting.id));
      setDeleting(null);
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to delete link');
    }
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? allLinks.filter((l) => l.shortUrl.toLowerCase().includes(q) || l.longUrl.toLowerCase().includes(q))
      : allLinks;
    const time = (l: LinkData) => (l.createdAt ? new Date(l.createdAt).getTime() : 0);
    return [...filtered].sort((a, b) =>
      sort === 'clicks' ? (b.clickCount ?? 0) - (a.clickCount ?? 0) : sort === 'oldest' ? time(a) - time(b) : time(b) - time(a)
    );
  }, [allLinks, query, sort]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center rounded-xl bg-white">
        <CircleLoader color="#005AE2" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">
          My links <span className="text-base font-medium text-neutral-400">({allLinks.length})</span>
        </h1>
        <Link to="/dashboard/new" className="sm:w-auto">
          <Button buttonWidth="fit">+ Trim new URL</Button>
        </Link>
      </div>

      {allLinks.length === 0 ? (
        <div className="rounded-xl bg-white px-4 py-10 text-center">
          <h2 className="mb-3 text-5xl font-extrabold text-primary sm:text-7xl">Oops!</h2>
          <p className="mb-6 text-lg font-medium">You haven&apos;t trimmed any link yet!</p>
          <Link to="/dashboard/new">
            <Button buttonWidth="fit">Trim your first URL</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by short or destination URL…"
              aria-label="Search links"
              className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort links"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary sm:w-44"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="clicks">Most clicks</option>
            </select>
          </div>
          {visible.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-center text-neutral-500">No links match “{query}”.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {visible.map((link) => (
                <MyLink key={link.id} link={link} onEdit={() => setEditing(link)} onDelete={() => setDeleting(link)} />
              ))}
            </div>
          )}
        </>
      )}

      <EditLinkModal
        link={editing}
        onClose={() => setEditing(null)}
        onSaved={(updated) => setAllLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))}
      />
      <Modal open={Boolean(deleting)} title="Delete this link?" onClose={() => setDeleting(null)}>
        <p className="mb-6 break-all text-sm text-neutral-600">
          <strong>{deleting?.shortUrl}</strong> will stop working immediately and its click history will be removed.
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setDeleting(null)}
            className="rounded-full px-6 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete link
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyLinks;

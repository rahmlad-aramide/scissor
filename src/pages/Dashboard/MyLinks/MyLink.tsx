import copy from 'clipboard-copy';
import { notify } from '../../../App';
import { linkStatus, type LinkData } from './types';

interface MyLinkProps {
  link: LinkData;
  onEdit: () => void;
  onDelete: () => void;
}

const statusStyle = {
  active: 'bg-green-100 text-green-700',
  scheduled: 'bg-yellow-100 text-yellow-700',
  ended: 'bg-neutral-200 text-neutral-600',
  expired: 'bg-red-100 text-red-700',
} as const;

const actionBtn =
  'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition active:scale-95';

const MyLink: React.FC<MyLinkProps> = ({ link, onEdit, onDelete }) => {
  const status = linkStatus(link);
  return (
    <div className="flex w-full flex-col justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4 md:flex-row md:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <a
            className="break-all font-semibold text-primary"
            href={link.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.shortUrl}
          </a>
          <span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusStyle[status]}`}>{status}</span>
          {link.hasPassword && (
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">🔒 Password</span>
          )}
        </div>
        <a
          href={link.longUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block break-all text-sm text-neutral-500 hover:underline"
          title={link.longUrl}
        >
          ↳ {link.longUrl}
        </a>
        <p className="mt-1 text-xs text-neutral-400">
          {link.clickCount ?? 0} click{link.clickCount === 1 ? '' : 's'}
          {link.createdAt && <> · Created {new Date(link.createdAt).toLocaleDateString()}</>}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            copy(link.shortUrl);
            notify('Copied URL to clipboard!');
          }}
          className={`${actionBtn} border-neutral-300 bg-neutral-50 hover:bg-neutral-100`}
        >
          Copy
        </button>
        <button type="button" onClick={onEdit} className={`${actionBtn} border-neutral-300 bg-neutral-50 hover:bg-neutral-100`}>
          Edit
        </button>
        <button type="button" onClick={onDelete} className={`${actionBtn} border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyLink;

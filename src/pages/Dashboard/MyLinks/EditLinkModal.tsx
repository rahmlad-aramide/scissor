import { useEffect, useState } from 'react';
import { Button, Input, Modal } from '../../../components';
import { api, ApiError } from '../../../utils/api/apiClient';
import { notify, warn } from '../../../App';
import type { LinkData } from './types';

/** ISO string -> value usable by <input type="datetime-local"> (local time). */
const toLocalInput = (iso?: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const toIso = (local: string) => (local ? new Date(local).toISOString() : null);

interface Props {
  link: LinkData | null;
  onClose: () => void;
  onSaved: (link: LinkData) => void;
}

const EditLinkModal: React.FC<Props> = ({ link, onClose, onSaved }) => {
  const [longUrl, setLongUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [activeFrom, setActiveFrom] = useState('');
  const [activeUntil, setActiveUntil] = useState('');
  const [password, setPassword] = useState('');
  const [removePassword, setRemovePassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!link) return;
    setLongUrl(link.longUrl);
    setExpiresAt(toLocalInput(link.expiresAt));
    setActiveFrom(toLocalInput(link.activeFrom));
    setActiveUntil(toLocalInput(link.activeUntil));
    setPassword('');
    setRemovePassword(false);
  }, [link]);

  if (!link) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        longUrl,
        expiresAt: toIso(expiresAt),
        activeFrom: toIso(activeFrom),
        activeUntil: toIso(activeUntil),
      };
      if (removePassword) body.password = null;
      else if (password) body.password = password;
      const data = await api.patch<{ link: LinkData }>(`/links/${link.id}`, body);
      // PATCH response has no click count; keep the one we already know.
      onSaved({ ...data.link, clickCount: link.clickCount });
      notify('Link updated');
      onClose();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to update link');
    } finally {
      setSaving(false);
    }
  };

  const label = 'text-xs text-gray-500 mb-1 block';
  return (
    <Modal open title="Edit link" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="break-all text-sm text-neutral-500">
          Short link: <span className="font-semibold text-primary">{link.shortUrl}</span>
        </p>
        <div>
          <label className={label}>Destination URL</label>
          <Input py="10px" type="url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} required />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label className={label}>Active from</label>
            <Input py="10px" type="datetime-local" value={activeFrom} onChange={(e) => setActiveFrom(e.target.value)} />
          </div>
          <div className="min-w-0">
            <label className={label}>Active until</label>
            <Input py="10px" type="datetime-local" value={activeUntil} onChange={(e) => setActiveUntil(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Expires at</label>
          <Input py="10px" type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
        </div>
        <div>
          <label className={label}>
            {link.hasPassword ? 'New password (leave blank to keep current)' : 'Password protection'}
          </label>
          <Input
            py="10px"
            type="password"
            placeholder="Optional password"
            value={password}
            disabled={removePassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          {link.hasPassword && (
            <label className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
              <input type="checkbox" checked={removePassword} onChange={(e) => setRemovePassword(e.target.checked)} />
              Remove password protection
            </label>
          )}
        </div>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-6 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <Button type="submit" buttonWidth="fit" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;

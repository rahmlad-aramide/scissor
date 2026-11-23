export interface LinkData {
  id: string;
  code: string;
  shortUrl: string;
  longUrl: string;
  hasPassword: boolean;
  clickCount?: number;
  createdAt?: string;
  activeFrom?: string | null;
  activeUntil?: string | null;
  expiresAt?: string | null;
}

export type LinkStatus = 'active' | 'scheduled' | 'ended' | 'expired';

export function linkStatus(l: LinkData, now = Date.now()): LinkStatus {
  if (l.expiresAt && new Date(l.expiresAt).getTime() < now) return 'expired';
  if (l.activeUntil && new Date(l.activeUntil).getTime() < now) return 'ended';
  if (l.activeFrom && new Date(l.activeFrom).getTime() > now) return 'scheduled';
  return 'active';
}

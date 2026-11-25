import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { api, ApiError } from '../../utils/api/apiClient';
import { inform, warn } from '../../App';
import Logo from '../Logo/Logo';

type IconProps = { className?: string };

const icon = (path: ReactElement) =>
  function Icon({ className = 'h-5 w-5' }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {path}
      </svg>
    );
  };

const HomeIcon = icon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </>
);
const LinkIcon = icon(
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>
);
const QrIcon = icon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h.01" />
  </>
);
const ChartIcon = icon(<path d="M3 3v18h18M7 15l4-4 3 3 5-6" />);
const FolderIcon = icon(
  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
);
const UsersIcon = icon(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
  </>
);
const PlugIcon = icon(
  <path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5" />
);
const CodeIcon = icon(<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />);
const GearIcon = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </>
);
const PlusIcon = icon(<path d="M12 5v14M5 12h14" />);
const MenuIcon = icon(<path d="M4 6h16M4 12h16M4 18h16" />);
const CloseIcon = icon(<path d="M6 6l12 12M18 6 6 18" />);
const LogoutIcon = icon(
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
);

interface NavItem {
  to: string;
  label: string;
  Icon: (props: IconProps) => ReactElement;
  end?: boolean;
}

const mainNav: NavItem[] = [
  { to: '/dashboard', label: 'Overview', Icon: HomeIcon, end: true },
  { to: '/dashboard/my-links', label: 'My Links', Icon: LinkIcon },
  { to: '/dashboard/qr-codes', label: 'QR Codes', Icon: QrIcon },
  { to: '/dashboard/analytics', label: 'Analytics', Icon: ChartIcon },
];
const workspaceNav: NavItem[] = [
  { to: '/dashboard/workspaces', label: 'Workspaces', Icon: FolderIcon },
  { to: '/dashboard/teams', label: 'Teams', Icon: UsersIcon },
  { to: '/dashboard/integrations', label: 'Integrations', Icon: PlugIcon },
  { to: '/dashboard/developer', label: 'Developer', Icon: CodeIcon },
];
const accountNav: NavItem[] = [
  { to: '/dashboard/settings', label: 'Settings', Icon: GearIcon },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? 'bg-primary/10 font-semibold text-primary'
      : 'font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
  }`;

const NavSection: React.FC<{ title?: string; items: NavItem[] }> = ({
  title,
  items,
}) => (
  <div className="mb-5">
    {title && (
      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {title}
      </p>
    )}
    <ul className="space-y-0.5">
      {items.map(({ to, label, Icon, end }) => (
        <li key={to}>
          <NavLink to={to} end={end} className={linkClass}>
            <Icon className="h-5 w-5 shrink-0" />
            <span className="truncate pt-0.5">{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const SidebarContent: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <Link
          to="/dashboard/new"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="pt-0.5">Trim new link</span>
        </Link>
      </div>
      <nav
        aria-label="Dashboard"
        className="flex-1 overflow-y-auto px-3 pb-4 pt-2"
      >
        <NavSection items={mainNav} />
        <NavSection title="Manage" items={workspaceNav} />
        <NavSection title="Account" items={accountNav} />
      </nav>
      <div className="border-t border-neutral-200 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold uppercase text-white">
            {user?.name?.charAt(0) ?? 'S'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-neutral-900">
              {user?.name ?? 'Scissor user'}
            </p>
            <p className="truncate text-xs text-neutral-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            <LogoutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Shell for every /dashboard route: top bar + sidebar (desktop) / drawer
 * (mobile). Pages render into <Outlet />, so they no longer wrap themselves.
 */
const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  // Esc to close, lock background scroll and focus the drawer while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleLogout = async () => {
    inform('Logging you out...');
    try {
      await api.post('/auth/logout');
    } catch (error) {
      warn(
        error instanceof ApiError
          ? error.message
          : 'Failed to log out cleanly, clearing session locally.'
      );
    } finally {
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <ToastContainer />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="-ml-2 rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link to="/dashboard" aria-label="Scissor dashboard">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/"
            className="hidden text-neutral-600 hover:text-primary sm:inline"
          >
            Back to website
          </Link>
          <Link
            to="/dashboard/new"
            className="rounded-full bg-primary px-4 py-1.5 font-semibold text-white md:hidden"
          >
            Trim
          </Link>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-64 border-r border-neutral-200 bg-white md:block">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard menu"
          className={`absolute inset-y-0 left-0 w-[80%] max-w-xs bg-white shadow-xl transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="h-[calc(100%-3.5rem)]">
            <SidebarContent onLogout={handleLogout} />
          </div>
        </aside>
      </div>

      <main className="min-w-0 pt-14 md:pl-64">
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

import { Link, Outlet } from 'react-router-dom';
import Logo from '../Logo/Logo';

/**
 * Shared frame for standalone pages (login, sign-up, password reset, link
 * gate…): a slim header with the logo linking home, and breathing room so
 * content never sits against the top edge of the screen.
 */
const AuthShell: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-white">
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4 sm:px-6">
      <Link to="/" aria-label="Scissor home">
        <Logo />
      </Link>
      <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-primary">
        Back to home
      </Link>
    </header>
    <div className="flex-1 pt-8 sm:pt-12">
      <Outlet />
    </div>
  </div>
);

export default AuthShell;

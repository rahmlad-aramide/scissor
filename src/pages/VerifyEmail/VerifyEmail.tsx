import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Footer, Input } from '../../components';
import { notify, warn } from '../../App';
import { api, ApiError } from '../../utils/api/apiClient';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  // Verification tokens are single-use, so guard against firing the request
  // twice for the same token (React StrictMode double-invokes effects in dev,
  // and a careless re-render shouldn't re-spend it either).
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const requestedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token.');
      return;
    }

    if (requestedTokenRef.current === token) return;
    requestedTokenRef.current = token;

    api
      .get<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((data) => {
        setStatus('success');
        setMessage(data.message);
      })
      .catch((error) => {
        setStatus('error');
        setMessage(error instanceof ApiError ? error.message : 'Something went wrong.');
      });
  }, [token]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || !email) return;
    setResending(true);
    try {
      await api.post('/auth/resend-verification', { email });
      notify('If that account is unverified, a new email is on its way.');
      setCooldown(60);
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Could not resend the email, please try again!');
    } finally {
      setResending(false);
    }
  };

  return (
    <section className="h-full bg-white flex flex-col">
      <ToastContainer />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md text-center px-6">
          <h1 className="text-3xl font-bold mb-4 text-primary">Email verification</h1>
          <p className="text-neutral-600 mb-8">
            {status === 'loading' ? 'Verifying your email…' : message}
          </p>
          {status === 'error' && (
            <form onSubmit={handleResend} className="mb-6">
              <p className="text-sm text-neutral-500 mb-3">
                Need a new link? Enter your email and we&apos;ll send another.
              </p>
              <div className="mb-3">
                <Input
                  py="12px"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button disabled={resending || cooldown > 0} type="submit" buttonWidth="full">
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend verification email'}
              </Button>
            </form>
          )}
          {status !== 'loading' && (
            <Link to="/login">
              <Button>Go to login</Button>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default VerifyEmail;

import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Footer } from '../../components';
import { api, ApiError } from '../../utils/api/apiClient';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  // Verification tokens are single-use, so guard against firing the request
  // twice for the same token (React StrictMode double-invokes effects in dev,
  // and a careless re-render shouldn't re-spend it either).
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

  return (
    <section className="h-full bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md text-center px-6">
          <h1 className="text-3xl font-bold mb-4 text-primary">Email verification</h1>
          <p className="text-neutral-600 mb-8">
            {status === 'loading' ? 'Verifying your email…' : message}
          </p>
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

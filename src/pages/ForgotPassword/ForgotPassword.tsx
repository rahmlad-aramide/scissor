import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Button, Input, Footer, Loader } from '../../components';
import { notify, warn } from '../../App';
import { api, ApiError } from '../../utils/api/apiClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post<{ message: string }>('/auth/forgot-password', { email });
      notify(data.message);
      setSent(true);
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full bg-white flex flex-col">
      <ToastContainer />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[90%] max-w-[420px]">
          <h1 className="text-2xl font-bold mb-2 text-center">Forgot your password?</h1>
          <p className="text-neutral-500 text-sm text-center mb-6">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          {sent ? (
            <p className="text-center text-neutral-600">
              Check your inbox for a reset link. <Link className="text-primary underline" to="/login">Back to login</Link>
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Input
                  py="12px"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button disabled={loading} type="submit" buttonWidth="full">
                {loading ? <Loader /> : 'Send reset link'}
              </Button>
              <div className="text-center text-sm text-neutral-500 mt-4">
                <Link className="text-primary underline" to="/login">Back to login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ForgotPassword;

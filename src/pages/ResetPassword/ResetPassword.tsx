import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Button, Input, Footer, Loader } from '../../components';
import { notify, warn } from '../../App';
import { api, ApiError } from '../../utils/api/apiClient';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const navigateTo = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      warn('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await api.post<{ message: string }>('/auth/reset-password', { token, password });
      notify(data.message);
      setTimeout(() => navigateTo('/login'), 1500);
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <section className="h-full bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center text-center px-6">
          <p>
            Missing reset token. <Link className="text-primary underline" to="/forgot-password">Request a new link</Link>
          </p>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section className="h-full bg-white flex flex-col">
      <ToastContainer />
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-[90%] max-w-[420px]">
          <h1 className="text-2xl font-bold mb-6 text-center">Choose a new password</h1>
          <div className="mb-6">
            <Input
              py="12px"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <div className="mb-8">
            <Input
              py="12px"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <Button disabled={loading} type="submit" buttonWidth="full">
            {loading ? <Loader /> : 'Reset password'}
          </Button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default ResetPassword;

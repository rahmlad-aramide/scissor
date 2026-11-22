import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Button, Input, Footer, Loader } from '../../components';
import { warn } from '../../App';
import { api, ApiError } from '../../utils/api/apiClient';

const LinkGate: React.FC = () => {
  const { code } = useParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post<{ longUrl: string }>(`/links/${code}/unlock`, { password });
      window.location.href = data.longUrl;
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Incorrect password');
      setLoading(false);
    }
  };

  return (
    <section className="h-full bg-white flex flex-col">
      <ToastContainer />
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-[90%] max-w-[420px] text-center">
          <h1 className="text-2xl font-bold mb-2">This link is password protected</h1>
          <p className="text-neutral-500 text-sm mb-6">Enter the password to continue.</p>
          <div className="mb-6">
            <Input
              py="12px"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={loading} type="submit" buttonWidth="full">
            {loading ? <Loader /> : 'Continue'}
          </Button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default LinkGate;

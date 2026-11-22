import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crossedEye from '../../assets/icons/crossed-eye.svg';
import eye from '../../assets/icons/eye.svg';
import googleLogo from '../../assets/icons/google-logo.svg';

import { ToastContainer } from 'react-toastify';
import { warn, notify } from '../../App';
import { Button, Input, Footer, Loader } from '../../components';
import { useAuth } from '../../contexts/UserContext/UserContext';
import { api, API_URL, ApiError } from '../../utils/api/apiClient';

interface FormFields {
  email: string;
  password: string;
}

const defaultFormFields: FormFields = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');
  const navigateTo = useNavigate();
  const { email, password } = formFields;

  const navigateToDashboard = () => {
    setTimeout(() => {
      navigateTo('/dashboard');
    }, 1000);
  };

  const signInWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await api.post<{ requires2FA?: boolean; challengeToken?: string; user?: unknown }>(
        '/auth/login',
        { email, password }
      );

      if (data.requires2FA && data.challengeToken) {
        setChallengeToken(data.challengeToken);
        setLoading(false);
        return;
      }

      notify("Login success, you're being redirected");
      await refreshUser();
      navigateToDashboard();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Something went wrong, please try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/2fa/verify', { challengeToken, code: totpCode });
      notify("Login success, you're being redirected");
      await refreshUser();
      navigateToDashboard();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Incorrect code, please try again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigateToDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (challengeToken) {
    return (
      <section className="h-full bg-white">
        <ToastContainer />
        <div className="flex h-full items-center justify-center">
          <form onSubmit={handleVerify2FA} className="w-[90%] max-w-[420px]">
            <h1 className="text-2xl font-bold mb-2 text-center">Two-factor authentication</h1>
            <p className="text-neutral-500 text-sm text-center mb-6">
              Enter the 6-digit code from your authenticator app.
            </p>
            <div className="mb-8">
              <Input
                py="12px"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                required
              />
            </div>
            <Button disabled={loading} type="submit" buttonWidth="full">
              {loading ? <Loader /> : 'Verify'}
            </Button>
          </form>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <>
      <section className="h-full bg-white">
        <ToastContainer />
        <div className="flex h-full md:min-h-full w-full flex-col items-center justify-start md:flex-row md:justify-center">
          <div className="order-1 flex h-fit w-full items-center justify-center md:order-2 md:h-full md:w-[45%]">
            <div className="my-auto h-full w-[90%] overflow-y-auto rounded-xl py-10">
              <div className="">
                <div className="mx-auto w-[90%] max-w-[600px]">
                  <div>
                    <h1 className="mb-4 text-sm text-neutral-500 text-center">
                      Log in with:
                    </h1>
                  </div>
                  <div className="my-4 flex justify-center">
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      className="flex items-center w-fit min-w-[6.8125rem] justify-center rounded bg-primary py-1.5 text-white transition duration-200 hover:scale-90 disabled:scale-100 disabled:cursor-not-allowed active:scale-100"
                    >
                      <img src={`${googleLogo}`} alt="google" className="mr-1" />
                      Google
                    </button>
                  </div>
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-[1px] w-full bg-neutral-400"></div>
                    <div className="mx-5 mb-1 mt-0.5 flex justify-center text-neutral-500">
                      Or
                    </div>
                    <div className="h-[1px] w-full bg-neutral-400"></div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                      <div className="mb-4">
                        <Input
                          py="12px"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email address"
                          value={email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4 flex w-full flex-col">
                      <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={handleChange}
                          required
                          style={{
                            border: 'none',
                            outline: 'none',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                          }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="flex cursor-pointer items-center justify-center"
                        >
                          <img
                            className="h-6"
                            src={showPassword ? `${crossedEye}` : `${eye}`}
                            alt="Show Password"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mb-8 text-right">
                      <Link to="/forgot-password" className="text-primary text-xs underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div>
                      <Button
                        disabled={loading}
                        type="submit"
                        buttonWidth={`full`}
                      >
                        {loading ? <Loader /> : 'Log in'}
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="mx-4 max-w-[600px] md:mx-8">
                  <div className="flex justify-center text-neutral-500 text-sm my-4">
                    Don&apos;t have an account?{' '}
                    <Link
                      className="pl-1.5 underline text-primary"
                      to="/sign-up"
                    >
                      {' '}
                      Sign Up
                    </Link>
                  </div>
                  <div className="text-neutral-400 text-center text-xs">
                    By signing in with an account, you agree to Scissor&apos;s{' '}
                    <Link to="/terms-of-service" className="text-neutral-500 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-neutral-500 underline">
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;

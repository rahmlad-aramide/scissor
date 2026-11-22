import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import crossedEye from '../../assets/icons/crossed-eye.svg';
import eye from '../../assets/icons/eye.svg';
import googleLogo from '../../assets/icons/google-logo.svg';

import { ToastContainer } from 'react-toastify';
import { inform, notify, warn } from '../../App';
import { Button, Input, Footer, Loader } from '../../components';
import { api, API_URL, ApiError } from '../../utils/api/apiClient';

interface FormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const navigateTo = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const defaultFormFields: FormFields = {
    name: '',
    email: searchParams.get('email') ?? '',
    password: '',
    confirmPassword: '',
  };

  const redirectToLogin = () => {
    setTimeout(() => {
      navigateTo('/login');
    }, 2500);
  };

  const signInWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      inform('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/signup', { name, email, password });
      notify('Success! Check your email to verify your account.');
      setDone(true);
      redirectToLogin();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Something went wrong, please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="h-full bg-white">
        <ToastContainer />
        <div className="flex h-full md:min-h-full w-full flex-col items-center justify-start md:flex-row md:justify-center">
          <div className="order-1 flex h-fit w-full items-center justify-center md:order-2 md:h-full md:w-[45%]">
            <div className="my-auto h-full w-[90%] rounded-xl py-10">
              <div className="">
                {done ? (
                  <div className="text-center px-6">
                    <h1 className="text-2xl font-bold mb-4">Check your email</h1>
                    <p className="text-neutral-600">
                      We sent a verification link to <strong>{email}</strong>. Redirecting you to login…
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="mx-auto w-[90%] max-w-[600px]"
                  >
                    <div>
                      <h1 className="mb-4 text-sm text-neutral-500 text-center">
                        Sign up with:
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
                    <div className="mb-6 flex flex-col">
                      <div className="">
                        <Input
                          py="12px"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6 flex flex-col">
                      <div className="">
                        <Input
                          py="12px"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="mb-6 flex w-full flex-col">
                        <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                            minLength={8}
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
                      <div className="mb-8 flex w-full flex-col">
                        <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Retype your password"
                            value={confirmPassword}
                            onChange={handleChange}
                            minLength={8}
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
                    </div>
                    <Button disabled={loading} type="submit" buttonWidth={`full`}>
                      {loading ? <Loader /> : 'Sign up with Email'}
                    </Button>
                  </form>
                )}
                <div className="mx-4 max-w-[600px] md:mx-8">
                  <div className="flex justify-center text-neutral-500 my-4">
                    Already have an account?{' '}
                    <Link className="pl-1.5 underline text-primary" to="/login">
                      {' '}
                      Log in
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

export default SignUp;

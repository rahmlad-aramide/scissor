import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import crossedEye from '../../assets/icons/crossed-eye.svg';
import eye from '../../assets/icons/eye.svg';
import googleLogo from '../../assets/icons/google-logo.svg';
import appleLogo from '../../assets/icons/apple-logo.svg';

import { ToastContainer } from 'react-toastify';
import { notify, warn } from '../../App';
import { Button, Input, Footer } from '../../components';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      notify('Signed up successfully');
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          warn('Incorrect password, try again!');
          break;
        case 'auth/user-not-found':
          warn('User not found, check your email address!');
          break;
        case 'auth/network-request-failed':
          warn('Connection problem, check your network and try again!');
          break;
        case 'auth/email-already-in-use':
          warn('This email is already in use!');
          break;
        default:
          warn('An error has occured', error);
      }
      console.log(error);
    }
  };

  return (
    <>
      <section className="h-screen bg-white">
        <ToastContainer />
        <div className="flex h-full md:h-screen w-full flex-col items-center justify-start md:flex-row md:justify-center">
          <div className="order-1 flex h-fit w-full items-center justify-center pt-16 md:order-2 md:h-full md:w-[45%]">
            <div className="my-auto h-full w-[90%] overflow-y-auto rounded-xl py-5">
              <div className="h-full w-full overflow-y-auto">
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
                    <div className="mr-6">
                      <button
                        onClick={signInWithGoogle}
                        className="flex items-center w-fit min-w-[6.8125rem] justify-center rounded bg-primary py-1.5 text-white transition duration-200 hover:scale-90 active:scale-100"
                      >
                        <img src={googleLogo} alt="google" className="mr-1" />{' '}
                        Google
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={signInWithGoogle}
                        className="flex items-center w-fit min-w-[6.8125rem] justify-center rounded bg-primary py-1.5 text-white transition duration-200 hover:scale-90 active:scale-100"
                      >
                        <img src={appleLogo} alt="apple" className="mr-1" />{' '}
                        Apple
                      </button>
                    </div>
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
                        name="displayName"
                        id="displayName"
                        placeholder="Enter your username"
                        value={displayName}
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
                            src={showPassword ? crossedEye : eye}
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
                            src={showPassword ? crossedEye : eye}
                            alt="Show Password"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" buttonWidth={`full`}>
                    Sign up with Email
                  </Button>
                </form>
                <div className="mx-4 max-w-[600px] md:mx-8">
                  <div className="flex justify-center text-neutral-500 my-4">
                    Already have an account?{' '}
                    <Link className="pl-1.5 underline text-primary" to="/login">
                      {' '}
                      Log in
                    </Link>
                  </div>
                  <div className="text-neutral-400 text-center text-xs">
                    By signing in with an account, you agree to
                    <br />
                    Sciccor&apos;s{' '}
                    <span className="text-neutral-500">
                      Terms of Service, Privacy Policy
                    </span>{' '}
                    and{' '}
                    <span className="text-neutral-500">
                      Acceptable Use Policy.
                    </span>
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

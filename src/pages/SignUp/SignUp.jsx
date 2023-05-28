import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import crossedEye from '../../assets/icons/crossed-eye.svg';
import eye from '../../assets/icons/eye.svg';

import { ToastContainer } from 'react-toastify';
import { notify, warn } from '../../App';
import { Button, Input } from '../../components';

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
      <section className="h-screen bg-white bg-hero-pattern bg-cover bg-bottom">
        <ToastContainer />
        <div className="flex h-screen w-full flex-col items-center justify-start md:flex-row md:justify-center">
          <div className="order-1 flex h-fit w-full items-center justify-center pt-16 md:order-2 md:h-full md:w-[45%]">
            <div className="border border-primary/10 shadow my-auto h-[78vh] w-[90%] overflow-y-auto rounded-xl bg-white/50 py-5 backdrop-blur-lg">
              <div className="h-full w-full overflow-y-auto">
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto w-[90%] max-w-[600px]"
                >
                  <div>
                    <h1 className="text-primary mb-5 text-[24px]">
                      Sign Up with Scissor
                    </h1>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="displayName" className="mb-2 text-primary">
                      Username
                    </label>
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
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="displayName" className="mb-2 text-primary">
                      Email address
                    </label>
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
                  <div className="flex justify-between">
                    <div className="mr-2 flex w-full flex-col">
                      <label htmlFor="password" className="mb-2 text-primary">
                        Password
                      </label>
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
                    <div className="ml-2 mb-6 flex w-full flex-col">
                      <label htmlFor="password" className="mb-2 text-primary">
                        Confirm Password
                      </label>
                      <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Confirm your password"
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
                    Sign In
                  </Button>
                </form>
                <div className="mx-4 mt-4 max-w-[600px] md:mx-8">
                  <div className="flex justify-center text-tertiary">
                    I already have an account?{' '}
                    <Link className="pl-1.5 underline text-primary" to="/login">
                      {' '}
                      Login
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-[1px] w-full bg-black"></div>
                    <div className="mx-2 mb-1 mt-0.5 flex justify-center">
                      or
                    </div>
                    <div className="h-[1px] w-full bg-black"></div>
                  </div>
                  <button
                    onClick={signInWithGoogle}
                    className="mt-3 flex w-full justify-center rounded-full border border-gray-800 bg-black py-1 text-white transition duration-200 hover:bg-transparent hover:text-black active:bg-black"
                  >
                    Sign In with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignUp;

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import { Button, Footer } from '../../components';
import { useNavigate } from 'react-router-dom';
import { inform, notify, warn } from '../../App';

interface FormFields {
  fname: string;
  lname: string;
  company: string;
  email: string;
  phone: string;
  job: string;
  size: string;
  useCase: string;
  country: string;
}

const defaultFormFields: FormFields = {
  fname: '',
  lname: '',
  company: '',
  email: '',
  phone: '',
  job: '',
  size: '',
  useCase: '',
  country: '',
};

const GetInTouch: React.FC = () => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { fname, lname, company, email, phone, job, size, useCase, country } =
    formFields;
  const firstImageUrl = '/images/get-in-touch.png';
  const secondImageUrl = '/images/get-in-touch2.png';

  const containerStyles: React.CSSProperties = {
    backgroundBlendMode: 'multiply',
    backgroundImage: `url(${firstImageUrl}), url(${secondImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  };

  const navigateToDashboard = () => {
    setTimeout(() => {
      inform("Redirecting you to your dashboard")
    }, 1000);
    setTimeout(() => {
      navigateTo('/dashboard');
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formFields }),
    })
      .then(() => {
        notify('Success! Our team will be in touch')
        resetFormFields();
        navigateToDashboard();
      })
      .catch((error) => {warn(`An error occured, ${error}`)});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <section className="min-h-screen">
      <ToastContainer />
      <div style={containerStyles} className="min-h-screen">
        <div className="flex flex-col justify-center items-center pt-40 pb-32">
          <div className="text-[40px] text-neutral-900 font-bold mb-6">
            Let&apos;s get in touch
          </div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="bg-neutral-300 rounded-lg w-[90%] max-w-[35.625rem] pt-28 pb-14 px-10"
            onSubmit={handleSubmit}
          >
            <div>
              <input type="hidden" name="contact" value="contact" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="fname"
                    className="text-neutral-800 font-medium"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 mb-3">
                    <input
                      name="fname"
                      id="fname"
                      type="text"
                      className="rounded-xl h-[46px] w-full px-4"
                      value={fname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="text-neutral-800 font-medium"
                  >
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 mb-3">
                    <input
                      name="lname"
                      id="lname"
                      type="text"
                      className="rounded-xl h-[46px] w-full px-4"
                      value={lname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="text-neutral-800 font-medium"
                >
                  Company Name<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="company"
                    id="company"
                    type="text"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-neutral-800 font-medium">
                  Business Email Address
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="text-neutral-800 font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="phone"
                    id="phone"
                    type="text"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="job" className="text-neutral-800 font-medium">
                  Job Title<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="job"
                    id="job"
                    type="text"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={job}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="size" className="text-neutral-800 font-medium">
                  Company Size<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="size"
                    id="size"
                    type="text"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={size}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="useCase"
                  className="text-neutral-800 font-medium"
                >
                  Primary Use Case<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="useCase"
                    id="useCase"
                    type="text"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={useCase}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="text-neutral-800 font-medium"
                >
                  Country<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="country"
                    id="country"
                    type="text"
                    className="rounded-xl h-[46px] w-full px-4"
                    value={country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="text-neutral-500 text-xs flex items-center justify-start">
                Scissor requires the contact information you provide in order to
                reach out to you regarding ourproducts and services. You have
                the option to unsubscribe from these communications whenever you
                wish. To learn more about how to unsubscribe, our privacy
                practices, and our dedication to safeguarding your privacy,
                please refer to our Privacy Policy.
              </div>
              <div className="mt-6">
                <Button buttonWidth="full" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default GetInTouch;

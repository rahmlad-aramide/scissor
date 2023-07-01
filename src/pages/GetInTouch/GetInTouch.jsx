/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Footer } from '../../components';

const defaultFormFields = {
  fname: '',
  lname: '',
  company: '',
  email: '',
  phone: '',
  title: '',
  size: '',
  useCase: '',
  country: '',
};

const GetInTouch = () => {
  const [loading, setLoading] = useState(false);
  const firstImageUrl = '/images/get-in-touch.png';
  const secondImageUrl = '/images/get-in-touch2.png';

  const containerStyles = {
    backgroundBlendMode: 'multiply',
    backgroundImage: `url(${firstImageUrl}), url(${secondImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <section className="min-h-screen">
      <div style={containerStyles} className="min-h-screen">
        <div className="flex flex-col justify-center items-center pt-40 pb-32">
          <div className="text-[40px] text-neutral-900 font-bold mb-6">
            Let&apos;s get in touch
          </div>
          <form className="bg-neutral-300 rounded-lg w-[90%] max-w-[35.625rem] pt-28 pb-14 px-10">
            <div>
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
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-neutral-800 font-medium">
                  Business Email Address<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 mb-3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="rounded-xl h-[46px] w-full px-4"
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
                    required
                  />
                </div>
              </div>
              <div className="text-neutral-500 text-xs flex items-center justify-start">
                Scissor requires the contact information you provide in order to
                reach out to you regarding our products and services. You have
                the option to unsubscribe from these communications whenever you
                wish. To learn more about how to unsubscribe, our privacy
                practices, and our dedication to safeguarding your privacy,
                please refer to our Privacy Policy.
              </div>
              <div className='mt-6'>
                <Button buttonWidth="full">
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

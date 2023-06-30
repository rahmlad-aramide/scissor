/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Footer } from '../../components';

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
  const firstImageUrl = 'src/assets/images/get-in-touch.png';
  const secondImageUrl = 'src/assets/images/get-in-touch2.png';

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
        <div className="flex flex-col justify-center items-center py-20">
          <div>Let&apos;s get in touch</div>
          {/* <form>
            <div>
              <div>
                <label htmlFor="fname">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input name="fname" id="fname" type="text" required />
              </div>
            </div>
          </form> */}
          <div className="bg-neutral-300 rounded-lg w-[570px] h-[947.97px] relative">
            <div className="w-[500px] h-[83.8px] absolute left-[30px] top-[102px]">
              <div className="h-[83.8px] absolute right-[250px] left-0 top-0">
                <div className="w-[250px] h-[28.8px] absolute left-0 top-0">
                  <div className="text-neutral-800 text-left absolute left-0 top-[4.61px] w-[98px] h-[18px] flex items-center justify-start">
                    First Name*
                  </div>
                </div>

                <div className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]"></div>
              </div>

              <div className="h-[83.8px] absolute right-0 left-[250px] top-0">
                <div className="w-[250px] h-[28.8px] absolute left-0 top-0">
                  <div className="text-neutral-800 text-left absolute left-0 top-[4.61px] w-[92px] h-[18px] flex items-center justify-start">
                    Last Name*
                  </div>
                </div>

                {/* <div
                  className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]"
                  style="box-shadow: inset 0px 1px 2px 0px rgba(10, 10, 10, 0.1)"
                ></div> */}
              </div>
            </div>

            <div className="w-[500px] h-[67.8px] absolute left-[30px] top-[185.8px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[4.81px] w-[141px] h-[18px] flex items-center justify-start">
                  Company Name*
                </div>
              </div>

              {/* <div className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.79px]"></div> */}
            </div>

            <div className="w-[500px] h-[67.8px] absolute left-[30px] top-[269.59px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[5.02px] w-48 h-[18px] flex items-center justify-start">
                  Business Email Address*
                </div>
              </div>

              {/* <div
                className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]"
                style="box-shadow: inset 0px 1px 2px 0px rgba(10, 10, 10, 0.1)"
              ></div> */}
            </div>

            <div className="w-[500px] h-[67.8px] absolute left-[30px] top-[353.39px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[5.22px] w-[126px] h-[18px] flex items-center justify-start">
                  Phone Number*
                </div>
              </div>

              {/* <div
                className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]"
                style="box-shadow: inset 0px 1px 2px 0px rgba(10, 10, 10, 0.1)"
              ></div> */}
            </div>

            <div className="w-[500px] h-[83.8px] absolute left-[30px] top-[437.19px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[5.42px] w-[83px] h-[18px] flex items-center justify-start">
                  Job Title*
                </div>
              </div>

              <div className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]">
                <div className="w-[458px] h-6 absolute left-[9px] top-[calc(50%_-_11px)] overflow-hidden">
                  <div className="text-neutral-500 text-left absolute left-0 top-[2.62px] w-[117px] h-[18px] flex items-center justify-start">
                    Please Select
                  </div>
                </div>

                {/* <svg
                  className="p-1 flex flex-col gap-2.5 items-center justify-center absolute left-[468px] top-[8.62px] overflow-visible"
                  style="transform: translate(-24px, 0px)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 9L12 15L6 9"
                    stroke="#5C6F7F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </div>
            </div>

            <div className="w-[500px] h-[83.8px] absolute left-[30px] top-[520.99px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[4.62px] w-[125px] h-[18px] flex items-center justify-start">
                  Company Size*
                </div>
              </div>

              <div className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.79px]">
                <div className="w-[458px] h-6 absolute left-[9px] top-[calc(50%_-_11px)] overflow-hidden">
                  <div className="text-neutral-500 text-left absolute left-0 top-[2.83px] w-[117px] h-[18px] flex items-center justify-start">
                    Please Select
                  </div>
                </div>

                {/* <svg
                  className="p-1 flex flex-col gap-2.5 items-center justify-center absolute left-[468px] top-[8.83px] overflow-visible"
                  style="transform: translate(-24px, 0px)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 9L12 15L6 9"
                    stroke="#5C6F7F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </div>
            </div>

            <div className="w-[500px] h-[83.8px] absolute left-[30px] top-[604.78px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[4.83px] w-[140px] h-[18px] flex items-center justify-start">
                  Primary Use Case*
                </div>
              </div>

              <div className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]">
                <div className="w-[458px] h-6 absolute left-[9px] top-[calc(50%_-_11px)] overflow-hidden">
                  <div className="text-neutral-500 text-left absolute left-0 top-[3.03px] w-[117px] h-[18px] flex items-center justify-start">
                    Please Select
                  </div>
                </div>

                {/* <svg
                  className="p-1 flex flex-col gap-2.5 items-center justify-center absolute left-[468px] top-[9.03px] overflow-visible"
                  style="transform: translate(-24px, 0px)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 9L12 15L6 9"
                    stroke="#5C6F7F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </div>
            </div>

            <div className="w-[500px] h-[83.8px] absolute left-[30px] top-[688.58px]">
              <div className="w-[500px] h-[28.8px] absolute left-0 top-0">
                <div className="text-neutral-800 text-left absolute left-0 top-[5.03px] w-[90px] h-[18px] flex items-center justify-start">
                  Country*
                </div>
              </div>

              <div className="bg-neutral-white rounded-xl border-solid border-neutral-300 border h-[46px] absolute right-2 left-0 top-[28.8px]">
                <div className="w-[458px] h-6 absolute left-[9px] top-[calc(50%_-_11px)] overflow-hidden">
                  <div className="text-neutral-500 text-left absolute left-0 top-[3.23px] w-[117px] h-[18px] flex items-center justify-start">
                    Please Select
                  </div>
                </div>

                {/* <svg
                  className="p-1 flex flex-col gap-2.5 items-center justify-center absolute left-[468px] top-[9.23px] overflow-visible"
                  style="transform: translate(-24px, 0px)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 9L12 15L6 9"
                    stroke="#5C6F7F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </div>
            </div>

            <div className="text-neutral-500 text-left absolute left-[30px] top-[calc(50%_-_-298.62px)] w-[481px] h-14 flex items-center justify-start">
              Scissor requires the contact information you provide in order to
              reach out to you regarding our products and services. You have the
              option to unsubscribe from these communications whenever you wish.
              To learn more about how to unsubscribe, our privacy practices, and
              our dedication to safeguarding your privacy, please refer to our
              Privacy Policy.
            </div>

            <div className="bg-primary-400 rounded-[100px] pt-3 pr-6 pb-3 pl-6 flex flex-row gap-2.5 items-center justify-center w-[492px] absolute left-[30px] top-[851.61px] overflow-hidden">
              <div className="text-neutral-white text-left relative">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default GetInTouch;

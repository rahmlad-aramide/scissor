import React from 'react';
import line from './../../assets/images/vertical-line.svg';
import { whyData } from '../../utils/whyData/whyData';

const WhyScissor: React.FC = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row pt-[136px] pb-[130px] justify-between w-[90%] mx-auto text-dark">
        <div className="flex w-full md:w-[40%]">
          <div className="mr-4 ml-0 md:-ml-5">
            <img src={line} alt="vertical line" className="mt-0 md:mt-0" />
          </div>
          <div>
            <div className="text-4xl mb-4 md:mb-4 md:text-[40px] font-bold" data-testid="why-heading">
              Why choose <span className="text-primary">Scissors</span>
            </div>
            <div className="max-w-[37ch] ml-0 md:ml-2.5 font-medium" data-testid="why-paragraph">
              Scissors is the hub of everything that has to do with your link
              management. We shorten your URLs, allow you creating custom ones
              for your personal, business, event usage. Our swift QR code
              creation, management and usage tracking with advance analytics for
              all of these is second to none.
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-[60%]">
          <div className="grid gap-x-7 gap-y-16 grid-cols-1 md:grid-cols-2 mt-12 md:mt-2">
            {whyData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <div className="bg-[#3284FF]/10 w-14 h-14 flex mb-10 rounded-full justify-center">
                  <img src={`${data.icon}`} alt="" className="m-auto p-auto" />
                </div>
                <div className="font-semibold text-[32px] leading-7 mb-4" data-testid={`reason-heading-${index}`}>
                  {data.heading}
                </div>
                <div className="font-medium text-justify md:text-left" data-testid={`reason-body-${index}`}>
                  {data.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyScissor;

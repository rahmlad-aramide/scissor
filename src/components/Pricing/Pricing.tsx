import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '..';
import { pricingData } from '../../utils/pricingData/pricingData';
// import line from './../../assets/images/vertical-line.svg';
import Line from './../Line/Line'
const Pricing: React.FC = () => {
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  if (hoveredElement === null) setHoveredElement(2);

  const handleMouseEnter = (id: number) => {
    setHoveredElement(id);
  };

  const handleClick = (id: number) => {
    setHoveredElement(id);
  };
  return (
    <section id="pricing">
      <div className="text-dark">
        <div className="flex flex-col w-full mx-auto mb-16">
          <div className="flex justify-center mx-auto w-[90%] mb-4 md:mb-0">
            <div className="mr-4 ml-0 md:-ml-5">
              {/* <img src={line} alt="vertical line" className="mt-0 md:mt-0" /> */}
              <Line />
            </div>
            <div className="text-4xl md:text-[40px] font-bold">
              A <span className="text-primary">price perfect</span> for your
              needs.
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="w-[90%] font-medium max-w-[55ch] md:mx-auto pr-4 md:pr-0 ml-4 md:ml-auto text-justify md:text-center">
              From catering for your personal, business, event, social needs,
              you can be rest assured we have you in mind in our pricing.
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex mx-auto flex-col md:flex-row">
            {pricingData.map((data:any) => (
              <div
                key={data.id}
                className={
                  hoveredElement === data.id
                    ? `group pt-10 md:pt-24 pb-12 md:pb-36 mb-8 md:mb-auto md:mt-auto px-6 md:px-16 w-[95%] mx-auto h-fit my-auto bg-[#1E3448] z-10 rounded-xl transition duration-300`
                    : `group pt-6 pb-6 md:pb-11 px-8 md:px-20 mb-8 md:mb-auto w-[90%] mx-auto md:-ml-4 md:-mr-4 h-fit min-h-[30rem] my-auto border-[0.4px] border-primary bg-white rounded-xl transition duration-300`
                }
                onMouseEnter={() => handleMouseEnter(data.id)}
                onClick={() => handleClick(data.id)}
              >
                <div
                  className={
                    hoveredElement === data.id
                      ? `text-2xl font-medium text-white group-hover:text-white transition duration-300`
                      : `text-2xl font-medium text-dark transition duration-300`
                  }
                >
                  {data.plan}
                </div>
                <div
                  className={
                    hoveredElement === data.id
                      ? `text-[40px] font-bold text-white group-hover:text-white transition duration-300`
                      : `text-[40px] font-bold text-dark transition duration-300`
                  }
                >
                  {data.price}
                </div>
                <div
                  className={
                    hoveredElement === data.id
                      ? `text-xl font-medium text-white mb-4 group-hover:text-white transition duration-300`
                      : `text-xl font-medium text-dark mb-4 transition duration-300`
                  }
                >
                  {data.desc}
                </div>
                {data.features.map((feature:string, index:number) => (
                  <ul key={index} className="flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#ututoo)">
                        <path
                          d="M14.6667 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4788 13.1394 11.2688 13.9817 9.89022 14.3893C8.5116 14.797 7.03815 14.748 5.68963 14.2498C4.3411 13.7516 3.18975 12.8308 2.40729 11.6248C1.62482 10.4188 1.25317 8.99212 1.34776 7.55762C1.44235 6.12312 1.99812 4.75762 2.93217 3.66479C3.86621 2.57195 5.1285 1.81033 6.53077 1.4935C7.93304 1.17668 9.40016 1.32163 10.7133 1.90674"
                          className={
                            hoveredElement === data.id
                              ? `stroke-white transition duration-300`
                              : `stroke-[#005AE2] transition duration-300`
                          }
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.6667 2.66675L8 9.34008L6 7.34008"
                          className={
                            hoveredElement === data.id
                              ? `stroke-white group-hover:stroke-white transition duration-300`
                              : `stroke-[#005AE2] group-hover:stroke-white transition duration-300`
                          }
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_124_872">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <li
                      className={
                        hoveredElement === data.id
                          ? `text-sm font-medium text-white ml-2 group-hover:text-white pb-6 transition duration-300`
                          : `text-sm font-medium text-dark ml-2 pb-6 transition duration-300`
                      }
                    >
                      {feature}
                    </li>
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-16 mb-28">
          <div className="w-[95%] mx-auto flex flex-col sm:flex-row justify-center items-center">
            <Link to="/get-quote" className="order-2 sm:order-1">
              <Button
                style={{
                  backgroundColor: 'white',
                  color: '#005AE2',
                  marginRight: '12px',
                }}
              >
                Get Custom Pricing
              </Button>
            </Link>
            <div className="order-1 sm:order-2 mb-4 sm:mb-0 ml-0 sm:ml-2">
              <Button>Select Pricing</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Pricing;

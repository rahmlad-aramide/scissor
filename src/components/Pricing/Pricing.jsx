import { useState } from 'react';
import { Button } from '../../components';
import { pricingData } from '../../utils/pricingData/pricingData';
import line from './../../assets/images/vertical-line.svg';
const Pricing = () => {
  const [hoveredElement, setHoveredElement] = useState(null);
  if (hoveredElement === null) setHoveredElement(2);
  const handleMouseEnter = (id) => {
    setHoveredElement(id);
  };
  const handleMouseLeave = () => {
    setHoveredElement(null);
  };
  return (
    <section id="pricing">
      <div className="text-dark">
        <div className="flex flex-col w-full mx-auto mb-16">
          <div className="flex mx-auto">
            <div className="mt-2 mr-4">
              <img src={line} alt="Vertical line" />
            </div>
            <div className="text-[40px] font-bold">
              A <span className="text-primary">perfect price</span> for your
              needs.
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="w-[90%] font-medium max-w-[55ch] mx-auto text-center">
              From catering for your personal, business, event, social needs,
              you can be rest assured we have you in mind in our pricing.
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex mx-auto">
            {pricingData.map((data) => (
              <div
                key={data.id}
                className={
                  hoveredElement === data.id
                    ? `group pt-24 pb-36 px-16 h-fit my-auto bg-[#1E3448] z-10 rounded-xl transition duration-300`
                    : `group pt-6 pb-11 px-20 -ml-4 -mr-4 h-fit my-auto border-[0.4px] border-primary bg-white rounded-xl transition duration-300`
                }
                onMouseEnter={() => handleMouseEnter(data.id)}
                onMouseLeave={handleMouseLeave}
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
                {data.features.map((feature, index) => (
                  <ul key={index} className="flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_124_872)">
                        <path
                          d="M14.6667 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4788 13.1394 11.2688 13.9817 9.89022 14.3893C8.5116 14.797 7.03815 14.748 5.68963 14.2498C4.3411 13.7516 3.18975 12.8308 2.40729 11.6248C1.62482 10.4188 1.25317 8.99212 1.34776 7.55762C1.44235 6.12312 1.99812 4.75762 2.93217 3.66479C3.86621 2.57195 5.1285 1.81033 6.53077 1.4935C7.93304 1.17668 9.40016 1.32163 10.7133 1.90674"
                          className="stroke-[#005AE2] group-hover:stroke-white transition duration-300"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.6667 2.66675L8 9.34008L6 7.34008"
                          className="stroke-[#005AE2] group-hover:stroke-white transition duration-300"
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
          <div className="mx-auto">
            <Button
              style={{
                backgroundColor: 'white',
                color: '#005AE2',
                marginRight: '12px',
              }}
            >
              Get Custom Pricing
            </Button>
            <Button>Select Pricing</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Pricing;

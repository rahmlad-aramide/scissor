import logo from '../../assets/images/scissors-logo-black.svg';
import { Link } from 'react-router-dom';
import {
  socials,
  whyScissor,
  resources,
  solutions,
  features,
  products,
  legal,
  company,
} from '../../utils/footerData/footerData';
const Footer = () => {
  return (
    <section>
      <div className="grid grid-cols-12 gap-4 md:gap-[4.5rem] w-[90%] mx-auto mb-5 mt-[5.6875rem]">
        <div className="col-span-12 md:col-span-3 flex justify-center md:justify-end">
          <div className="flex flex-col mb-5 md:mb-0">
            <Link to="/">
              <div className="mb-4 md:mb-10">
                <img src={logo as unknown as string} alt="Scissors" />
              </div>
            </Link>
            <div>
              <div className="flex">
                {socials.map((s, index) => (
                  <img
                    key={index}
                    src={s}
                    alt="Social"
                    className="ml-6 first:ml-2 cursor-pointer hover:scale-110 active:scale-100 transition duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-2">
          <div className="flex flex-col">
            <div className="text-neutral-900 font-bold mb-2">Why Scissor?</div>
            <ul className="min-h-[8rem] text-neutral-800">
              {whyScissor.map((d, index) => (
                <li
                  key={index}
                  className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-neutral-900 font-bold mb-2">Resources</div>
            <ul>
              {resources.map((d, index) => (
                <li
                  key={index}
                  className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-6 md:col-span-2">
          <div className="flex flex-col">
            <div className="text-neutral-900 font-bold mb-2">Solutions</div>
            <ul className="min-h-[8rem] text-neutral-800">
              {solutions.map((d, index) => (
                <li
                  key={index}
                  className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-neutral-900 font-bold mb-2">Features</div>
            {features.map((d, index) => (
              <ul key={index}>
                <li className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300">
                  {d}
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-2">
          <div className="flex flex-col">
            <div className="text-neutral-900 font-bold mb-2">Products</div>
            <ul className="min-h-[8rem] text-neutral-800">
              {products.map((d, index) => (
                <li
                  key={index}
                  className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-neutral-900 font-bold mb-2">Legal</div>
            {legal.map((d, index) => (
              <ul key={index}>
                <li className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300">
                  {d}
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-neutral-900 font-bold mb-2">Company</div>
          {company.map((d, index) => (
            <ul key={index}>
              <li className="font-medium cursor-pointer hover:scale-110 active:scale-100 transition duration-300">
                {d}
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-center md:justify-end mr-4 mb-10 md:mr-[8.6875rem]">
          <ul className="flex text-neutral-800">
            <li className="text-neutral-800 text-sm font-medium">
              Terms of Service
            </li>{' '}
            <span className="mx-2 -mt-1">|</span>
            <li className="text-neutral-800 text-sm font-medium">
              Security
            </li>{' '}
            <span className="mx-2 -mt-1">|</span>
            <li className="text-neutral-800 text-sm font-medium">
              Scissor 2023
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Footer;

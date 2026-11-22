import logo from '../../assets/images/scissors-logo-black.svg';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { product, company, legal, FooterLink } from '../../utils/footerData/footerData';

const renderLink = (link: FooterLink) =>
  link.hash ? (
    <HashLink smooth to={link.to} className="hover:text-primary transition duration-300">
      {link.label}
    </HashLink>
  ) : (
    <Link to={link.to} className="hover:text-primary transition duration-300">
      {link.label}
    </Link>
  );

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <section>
      <div className="grid grid-cols-12 gap-4 md:gap-[4.5rem] w-[90%] mx-auto mb-5 mt-[5.6875rem]">
        <div className="col-span-12 md:col-span-4 flex justify-center md:justify-end">
          <div className="flex flex-col mb-5 md:mb-0">
            <Link to="/">
              <div className="mb-4 md:mb-10">
                <img src={logo as unknown as string} alt="Scissors" />
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-neutral-900 font-bold mb-2">Product</div>
          <ul className="text-neutral-800 space-y-1">
            {product.map((link) => (
              <li key={link.label} className="font-medium">
                {renderLink(link)}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 md:col-span-2">
          <div className="text-neutral-900 font-bold mb-2">Company</div>
          <ul className="text-neutral-800 space-y-1">
            {company.map((link) => (
              <li key={link.label} className="font-medium">
                {renderLink(link)}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="text-neutral-900 font-bold mb-2">Legal</div>
          <ul className="text-neutral-800 space-y-1">
            {legal.map((link) => (
              <li key={link.label} className="font-medium">
                {renderLink(link)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="flex justify-center md:justify-end mr-4 mb-10 md:mr-[8.6875rem]">
          <ul className="flex text-neutral-800">
            <li className="text-neutral-800 text-sm font-medium">
              <Link to="/terms-of-service" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
            <span className="mx-2 -mt-1">|</span>
            <li className="text-neutral-800 text-sm font-medium">
              <Link to="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <span className="mx-2 -mt-1">|</span>
            <li className="text-neutral-800 text-sm font-medium">Scissor {year}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Footer;

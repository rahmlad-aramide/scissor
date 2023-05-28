import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import logo from '../../assets/images/scissors-logo.svg';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleActiveLink = (linkNum) => {
    setActiveLink(linkNum);
  };
  return (
    <>
      <nav className="fixed flex w-full pt-4 bg-hero-pattern z-50 bg-top bg-cover">
        <div className="flex w-[90%] max-w-[78.375rem] justify-between items-center h-11 mx-auto">
          <div>
            <NavLink to="/">
              <img src={logo} alt="Scissor" />
            </NavLink>
          </div>
          <ul className="flex">
            <li>
              <NavHashLink
                to="/#"
                smooth
                className={
                  activeLink === 0
                    ? `text-primary text-lg font-medium mr-10`
                    : `text-dark text-lg font-medium mr-10`
                }
                onClick={() => handleActiveLink(0)}
              >
                My Urls
              </NavHashLink>
            </li>
            <li>
              <NavHashLink
                to="/#features"
                smooth
                className={
                  activeLink === 1
                    ? `text-primary text-lg font-medium mr-10`
                    : `text-dark text-lg font-medium mr-10`
                }
                onClick={() => handleActiveLink(1)}
              >
                Features
              </NavHashLink>
            </li>
            <li>
              <NavHashLink
                to="/#pricing"
                smooth
                className={
                  activeLink === 2
                    ? `text-primary text-lg font-medium mr-10`
                    : `text-dark text-lg font-medium mr-10`
                }
                onClick={() => handleActiveLink(2)}
              >
                Pricing
              </NavHashLink>
            </li>
            <li>
              <NavHashLink
                to="/#analytics"
                smooth
                className={
                  activeLink === 3
                    ? `text-primary text-lg font-medium mr-10`
                    : `text-dark text-lg font-medium mr-10`
                }
                onClick={() => handleActiveLink(3)}
              >
                Analytics
              </NavHashLink>
            </li>
            <li>
              <NavHashLink
                to="/#faqs"
                smooth
                className={
                  activeLink === 4
                    ? `text-primary text-lg font-medium mr-10`
                    : `text-dark text-lg font-medium mr-10`
                }
                onClick={() => handleActiveLink(4)}
              >
                FAQs
              </NavHashLink>
            </li>
          </ul>
          <div className="flex items-center">
            <div>
              <Link
                to="/login"
                onClick={() => setActiveLink(5)}
                className="text-[#0065FE] font-semibold"
              >
                Login
              </Link>
            </div>
            <div className="ml-[36px]">
              <Link to="/sign-up" onClick={() => setActiveLink(6)}>
                <Button>Try for free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;

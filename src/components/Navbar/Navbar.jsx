import { useState, useContext, useRef } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { NavHashLink, HashLink } from 'react-router-hash-link';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { inform } from '../../App';
import logo from '../../assets/images/scissors-logo.svg';
import Button from '../Button/Button';
import open from '../../assets/icons/hamburger.svg';

const Navbar = () => {
  const navigateTo = useNavigate();
  const navRef = useRef();
  const [activeLink, setActiveLink] = useState(0);
  const handleActiveLink = (linkNum) => {
    setActiveLink(linkNum);
  };
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    inform('Logging you out...');
    setTimeout(() => {
      localStorage.removeItem('user');
      setUser(null);
      navigateTo('/');
    }, 2500);
  };

  const showMenu = () => {
    navRef.current.classList.toggle('translate-x-[100%]');
  };

  return (
    <>
      <nav className="fixed flex w-full pt-2 md:pt-4 bg-hero-pattern z-50 bg-top bg-cover">
        <div className="flex w-[90%] max-w-[78.375rem] pb-2 md:pb-2.5 justify-between items-center h-11 mx-auto">
          <div>
            <NavLink to="/">
              <img src={logo} alt="Scissor" />
            </NavLink>
          </div>
          <ul className="hidden md:flex">
            <li>
              <NavHashLink
                to="/dashboard"
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
          <div className="hidden md:flex items-center">
            {user ? (
              <div>
                <button
                  onClick={handleLogout}
                  className={`group rounded-full py-2 px-8 bg-primary border border-primary text-white font-medium transition duration-300 hover:text-primary hover:bg-transparent active:scale-90`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
          {/* Mobile nav & toggler */}
          <div className="z-20 flex md:hidden">
            <button
              onClick={showMenu}
              className="absolute top-0 right-2 flex h-12 items-center justify-center p-3 text-secondary transition active:scale-90 md:hidden"
            >
              <img src={open} alt="Open Nav" />
            </button>
            <div
              ref={navRef}
              className={`fixed top-0 right-0 my-auto flex h-screen w-[70%] translate-x-[100%] flex-col items-center bg-white text-primary transition md:hidden`}
            >
              <div
                className="mb-4 mt-[50%] flex justify-center"
                onClick={showMenu}
              >
                <HashLink
                  to="/#"
                  smooth
                  className="px-4 decoration-2 underline-offset-4 hover:underline font-semibold"
                >
                  My Urls
                </HashLink>
              </div>
              <div className="my-4 flex justify-center" onClick={showMenu}>
                <HashLink
                  to="/#features"
                  smooth
                  className="px-4 decoration-2 underline-offset-4 hover:underline font-semibold"
                >
                  Features
                </HashLink>
              </div>
              <div className="my-4 flex justify-center" onClick={showMenu}>
                <HashLink
                  to="/#pricing"
                  smooth
                  className="px-4 decoration-2 underline-offset-4 hover:underline font-semibold"
                >
                  Pricing
                </HashLink>
              </div>
              <div className="my-4 flex justify-center" onClick={showMenu}>
                <HashLink
                  to="/#analytics"
                  smooth
                  className="px-4 decoration-2 underline-offset-4 hover:underline font-semibold"
                >
                  Analytics
                </HashLink>
              </div>
              <div className="my-4 flex justify-center" onClick={showMenu}>
                <HashLink
                  to="/#faqs"
                  smooth
                  className="px-4 decoration-2 underline-offset-4 hover:underline font-semibold"
                >
                  FAQs
                </HashLink>
              </div>
              <div className="flex flex-col items-center mt-2">
                {user ? (
                  <div>
                    <button
                      onClick={handleLogout}
                      className={`group rounded-full py-2 px-8 bg-primary border border-primary text-white font-medium transition duration-300 hover:text-primary hover:bg-transparent active:scale-90`}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <div className='my-4'>
                      <Link
                        to="/login"
                        onClick={() => setActiveLink(5)}
                        className="text-[#0065FE] font-semibold"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="mx-auto mt-2">
                      <Link to="/sign-up" onClick={() => setActiveLink(6)}>
                        <Button>Try for free</Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={showMenu}
                className="absolute top-1 right-3 flex scale-110 cursor-pointer p-2 text-4xl font-bold text-primary transition duration-500 ease-in active:scale-110 md:hidden"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;

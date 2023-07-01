import { useContext, useRef, useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { NavHashLink, HashLink } from 'react-router-hash-link';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { ToastContainer } from 'react-toastify';
import { Button } from '../../components';
import open from '../../assets/icons/hamburger.svg';
const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const navRef = useRef();
  const [activeLink, setActiveLink] = useState(0);
  const handleActiveLink = (linkNum) => {
    setActiveLink(linkNum);
  };
  const showMenu = () => {
    navRef.current.classList.toggle('translate-x-[100%]');
  };
  return (
    <section>
      <ToastContainer />
      <div className="pt-16">
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
                className="px-4 decoration-2 underline-offset-4 hover:underline"
              >
                My Urls
              </HashLink>
            </div>
            <div className="my-4 flex justify-center" onClick={showMenu}>
              <HashLink
                to="/#features"
                smooth
                className="px-4 decoration-2 underline-offset-4 hover:underline"
              >
                Features
              </HashLink>
            </div>
            <div className="my-4 flex justify-center" onClick={showMenu}>
              <HashLink
                to="/#pricing"
                smooth
                className="px-4 decoration-2 underline-offset-4 hover:underline"
              >
                Pricing
              </HashLink>
            </div>
            <div className="my-4 flex justify-center" onClick={showMenu}>
              <HashLink
                to="/#analytics"
                smooth
                className="px-4 decoration-2 underline-offset-4 hover:underline"
              >
                Analytics
              </HashLink>
            </div>
            <div className="my-4 flex justify-center" onClick={showMenu}>
              <HashLink
                to="/#faqs"
                smooth
                className="px-4 decoration-2 underline-offset-4 hover:underline"
              >
                FAQs
              </HashLink>
            </div>
            <button
              onClick={showMenu}
              className="absolute top-1 right-3 flex scale-110 cursor-pointer p-2 text-4xl font-bold text-primary transition duration-500 ease-in active:scale-110 md:hidden"
            >
              &times;
            </button>
          </div>
        </div>
        <div>Welcome to Sciccor</div>
      </div>
    </section>
  );
};
export default Dashboard;

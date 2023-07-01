import { useContext, useRef, useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { NavHashLink, HashLink } from 'react-router-hash-link';
import { UserContext } from '../../contexts/UserContext/UserContext';

const SideNav = () => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);
  console.log(user);
  const navRef = useRef();
  const togglerRef = useRef();
  const showMenu = () => {
    setActive(!active);
    navRef.current.classList.toggle('-translate-x-[100%]');
  };
  return (
    <nav>
      {/* Desktop Nav */}
      <div className='hidden md:flex bg-gray-200 h-[calc(100vh_-_60px)] w-full'>

      </div>

      {/* Mobile Nav */}
      <div className="z-20 flex md:hidden">
        <div
          ref={navRef}
          className={`fixed top-0 left-0 my-auto flex h-screen w-[70%] -translate-x-[100%] flex-col items-center bg-gray-200 text-primary transition md:hidden`}
        >
          <button
            onClick={showMenu}
            ref={togglerRef}
            className={
              active
                ? `bg-white rounded-full absolute shadow-lg border-gray-400 top-16 z-50 -translate-x-[90%] -right-20 flex h-12 w-12 items-center justify-center text-secondary transition active:scale-90 md:hidden`
                : `bg-white rounded-full absolute shadow-lg border-gray-400 top-16 z-50 -translate-x-[90%] -right-[5.5rem] flex h-12 items-center justify-center p-3 text-secondary transition active:scale-90 md:hidden rotate-180`
            }
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              role="graphics-document"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
          </button>
          <div className="flex mt-20">
            <div className="text-black">
              <div>Nothing to see here yet</div>
            </div>
          </div>
          <button
            onClick={showMenu}
            className="absolute top-1 right-3 flex scale-110 cursor-pointer p-2 text-4xl font-bold text-primary transition duration-500 ease-in active:scale-110 md:hidden"
          >
            &times;
          </button>
        </div>
      </div>
    </nav>
  );
};
export default SideNav;

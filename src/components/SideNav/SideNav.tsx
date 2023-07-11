import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext/UserContext';
import Button from '../Button/Button';

interface AuthenticatedUser {
  name: string;
  profile_photo: string;
}

const SideNav: React.FC = () => {
  const pathname = window.location.pathname;
  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
  const [active, setActive] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<string | undefined>('S');
  const [firstNameState, setFirstNameState] = useState<string | undefined>(
    'Scissor'
  );
  const navRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLButtonElement>(null);

  const showMenu = (): void => {
    setActive(!active);
    if (navRef.current) {
      navRef.current.classList.toggle('-translate-x-[100%]');
    }
  };

  let initial: string | undefined;
  let firstName: string | undefined;

  useEffect(() => {
    if (authenticatedUser) {
      const names = authenticatedUser?.name?.split(' ');
      firstName = names?.[0];
      initial = firstName?.charAt(0);
      setFirstNameState(firstName);
      setInitialState(initial);
    }
  }, [setAuthenticatedUser]);
console.log(authenticatedUser?.profile_photo)
  return (
    <nav className="border border-r-gray-200">
      {/* Desktop Nav */}
      <div className="hidden md:flex bg-white h-[calc(100vh_-_64px)] w-full">
        <div className="flex flex-col w-full items-center pt-6 mx-auto">
          <div className="flex w-full">
            <div className="w-[80%] mx-auto mb-6 rounded-full shadow-lg">
              <NavLink to="/dashboard/new" className="rounded-full">
                <Button
                  buttonWidth="full"
                  style={{
                    fontWeight: '600',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                  }}
                >
                  <div className="flex justify-center">
                    <svg
                      width="22"
                      height="21"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1 4H4.09998C3.56954 4 3.06083 4.21071 2.68576 4.58579C2.31069 4.96086 2.09998 5.46957 2.09998 6V20C2.09998 20.5304 2.31069 21.0391 2.68576 21.4142C3.06083 21.7893 3.56954 22 4.09998 22H18.1C18.6304 22 19.1391 21.7893 19.5142 21.4142C19.8893 21.0391 20.1 20.5304 20.1 20V13"
                        className="stroke-white group-hover:stroke-primary transition duration-300"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.6 2.49998C18.9978 2.10216 19.5374 1.87866 20.1 1.87866C20.6626 1.87866 21.2022 2.10216 21.6 2.49998C21.9978 2.89781 22.2213 3.43737 22.2213 3.99998C22.2213 4.56259 21.9978 5.10216 21.6 5.49998L12.1 15L8.09998 16L9.09998 12L18.6 2.49998Z"
                        className="stroke-white group-hover:stroke-primary transition duration-300"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="ml-2">Trim new</div>
                  </div>
                </Button>
              </NavLink>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-200"></div>
          <div className="flex w-full ml-12 flex-col items-start">
            <NavLink to="/dashboard" className={`w-[calc(100%_-_3rem)]`}>
              <div
                className={
                  pathname === '/dashboard'
                    ? 'px-4 mb-2 py-2 mt-6 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                    : 'font-medium hover:bg-primary/10 px-4 mb-2 py-2 mt-6 border-l-4 hover:border-transparent border-white transition duration-300'
                }
              >
                <div className="flex items-center">
                  <div>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8859 3.06763H3.88586V10.0676H10.8859V3.06763Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21.8859 3.06763H14.8859V10.0676H21.8859V3.06763Z"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21.8859 14.0676H14.8859V21.0676H21.8859V14.0676Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.8859 14.0676H3.88586V21.0676H10.8859V14.0676Z"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">Dashboard</div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/my-links"
              className={`w-[calc(100%_-_3rem)]`}
            >
              <div
                className={
                  pathname === '/dashboard/my-links'
                    ? 'px-4 my-2 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                    : 'font-medium hover:bg-primary/10 px-4 my-2 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                }
              >
                <div className="flex">
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_124_800)">
                        <path
                          d="M15.1 7H18.1C18.7566 7 19.4068 7.12933 20.0134 7.3806C20.62 7.63188 21.1712 8.00017 21.6355 8.46447C22.0998 8.92876 22.4681 9.47996 22.7194 10.0866C22.9706 10.6932 23.1 11.3434 23.1 12C23.1 12.6566 22.9706 13.3068 22.7194 13.9134C22.4681 14.52 22.0998 15.0712 21.6355 15.5355C21.1712 15.9998 20.62 16.3681 20.0134 16.6194C19.4068 16.8707 18.7566 17 18.1 17H15.1M9.09998 17H6.09998C5.44337 17 4.79319 16.8707 4.18656 16.6194C3.57993 16.3681 3.02873 15.9998 2.56444 15.5355C1.62676 14.5979 1.09998 13.3261 1.09998 12C1.09998 10.6739 1.62676 9.40215 2.56444 8.46447C3.50212 7.52678 4.77389 7 6.09998 7H9.09998"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.09998 12H16.1"
                          stroke="#005AE2"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_124_800">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.0999756)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-3">My Links</div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/qr-codes"
              className={`w-[calc(100%_-_3rem)]`}
            >
              <div
                className={
                  pathname === '/dashboard/qr-codes'
                    ? 'px-4 my-2 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                    : 'font-medium hover:bg-primary/10 px-4 my-2 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                }
              >
                <div className="flex">
                  <div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      className="text-2xl text-primary"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"
                        className="fill-dark"
                      ></path>
                      <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"></path>
                      <path
                        d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"
                        className="fill-dark"
                      ></path>
                      <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"></path>
                      <path d="M12 9h2V8h-2v1Z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 whitespace-pre">QR Codes</div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/analytics"
              className="w-[calc(100%_-_3rem)]"
            >
              <div
                className={
                  pathname === '/dashboard/analytics'
                    ? 'px-4 my-2 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                    : 'font-medium hover:bg-primary/10 px-4 my-2 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                }
              >
                <span className="flex">
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_159_363)">
                        <path
                          d="M21.1 12H17.1L14.1 21L8.09998 3L5.09998 12H1.09998"
                          stroke="#0065FE"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_159_363">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.0999756)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-3">Analytics</div>
                </span>
              </div>
            </NavLink>
            <div className="h-[1px] w-[calc(100%_-_3rem)] bg-gray-200 my-4"></div>
            <NavLink to="/dashboard/settings" className="w-[calc(100%_-_3rem)]">
              <div
                className={
                  pathname === '/dashboard/settings'
                    ? 'px-4 my-2 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                    : 'font-medium hover:bg-primary/10 px-4 my-2 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                }
              >
                <span className="flex">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 00-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 00.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                        className="fill-primary"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">Settings</div>
                </span>
              </div>
            </NavLink>
            <div className="w-[calc(100%_-_3rem)]">
              <div className="px-4 my-2 py-2 bg-primary/10 font-semibold transition duration-300">
                <span className="flex">
                  <div className="bg-primary w-8 aspect-square flex items-center justify-center text-white font-bold my-auto rounded-full">
                    {authenticatedUser &&
                    authenticatedUser.profile_photo !== null
                      ? <img src={authenticatedUser.profile_photo} alt={initialState} />
                      : initialState}
                  </div>
                  <div className="ml-3 my-auto">{firstNameState}</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="z-20 flex md:hidden">
        <div
          ref={navRef}
          className={`fixed top-0 left-0 my-auto flex h-screen w-[70%] -translate-x-[100%] flex-col items-center shadow-md bg-white transition md:hidden`}
        >
          <button
            onClick={showMenu}
            ref={togglerRef}
            className={
              active
                ? `bg-white rounded-full absolute shadow-lg border border-gray-200 top-16 z-50 -translate-x-[90%] -right-20 flex h-12 w-12 items-center justify-center text-secondary transition active:scale-90 md:hidden`
                : `bg-white rounded-full absolute shadow-lg border border-gray-200 top-16 z-50 -translate-x-[90%] -right-[5.5rem] flex h-12 items-center justify-center p-3 text-secondary transition active:scale-90 md:hidden rotate-180`
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
            <div className="flex flex-col w-full items-center pt-6 mx-auto">
              <div className="flex w-full">
                <div className="w-[100%] mx-auto mb-6 rounded-full shadow-lg">
                  <NavLink to="/dashboard/new" className="rounded-full">
                    <Button buttonWidth="full" style={{ fontWeight: '600' }}>
                      <div className="flex justify-center">
                        <svg
                          width="22"
                          height="21"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.1 4H4.09998C3.56954 4 3.06083 4.21071 2.68576 4.58579C2.31069 4.96086 2.09998 5.46957 2.09998 6V20C2.09998 20.5304 2.31069 21.0391 2.68576 21.4142C3.06083 21.7893 3.56954 22 4.09998 22H18.1C18.6304 22 19.1391 21.7893 19.5142 21.4142C19.8893 21.0391 20.1 20.5304 20.1 20V13"
                            className="stroke-white group-hover:stroke-primary transition duration-300"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.6 2.49998C18.9978 2.10216 19.5374 1.87866 20.1 1.87866C20.6626 1.87866 21.2022 2.10216 21.6 2.49998C21.9978 2.89781 22.2213 3.43737 22.2213 3.99998C22.2213 4.56259 21.9978 5.10216 21.6 5.49998L12.1 15L8.09998 16L9.09998 12L18.6 2.49998Z"
                            className="stroke-white group-hover:stroke-primary transition duration-300"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div className="ml-2">Trim new</div>
                      </div>
                    </Button>
                  </NavLink>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-200"></div>
              <div className="flex w-full ml-6 mr-6 flex-col items-start">
                <NavLink to="/dashboard" className={`w-[calc(100%)] mt-6 mb-2`}>
                  <div
                    className={
                      pathname === '/dashboard'
                        ? 'px-4 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                        : 'font-medium hover:bg-primary/10 px-4 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                    }
                  >
                    <div className="flex items-center">
                      <div>
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8859 3.06763H3.88586V10.0676H10.8859V3.06763Z"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.8859 3.06763H14.8859V10.0676H21.8859V3.06763Z"
                            stroke="#005AE2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.8859 14.0676H14.8859V21.0676H21.8859V14.0676Z"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.8859 14.0676H3.88586V21.0676H10.8859V14.0676Z"
                            stroke="#005AE2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">Dashboard</div>
                    </div>
                  </div>
                </NavLink>
                <NavLink
                  to="/dashboard/my-links"
                  className={`w-[calc(100%)] my-2`}
                >
                  <div
                    className={
                      pathname === '/dashboard/my-links'
                        ? 'px-4 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                        : 'font-medium hover:bg-primary/10 px-4 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                    }
                  >
                    <div className="flex">
                      <div>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_124_800)">
                            <path
                              d="M15.1 7H18.1C18.7566 7 19.4068 7.12933 20.0134 7.3806C20.62 7.63188 21.1712 8.00017 21.6355 8.46447C22.0998 8.92876 22.4681 9.47996 22.7194 10.0866C22.9706 10.6932 23.1 11.3434 23.1 12C23.1 12.6566 22.9706 13.3068 22.7194 13.9134C22.4681 14.52 22.0998 15.0712 21.6355 15.5355C21.1712 15.9998 20.62 16.3681 20.0134 16.6194C19.4068 16.8707 18.7566 17 18.1 17H15.1M9.09998 17H6.09998C5.44337 17 4.79319 16.8707 4.18656 16.6194C3.57993 16.3681 3.02873 15.9998 2.56444 15.5355C1.62676 14.5979 1.09998 13.3261 1.09998 12C1.09998 10.6739 1.62676 9.40215 2.56444 8.46447C3.50212 7.52678 4.77389 7 6.09998 7H9.09998"
                              stroke="#141414"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.09998 12H16.1"
                              stroke="#005AE2"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_124_800">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0.0999756)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="ml-3">My Links</div>
                    </div>
                  </div>
                </NavLink>
                <NavLink
                  to="/dashboard/qr-codes"
                  className={`w-[calc(100%)] my-2`}
                >
                  <div
                    className={
                      pathname === '/dashboard/qr-codes'
                        ? 'px-4 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                        : 'font-medium hover:bg-primary/10 px-4 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                    }
                  >
                    <div className="flex">
                      <div>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          className="text-2xl text-primary"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"
                            className="fill-dark"
                          ></path>
                          <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"></path>
                          <path
                            d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"
                            className="fill-dark"
                          ></path>
                          <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"></path>
                          <path d="M12 9h2V8h-2v1Z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">QR Codes</div>
                    </div>
                  </div>
                </NavLink>
                <NavLink
                  to="/dashboard/analytics"
                  className="w-[calc(100%)] my-2"
                >
                  <div
                    className={
                      pathname === '/dashboard/analytics'
                        ? 'px-4 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                        : 'font-medium hover:bg-primary/10 px-4 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                    }
                  >
                    <span className="flex">
                      <div>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_159_363)">
                            <path
                              d="M21.1 12H17.1L14.1 21L8.09998 3L5.09998 12H1.09998"
                              stroke="#0065FE"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_159_363">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0.0999756)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="ml-3">Analytics</div>
                    </span>
                  </div>
                </NavLink>
              </div>
              <div className="h-[1px] w-full bg-gray-200 my-4"></div>
              <NavLink to="/dashboard/settings" className="w-[calc(100%)] my-2">
                <div
                  className={
                    pathname === '/dashboard/settings'
                      ? 'px-4 py-2 bg-primary/10 font-semibold border-l-4 border-primary transition duration-300'
                      : 'font-medium hover:bg-primary/10 px-4 py-2 border-l-4 hover:border-transparent border-white transition duration-300'
                  }
                >
                  <span className="flex items-center">
                    <div className="items-center flex justify-center">
                      <svg
                        width="24"
                        height="24"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="none"
                          d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 00-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 00.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                          className="fill-primary"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-3">Settings</div>
                  </span>
                </div>
              </NavLink>
              <div className="w-[calc(100%)] my-2">
                <div className="px-4 py-2 bg-primary/10 font-semibold">
                  <span className="flex">
                    <div className="bg-primary w-8 aspect-square flex items-center justify-center text-white font-bold my-auto rounded-full">
                      {authenticatedUser &&
                      authenticatedUser.profile_photo !== null
                        ?<img src={authenticatedUser.profile_photo} alt={initialState} /> 
                        : initialState}
                    </div>
                    <div className="ml-3 my-auto">{firstNameState}</div>
                  </span>
                </div>
              </div>
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

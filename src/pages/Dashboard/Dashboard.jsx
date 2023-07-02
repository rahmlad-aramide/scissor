import React, { useContext, useRef, useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { NavHashLink, HashLink } from 'react-router-hash-link';
import Layout from '../../components/Layout/Layout';
import { UserContext } from '../../contexts/UserContext/UserContext';
import dashboardImage from '../../assets/images/dashboard.jpg';
import { notify } from '../../App';

const Dashboard = () => {
  const pathname = window.location.pathname;
  console.log(pathname)
  const { user } = useContext(UserContext);
  console.log(user);
  const [userToken, setUserToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive] = useState(false);
  const navRef = useRef();
  const togglerRef = useRef();
  const showMenu = () => {
    setActive(!active);
    navRef.current.classList.toggle('-translate-x-[100%]');
  };

  React.useEffect(() => {
    getUserToken();
    getCurrentUser();
  }, []);

  React.useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const getUserToken = () => {
    setUserToken(user?.token);
  };
  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        'https://cutly.onrender.com/api/v1/users/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        if (userData === null) {
          notify('Unable to fetch your details, pls login and try again!');
        }
        setCurrentUser(userData);
      } else {
        console.log('Failed to fetch currently logged-in user');
      }
    } catch (error) {
      console.log('Failed to fetch currently logged-in user:', error);
    }
  };
  console.log(currentUser);
  return (
    <Layout>
      <div className="pt-0 flex flex-col justify-center items-center">
        {/* <div>Hello {currentUser?.name}</div> */}
        <div>
          <img src={dashboardImage} alt="" className="mx-auto" />
        </div>
        <div className="text-4xl text-center mb-4 md:mb-4 md:text-[40px] font-bold">
          Every link has a story behind it
        </div>
        <div>
          <div className="w-[90%] text-center font-medium max-w-[55ch] md:mx-auto pr-4 md:pr-0 ml-4 md:ml-auto md:text-center">
            Interested to tell? <Link to="/dashboard/new" className='text-primary'> Create your own </Link> or You&apos;ll love to see? <Link to="/dashboard/my-links" className='text-primary'>Check them out</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;

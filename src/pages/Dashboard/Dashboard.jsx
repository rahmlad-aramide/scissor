import { useContext, useRef, useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { NavHashLink, HashLink } from 'react-router-hash-link';
import Layout from '../../components/Layout/Layout';
import { UserContext } from '../../contexts/UserContext/UserContext';

const Dashboard = () => {
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
    <Layout>
      <div className="pt-16">
        <div>Welcome to your dashboard on Sciccor</div>
      </div>
    </Layout>
  );
};
export default Dashboard;

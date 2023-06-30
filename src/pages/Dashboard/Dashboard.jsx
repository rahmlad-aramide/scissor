import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { ToastContainer } from 'react-toastify';
const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <section>
      <ToastContainer />
      <div className="pt-16">
        <div>Welcome to Sciccor</div>
      </div>
    </section>
  );
};
export default Dashboard;

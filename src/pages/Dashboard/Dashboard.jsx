import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import dashboardImage from '../../assets/images/dashboard.jpg';
import { notify } from '../../App';
import { CircleLoader } from '../../components';
import { useAuth } from '../../contexts/UserContext/UserContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }
        setCurrentUser(userData);
      } else {
        console.log('Failed to fetch currently logged-in user');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Failed to fetch currently logged-in user:', error);
    }
  };

  React.useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      {loading ? (
        <div className="bg-gray-200 h-full md:h-[calc(100vh_-_60px)] overflow-y-auto">
          <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
            <CircleLoader color="#005AE2" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="mt-8 mb-4 font-semibold text-2xl text-center mx-8">
            Hello {currentUser !== null ? currentUser?.name : 'dear user'}, what
            would you like to do today?
          </div>
          <div>
            <img src={dashboardImage} alt="" className="mx-auto w-[80%]" />
          </div>
          <div className="text-4xl text-center mb-4 md:mb-4 md:text-[40px] font-bold">
            Every link has a story behind it
          </div>
          <div className="mb-8">
            <div className="w-[90%] text-center font-medium max-w-[70ch] md:mx-auto pr-4 md:pr-0 ml-4 md:ml-auto md:text-center">
              Interested in telling?{' '}
              <Link to="/dashboard/new" className="text-primary">
                {' '}
                Create one
              </Link>
              . Or you&apos;ll love to see?{' '}
              <Link to="/dashboard/my-links" className="text-primary">
                Check them out
              </Link>
              .
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Dashboard;

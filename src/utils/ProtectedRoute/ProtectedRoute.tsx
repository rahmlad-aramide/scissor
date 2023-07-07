import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext/UserContext';
import { useEffect, useState } from 'react';
import { CircleLoader } from '../../components';

const ProtectedRoute: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUser = localStorage.getItem('user');
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      setUser(parsedUser);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-200 h-full md:h-[calc(100vh_-_60px)] overflow-y-auto">
        <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
          <CircleLoader color="#005AE2" />
        </div>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

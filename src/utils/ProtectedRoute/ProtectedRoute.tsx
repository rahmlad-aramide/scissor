import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext/UserContext';
import { CircleLoader } from '../../components';

const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div>
          <CircleLoader color="#005AE2" />
        </div>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

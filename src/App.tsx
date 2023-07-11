import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import {
  Error,
  Home,
  Login,
  SignUp,
  GetInTouch,
  Dashboard,
  NewLink,
  Analytics,
  MyLinks,
  QRCodes,
  Settings,
} from './pages';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute';

const toastParams = {
  position: 'top-right' as const,
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'light' as const,
};

// eslint-disable-next-line react-refresh/only-export-components
// eslint-disable-next-line react-refresh/only-export-components
// eslint-disable-next-line react-refresh/only-export-components
export const notify = (val: string): string | number =>
  toast.success(`${val}`, toastParams);
export const warn = (val: string): string | number =>
  toast.error(`${val}`, toastParams);
export const inform = (val: string): string | number =>
  toast.info(`${val}`, toastParams);

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/get-quote" element={<GetInTouch />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/new" element={<NewLink />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/my-links" element={<MyLinks />} />
              <Route path="/dashboard/qr-codes" element={<QRCodes />} />
              <Route path="/dashboard/settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;

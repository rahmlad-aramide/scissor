/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from 'react';
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
} from './pages';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts';
import { UserContext } from './contexts/UserContext/UserContext';

const toastParams = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const notify = (val) => toast.success(`${val}`, toastParams);
export const warn = (val) => toast.error(`${val}`, toastParams);
export const inform = (val) => toast.info(`${val}`, toastParams);


const user = localStorage.getItem('user');
const AuthenticatedRoute = ({ Component, ...rest }) => {
  if (!user) {
    window.location.href = '/login';
    return;
  }

  return <Component {...rest} />;
};

function App() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(JSON.parse(user));
  }, []);
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/get-quote" element={<GetInTouch />} />
            <Route
              path="/dashboard"
              element={<AuthenticatedRoute Component={Dashboard} />}
            />
            <Route path="/new" element={<NewLink />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;

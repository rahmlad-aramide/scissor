/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import { Error, Home, Login, SignUp, GetInTouch } from './pages';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts';

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

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/get-quote" element={<GetInTouch />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;

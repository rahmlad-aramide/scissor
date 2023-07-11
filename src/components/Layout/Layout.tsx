import { ReactNode } from 'react';
import SideNav from '../SideNav/SideNav';
import { ToastContainer } from 'react-toastify';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section>
      <ToastContainer />
      <div className="grid grid-cols-11">
        <div className="col-span-11 md:col-span-2 md:pt-[60px] md:h-screen">
          <SideNav />
        </div>
        <div className="col-span-11 md:col-span-9 pt-[50px] md:pt-[60px] h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
};
export default Layout;

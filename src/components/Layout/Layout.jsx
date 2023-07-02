import SideNav from "../SideNav/SideNav";
import { ToastContainer } from 'react-toastify';

const Layout = ({children}) => {
    return (
        <section>
            <ToastContainer />
            <div className="grid grid-cols-11">
                <div className="col-span-11 md:col-span-2 pt-[60px]">
                    <SideNav />
                </div>
                <div className="col-span-11 md:col-span-9 h-screen overflow-y-auto pt-16">
                    {children}
                </div>
            </div>
        </section>
    )
}
export default Layout;
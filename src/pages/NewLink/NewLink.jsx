import { TrimForm } from '../../components';
import { ToastContainer } from 'react-toastify';

export const NewLink = () => {
  return (
    <section>
      <ToastContainer />
      <div className="h-screen flex flex-col w-full justify-center items-center">
        <div>
          <div className="text-[40px] text-neutral-900 font-bold mb-6">
            Trim a new link
          </div>
        </div>
        <div className="w-full">
          <TrimForm />
        </div>
      </div>
    </section>
  );
};
export default NewLink;

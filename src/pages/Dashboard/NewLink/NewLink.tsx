import { TrimForm } from '../../../components';
import Layout from '../../../components/Layout/Layout';

const NewLink: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full justify-center items-center">
        <div>
          <div className="text-[40px] text-neutral-900 font-bold mt-4 mb-6">
            Trim a new link
          </div>
        </div>
        <div className="w-full">
          <TrimForm />
        </div>
      </div>
    </Layout>
  );
};

export default NewLink;

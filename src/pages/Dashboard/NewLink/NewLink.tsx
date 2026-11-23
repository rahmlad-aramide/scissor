import { TrimForm } from '../../../components';

const NewLink: React.FC = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div>
          <div className="text-2xl sm:text-4xl text-neutral-900 font-bold mb-6 text-center">
            Trim a new link
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-2xl">
          <TrimForm />
        </div>
      </div>
    </>
  );
};

export default NewLink;

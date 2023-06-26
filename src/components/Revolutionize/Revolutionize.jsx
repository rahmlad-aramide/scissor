import { Link } from 'react-router-dom';
import { Button } from '../../components';
const Revolutionize = () => {
  return (
    <section className="bg-revolutionize-texture flex justify-center min-h-[18.6875rem]">
      <div className="flex flex-col justify-center items-center">
        <div className="text-[40px] font-bold text-white mb-8">
          Revolutionizing Link Optimization
        </div>
        <Button>
          <Link to="/sign-up">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};
export default Revolutionize;

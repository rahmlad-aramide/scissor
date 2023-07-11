import Layout from '../../../components/Layout/Layout';
import analyticsImage from '../../../assets/images/analytics.jpg';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

const Analytics: React.FC = () => {
  return (
    <Layout>
      <div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <img src={analyticsImage} alt="" className="w-[80%] mx-auto" />
          </div>
          <div className="text-2xl md:text-4xl max-w-[28ch] text-center mx-4 mb-4 md:mb-4 md:text-[40px] font-bold">
            Track and Analyze Your Shortened Links with Our Advanced Analytics.
          </div>
          <div className="mb-8">
            <div className="w-[90%] text-center font-medium max-w-[70ch] md:mx-auto pr-4 md:pr-0 ml-4 md:ml-auto md:text-center">
              To do that, you'll need to upgrade your plan. You can
              <Link to="/dashboard" className="text-primary">
                {' '}
                go back to your Dashboard
              </Link>
              . Or if you'd love to see our pricing plans,{' '}
              <NavHashLink smooth to="/#pricing" className="text-primary">
                click here to view our Pricing
              </NavHashLink>
              .
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;

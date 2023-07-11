import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout/Layout';
import settingsImage from '../../../assets/images/settings.jpg';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <img src={settingsImage} alt="" className="w-[80%] mx-auto" />
          </div>
          <div className="text-2xl md:text-4xl max-w-[28ch] text-center mx-4 mb-4 md:mb-4 md:text-[40px] font-bold">
            Fine-tune Your Profile: Customize Settings and Optimize Your
            Experience.
          </div>
          <div className="mb-8">
            <div className="w-[90%] text-center font-medium max-w-[70ch] md:mx-auto pr-4 md:pr-0 ml-4 md:ml-auto md:text-center">
              Our engineering team is working hard to bring this feature to
              life. While we do, you can
              <Link to="/dashboard" className="text-primary">
                {' '}
                go back to your Dashboard
              </Link>{' '}
              or access other available features.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

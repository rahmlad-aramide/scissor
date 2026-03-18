import React from 'react';
import Layout from '../../../components/Layout/Layout';

const Integrations: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Integrations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Meta Ads</h3>
            <p className="text-gray-500 text-sm mb-6">Connect your Meta Pixel for conversion tracking.</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold w-full">Connect</button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Google Analytics</h3>
            <p className="text-gray-500 text-sm mb-6">Sync your clicks with Google Analytics 4.</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold w-full">Connect</button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">UTM Builder</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Campaign Source</label>
                <Input py="8px" placeholder="google, newsletter" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Campaign Medium</label>
                <Input py="8px" placeholder="cpc, email" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Campaign Name</label>
                <Input py="8px" placeholder="summer_sale" />
              </div>
              <Button size="sm">Generate UTM Link</Button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600 font-bold text-2xl">Z</div>
            <h3 className="text-xl font-bold mb-2">Zapier</h3>
            <p className="text-gray-500 text-sm mb-6">Automate your link-shortening workflows.</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold w-full">Connect</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;

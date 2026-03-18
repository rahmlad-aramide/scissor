import React from 'react';
import Layout from '../../../components/Layout/Layout';

const DeveloperPortal: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Developer Portal</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-8">
            Access our API to integrate link-shortening capabilities into your
            own application.
          </p>
          <div className="space-y-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-bold mb-4">Your API Key</h2>
              <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                <input
                  className="flex-1 px-4 py-2 text-sm font-mono text-gray-500 bg-transparent"
                  value="sk_test_51MzS2pL3s9z..."
                  readOnly
                />
                <button className="bg-primary text-white px-6 py-2 text-sm font-bold">Copy</button>
              </div>
              <p className="mt-2 text-xs text-red-500 font-medium italic">* Keep this key secure. Do not share it publicly.</p>
            </div>
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-primary">Rate Limits</h2>
              <p className="text-sm text-gray-600 mb-4">Check your current usage and limits.</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/4"></div>
                </div>
                <div className="text-sm font-bold text-gray-700 whitespace-pre">250 / 1,000 requests</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeveloperPortal;

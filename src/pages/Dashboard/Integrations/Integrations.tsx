import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Layout from '../../../components/Layout/Layout';
import { Button, Input } from '../../../components';
import { notify, warn } from '../../../App';

const Integrations: React.FC = () => {
  const [destinationUrl, setDestinationUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [utmUrl, setUtmUrl] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = new URL(destinationUrl);
      if (source) url.searchParams.set('utm_source', source);
      if (medium) url.searchParams.set('utm_medium', medium);
      if (campaign) url.searchParams.set('utm_campaign', campaign);
      setUtmUrl(url.toString());
    } catch {
      warn('Enter a valid destination URL first (including https://)');
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Integrations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-bold uppercase">
              Coming soon
            </span>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Meta Ads</h3>
            <p className="text-gray-500 text-sm mb-6">Connect your Meta Pixel for conversion tracking.</p>
            <button disabled className="bg-gray-200 text-gray-400 px-6 py-2 rounded-lg font-semibold w-full cursor-not-allowed">
              Connect
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-bold uppercase">
              Coming soon
            </span>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Google Analytics</h3>
            <p className="text-gray-500 text-sm mb-6">Sync your clicks with Google Analytics 4.</p>
            <button disabled className="bg-gray-200 text-gray-400 px-6 py-2 rounded-lg font-semibold w-full cursor-not-allowed">
              Connect
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">UTM Builder</h3>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Destination URL</label>
                <Input
                  py="8px"
                  placeholder="https://example.com/page"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Campaign Source</label>
                <Input py="8px" placeholder="google, newsletter" value={source} onChange={(e) => setSource(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Campaign Medium</label>
                <Input py="8px" placeholder="cpc, email" value={medium} onChange={(e) => setMedium(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Campaign Name</label>
                <Input py="8px" placeholder="summer_sale" value={campaign} onChange={(e) => setCampaign(e.target.value)} />
              </div>
              <Button type="submit" buttonWidth="full">Generate UTM Link</Button>
            </form>
            {utmUrl && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs break-all mb-2">{utmUrl}</p>
                <button
                  onClick={() => {
                    copy(utmUrl);
                    notify('Copied UTM link to clipboard!');
                  }}
                  className="text-primary text-xs font-semibold"
                >
                  Copy link
                </button>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-bold uppercase">
              Coming soon
            </span>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600 font-bold text-2xl">Z</div>
            <h3 className="text-xl font-bold mb-2">Zapier</h3>
            <p className="text-gray-500 text-sm mb-6">Automate your link-shortening workflows.</p>
            <button disabled className="bg-gray-200 text-gray-400 px-6 py-2 rounded-lg font-semibold w-full cursor-not-allowed">
              Connect
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;

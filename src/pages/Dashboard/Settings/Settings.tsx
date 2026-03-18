import React from 'react';
import Layout from '../../../components/Layout/Layout';
import { Button, Input } from '../../../components';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Profile Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                <Input py="12px" defaultValue="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                <Input py="12px" defaultValue="john@example.com" />
              </div>
            </div>
            <div className="mt-6">
              <Button buttonWidth="fit">Save Profile</Button>
            </div>
          </div>

          {/* White Labeling Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">White Labeling & Branding</h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">Pro Feature</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              Customize the look and feel of your links and dashboard to match your brand.
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Custom Domain</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input py="12px" placeholder="links.yourbrand.com" />
                  </div>
                  <Button buttonWidth="fit">Connect Domain</Button>
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">Point your CNAME record to Scissor servers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Brand Logo</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500">Upload SVG, PNG or JPG (max 2MB)</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Primary Brand Color</label>
                  <div className="flex items-center gap-4">
                    <input type="color" className="w-12 h-12 rounded cursor-pointer" defaultValue="#005AE2" />
                    <Input py="12px" defaultValue="#005AE2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button buttonWidth="fit">Update Branding</Button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Security</h2>
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-lg">
              <div>
                <p className="font-semibold text-orange-800 text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-orange-700">Add an extra layer of security to your account.</p>
              </div>
              <Button buttonWidth="fit">Enable 2FA</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

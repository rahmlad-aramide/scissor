import React from 'react';
import Layout from '../../../components/Layout/Layout';

const Workspaces: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Workspaces & Projects</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-8">
            Organize your links into workspaces and projects to keep everything
            structured.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-50 transition">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 text-2xl font-bold">
                +
              </div>
              <p className="font-semibold text-primary">New Workspace</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                  Default
                </div>
                <div className="text-gray-400">•••</div>
              </div>
              <h3 className="font-bold text-lg mb-1">My General Links</h3>
              <p className="text-sm text-gray-500 mb-4">All unassigned links go here.</p>
              <div className="text-xs font-medium text-gray-400">12 Links</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Workspaces;

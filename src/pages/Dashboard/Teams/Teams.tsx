import React from 'react';
import Layout from '../../../components/Layout/Layout';

const Teams: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Team Collaboration</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-8">
            Manage your team members and their roles. Collaborate on links and
            campaigns seamlessly.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Team Members</p>
                <p className="text-sm text-gray-500">Add or remove members</p>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                Invite Member
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">You</td>
                    <td className="px-4 py-3 text-gray-500">owner@example.com</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Admin</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;

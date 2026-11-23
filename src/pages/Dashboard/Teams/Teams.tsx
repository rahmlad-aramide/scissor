import React, { useEffect, useState } from 'react';
import { CircleLoader, Input } from '../../../components';
import { api, ApiError } from '../../../utils/api/apiClient';
import { notify, warn } from '../../../App';

interface Workspace {
  id: string;
  name: string;
  isDefault: boolean;
}

interface Member {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  invitedAt: string;
}

const Teams: React.FC = () => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  const loadMembers = (workspaceId: string) => {
    api
      .get<{ members: Member[] }>(`/workspaces/${workspaceId}/members`)
      .then((data) => setMembers(data.members))
      .catch((error) => notify(error instanceof ApiError ? error.message : 'Failed to load team members'));
  };

  useEffect(() => {
    api
      .get<{ workspaces: Workspace[] }>('/workspaces')
      .then((data) => {
        const def = data.workspaces.find((w) => w.isDefault) ?? data.workspaces[0];
        setWorkspace(def ?? null);
        if (def) loadMembers(def.id);
      })
      .catch((error) => notify(error instanceof ApiError ? error.message : 'Failed to load workspace'))
      .finally(() => setLoading(false));
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace || !inviteEmail.trim()) return;
    setInviting(true);
    try {
      await api.post(`/workspaces/${workspace.id}/invites`, { email: inviteEmail.trim() });
      notify('Invite sent');
      setInviteEmail('');
      loadMembers(workspace.id);
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to send invite');
    } finally {
      setInviting(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Team Collaboration</h1>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-8">
            Manage your team members and their roles. Collaborate on links and campaigns seamlessly.
          </p>
          {loading ? (
            <div className="flex h-40 justify-center items-center">
              <CircleLoader color="#005AE2" />
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleInvite} className="flex flex-col sm:flex-row sm:items-end p-4 bg-gray-50 rounded-lg gap-4">
                <div className="flex-1">
                  <p className="font-semibold mb-2">Invite a member</p>
                  <Input
                    py="8px"
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={inviting}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60 whitespace-nowrap"
                >
                  Invite Member
                </button>
              </form>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Role</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                          No team members yet.
                        </td>
                      </tr>
                    ) : (
                      members.map((m) => (
                        <tr key={m.id} className="border-b">
                          <td className="px-4 py-3">{m.name ?? '—'}</td>
                          <td className="px-4 py-3 text-gray-500">{m.email}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{m.role}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                m.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Teams;

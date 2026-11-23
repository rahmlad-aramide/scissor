import React, { useEffect, useState } from 'react';
import { CircleLoader, Input } from '../../../components';
import { api, ApiError } from '../../../utils/api/apiClient';
import { notify, warn } from '../../../App';

interface Workspace {
  id: string;
  name: string;
  isDefault: boolean;
  linkCount: number;
}

const Workspaces: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  const load = () => {
    setLoading(true);
    api
      .get<{ workspaces: Workspace[] }>('/workspaces')
      .then((data) => setWorkspaces(data.workspaces))
      .catch((error) => notify(error instanceof ApiError ? error.message : 'Failed to load workspaces'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      await api.post('/workspaces', { name: newName.trim() });
      setNewName('');
      setCreating(false);
      load();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to create workspace');
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Workspaces & Projects</h1>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-8">
            Organize your links into workspaces and projects to keep everything structured.
          </p>
          {loading ? (
            <div className="flex h-40 justify-center items-center">
              <CircleLoader color="#005AE2" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 min-[1200px]:grid-cols-3 gap-6">
              {creating ? (
                <form
                  onSubmit={handleCreate}
                  className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4"
                >
                  <Input
                    py="8px"
                    placeholder="Workspace name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreating(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  onClick={() => setCreating(true)}
                  className="border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 text-2xl font-bold">
                    +
                  </div>
                  <p className="font-semibold text-primary">New Workspace</p>
                </div>
              )}
              {workspaces.map((w) => (
                <div key={w.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    {w.isDefault && (
                      <div className="bg-blue-600 text-white p-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                        Default
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{w.name}</h3>
                  <div className="text-xs font-medium text-gray-400">{w.linkCount} Links</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Workspaces;

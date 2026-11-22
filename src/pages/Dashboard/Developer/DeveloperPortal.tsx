import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import { Input, CircleLoader } from '../../../components';
import { api, ApiError } from '../../../utils/api/apiClient';
import { notify, warn } from '../../../App';
import copy from 'clipboard-copy';

interface ApiKeyRow {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
}

interface Usage {
  id: string;
  name: string;
  used: number;
  limit: number;
  windowSeconds: number;
}

const DeveloperPortal: React.FC = () => {
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [usage, setUsage] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [newRawKey, setNewRawKey] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get<{ apiKeys: ApiKeyRow[] }>('/developer/api-keys'),
      api.get<{ usage: Usage[] }>('/developer/usage'),
    ])
      .then(([keysData, usageData]) => {
        setKeys(keysData.apiKeys);
        setUsage(usageData.usage);
      })
      .catch((error) => notify(error instanceof ApiError ? error.message : 'Failed to load API keys'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    try {
      const data = await api.post<{ apiKey: { key: string } }>('/developer/api-keys', {
        name: newKeyName.trim(),
      });
      setNewRawKey(data.apiKey.key);
      setNewKeyName('');
      load();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to create API key');
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await api.delete(`/developer/api-keys/${id}`);
      notify('API key revoked');
      load();
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to revoke key');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
          <CircleLoader color="#005AE2" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Developer Portal</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-8">
            Create API keys to integrate link-shortening into your own application via{' '}
            <code className="bg-gray-100 px-1 rounded">POST /v1/links</code>.
          </p>

          {newRawKey && (
            <div className="p-4 mb-6 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-800 mb-2">
                Your new API key (shown only once — copy it now):
              </p>
              <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                <input
                  className="flex-1 px-4 py-2 text-sm font-mono text-gray-700 bg-transparent"
                  value={newRawKey}
                  readOnly
                />
                <button
                  onClick={() => {
                    copy(newRawKey);
                    notify('Copied to clipboard');
                  }}
                  className="bg-primary text-white px-6 py-2 text-sm font-bold"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleCreate} className="flex gap-4 mb-8">
            <Input
              py="8px"
              placeholder="Key name (e.g. production server)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              required
            />
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
              Create key
            </button>
          </form>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold mb-4">Your API Keys</h2>
              {keys.length === 0 ? (
                <p className="text-gray-400 text-sm">No API keys yet.</p>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Key</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {keys.map((k) => (
                        <tr key={k.id} className="border-b">
                          <td className="px-4 py-3">{k.name}</td>
                          <td className="px-4 py-3 font-mono text-gray-500">{k.keyPrefix}…</td>
                          <td className="px-4 py-3">
                            {k.revokedAt ? (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Revoked</span>
                            ) : (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {!k.revokedAt && (
                              <button onClick={() => handleRevoke(k.id)} className="text-red-500 text-xs font-semibold">
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {usage.length > 0 && (
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                <h2 className="text-lg font-bold mb-4 text-primary">Rate Limits</h2>
                <div className="space-y-4">
                  {usage.map((u) => (
                    <div key={u.id}>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${Math.min(100, (u.used / u.limit) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-bold text-gray-700 whitespace-pre">
                          {u.used} / {u.limit} requests
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {u.name} &middot; resets every {Math.round(u.windowSeconds / 60)} min
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeveloperPortal;

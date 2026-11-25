import React, { useEffect, useState } from 'react';
import { Input, CircleLoader } from '../../../components';
import { api, API_URL, ApiError } from '../../../utils/api/apiClient';
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

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
  <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-100">
    <code>{children}</code>
  </pre>
);

const Endpoint: React.FC<{ method: string; path: string; children: React.ReactNode }> = ({
  method,
  path,
  children,
}) => (
  <div className="space-y-3">
    <h3 className="flex flex-wrap items-center gap-2 text-base font-bold">
      <span
        className={`rounded px-2 py-0.5 text-xs font-bold text-white ${
          method === 'POST' ? 'bg-green-600' : 'bg-primary'
        }`}
      >
        {method}
      </span>
      <code className="font-mono text-sm">{path}</code>
    </h3>
    {children}
  </div>
);

const ApiDocs: React.FC = () => (
  <div className="mt-6 space-y-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
    <div>
      <h2 className="mb-2 text-lg font-bold">API reference</h2>
      <p className="text-sm text-gray-600">
        Base URL: <code className="rounded bg-gray-100 px-1">{API_URL}/v1</code>. All requests and
        responses are JSON.
      </p>
    </div>

    <div className="space-y-3">
      <h3 className="text-base font-bold">Authentication</h3>
      <p className="text-sm text-gray-600">
        Send your API key as a Bearer token on every request. Keys are shown only once, when created.
      </p>
      <CodeBlock>{`Authorization: Bearer <your-api-key>
Content-Type: application/json`}</CodeBlock>
    </div>

    <Endpoint method="POST" path="/v1/links">
      <p className="text-sm text-gray-600">Create a short link.</p>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-semibold">Field</th>
              <th className="px-4 py-2 font-semibold">Type</th>
              <th className="px-4 py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-mono">longUrl</td>
              <td className="px-4 py-2">string, required</td>
              <td className="px-4 py-2">Full destination URL including http(s)://</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">alias</td>
              <td className="px-4 py-2">string, optional</td>
              <td className="px-4 py-2">Custom code: 3&ndash;32 letters, numbers, - or _</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm font-semibold">Example request</p>
      <CodeBlock>{`curl -X POST ${API_URL}/v1/links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"longUrl": "https://example.com/some/long/path", "alias": "my-promo"}'`}</CodeBlock>
      <p className="text-sm font-semibold">Response &mdash; 201 Created</p>
      <CodeBlock>{`{
  "code": "my-promo",
  "shortUrl": "https://s.example.com/my-promo",
  "longUrl": "https://example.com/some/long/path"
}`}</CodeBlock>
    </Endpoint>

    <Endpoint method="GET" path="/v1/links">
      <p className="text-sm text-gray-600">
        List your 100 most recent links, newest first.
      </p>
      <p className="text-sm font-semibold">Example request</p>
      <CodeBlock>{`curl ${API_URL}/v1/links \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</CodeBlock>
      <p className="text-sm font-semibold">Response &mdash; 200 OK</p>
      <CodeBlock>{`{
  "links": [
    {
      "code": "my-promo",
      "shortUrl": "https://s.example.com/my-promo",
      "longUrl": "https://example.com/some/long/path",
      "createdAt": "2026-11-25T10:15:00.000Z"
    }
  ]
}`}</CodeBlock>
    </Endpoint>

    <div className="space-y-3">
      <h3 className="text-base font-bold">Errors</h3>
      <p className="text-sm text-gray-600">
        Errors return a JSON body with an <code className="rounded bg-gray-100 px-1">error</code> message.
        Validation errors also include <code className="rounded bg-gray-100 px-1">details</code>.
      </p>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="px-4 py-2 font-mono">400</td><td className="px-4 py-2">Invalid body, invalid alias, or unsafe/invalid URL</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">401</td><td className="px-4 py-2">Missing, invalid, or revoked API key</td></tr>
            <tr className="border-b"><td className="px-4 py-2 font-mono">409</td><td className="px-4 py-2">Alias already taken</td></tr>
            <tr><td className="px-4 py-2 font-mono">429</td><td className="px-4 py-2">Rate limit exceeded (1000 requests per 15 minutes per key)</td></tr>
          </tbody>
        </table>
      </div>
      <CodeBlock>{`// 409 Conflict
{ "error": "That alias is already taken" }

// 400 Bad Request
{ "error": "Invalid request", "details": { "fieldErrors": { "longUrl": ["Invalid url"] } } }`}</CodeBlock>
    </div>
  </div>
);

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
      <>
        <div className="flex h-[50vh] bg-white rounded-xl justify-center items-center">
          <CircleLoader color="#005AE2" />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Developer Portal</h1>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
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
                  className="min-w-0 flex-1 px-4 py-2 text-sm font-mono text-gray-700 bg-transparent"
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

          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
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
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[28rem] text-left text-sm">
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
        <ApiDocs />
      </div>
    </>
  );
};

export default DeveloperPortal;

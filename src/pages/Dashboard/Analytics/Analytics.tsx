import { useEffect, useState } from 'react';
import { CircleLoader, ClicksChart } from '../../../components';
import { api, ApiError } from '../../../utils/api/apiClient';
import { notify } from '../../../App';

interface Overview {
  totalClicks: number;
  humanClicks: number;
  botClicks: number;
  totalLinks: number;
  geoAvailable: boolean;
  byCountry: { country: string; clicks: number }[];
  byDay: { day: string; clicks: number }[];
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Overview>('/analytics/overview')
      .then(setData)
      .catch((error) => notify(error instanceof ApiError ? error.message : 'Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex h-[50vh] bg-white rounded-xl justify-center items-center">
          <CircleLoader color="#005AE2" />
        </div>
      </>
    );
  }

  const stats = data ?? {
    totalClicks: 0,
    humanClicks: 0,
    botClicks: 0,
    totalLinks: 0,
    geoAvailable: false,
    byCountry: [],
    byDay: [],
  };
  const botShare = stats.totalClicks > 0 ? Math.round((stats.botClicks / stats.totalClicks) * 100) : 0;

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Link Analytics</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Links</p>
            <p className="text-3xl font-bold text-primary">{stats.totalLinks}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalClicks}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Human Clicks</p>
            <p className="text-3xl font-bold text-gray-800">{stats.humanClicks}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Bot Clicks (Filtered)</p>
            <p className="text-3xl font-bold text-gray-800">{stats.botClicks}</p>
            <p className="text-xs text-gray-400 font-medium mt-2">{botShare}% of total traffic</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="min-w-0 md:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Clicks per day (last 30 days)</h2>
            {stats.byDay.length === 0 ? (
              <p className="text-gray-400 text-sm">No clicks recorded yet.</p>
            ) : (
              <ClicksChart rows={stats.byDay} days={30} />
            )}
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Clicks by country</h2>
            {!stats.geoAvailable ? (
              <p className="text-gray-400 text-sm italic">
                Country breakdown requires a GeoLite2 database to be configured on the server.
              </p>
            ) : stats.byCountry.length === 0 ? (
              <p className="text-gray-400 text-sm">No geo data yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.byCountry.map((row) => (
                  <div key={row.country} className="text-sm">
                    <div className="flex justify-between">
                      <span>{row.country}</span>
                      <span className="font-bold">{row.clicks}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-neutral-100">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(row.clicks / Math.max(...stats.byCountry.map((c) => c.clicks))) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 italic mt-6">
              Bot traffic is automatically filtered out of click counts using user-agent detection.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;

import Layout from '../../../components/Layout/Layout';

const Analytics: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Link Analytics</h1>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Clicks</p>
            <p className="text-3xl font-bold text-primary">12,482</p>
            <p className="text-xs text-green-500 font-bold mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Unique Visitors</p>
            <p className="text-3xl font-bold text-gray-800">8,931</p>
            <p className="text-xs text-green-500 font-bold mt-2">↑ 8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Conversions</p>
            <p className="text-3xl font-bold text-gray-800">432</p>
            <p className="text-xs text-red-500 font-bold mt-2">↓ 3% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Bot Clicks (Filtered)</p>
            <p className="text-3xl font-bold text-gray-800">1,204</p>
            <p className="text-xs text-gray-400 font-medium mt-2">Automatic protection active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Global Click Visualization (Heatmap placeholder) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Global Clicks</h2>
            <div className="aspect-video bg-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain"></div>
                {/* Simulated Heatmap points */}
                <div className="w-4 h-4 bg-primary rounded-full absolute top-1/4 left-1/4 animate-ping"></div>
                <div className="w-6 h-6 bg-primary/60 rounded-full absolute top-1/3 right-1/4"></div>
                <div className="w-3 h-3 bg-primary rounded-full absolute bottom-1/3 left-1/2"></div>
                <div className="w-8 h-8 bg-primary/40 rounded-full absolute top-1/2 left-1/3"></div>
                <p className="text-primary font-bold z-10">Click Visualization Map</p>
            </div>
            <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center"><span className="w-3 h-3 bg-primary rounded-full mr-2"></span> United States</span>
                    <span className="font-bold">4,231 clicks</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center"><span className="w-3 h-3 bg-primary/80 rounded-full mr-2"></span> United Kingdom</span>
                    <span className="font-bold">2,104 clicks</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center"><span className="w-3 h-3 bg-primary/60 rounded-full mr-2"></span> Nigeria</span>
                    <span className="font-bold">1,892 clicks</span>
                </div>
            </div>
          </div>

          {/* Bot Detection & Filtering */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Bot Detection</h2>
            <div className="space-y-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs text-green-700 font-bold uppercase mb-1">Status</p>
                    <p className="text-green-800 font-medium">Real-time filtering active</p>
                </div>
                <div>
                    <p className="text-sm font-semibold mb-2">Detected Bot Types</p>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>Search Indexers</span>
                            <span className="font-bold">45%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[45%]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-3">
                            <span>Known Data Scrapers</span>
                            <span className="font-bold">32%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[32%]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-3">
                            <span>Malicious Bots</span>
                            <span className="font-bold">23%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-400 h-full w-[23%]"></div>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 italic">
                    We automatically filter out non-human traffic to ensure your analytics are accurate.
                </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;

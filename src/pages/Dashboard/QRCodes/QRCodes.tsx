import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircleLoader } from '../../../components';
import QRCode from './QRCode';
import { notify } from '../../../App';
import { api, ApiError } from '../../../utils/api/apiClient';

interface LinkData {
  id: string;
  shortUrl: string;
  longUrl: string;
}

const QRCodes: React.FC = () => {
  const [allLinks, setAllLinks] = useState<LinkData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getAllLinks = async () => {
    setLoading(true);
    try {
      const data = await api.get<{ links: LinkData[] }>('/links');
      setAllLinks(data.links);
    } catch (error) {
      notify(error instanceof ApiError ? error.message : 'Unable to get your links, please try again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  return (
    <>
      <div>
        <div>
          {loading ? (
            <div className="flex h-[50vh] bg-white rounded-xl justify-center items-center">
              <CircleLoader color="#005AE2" />
            </div>
          ) : (
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-6">
                {allLinks === null || allLinks.length === 0
                  ? 'No QR Code(s) found'
                  : 'These are your links QR Codes'}
              </div>
              <div className="flex flex-col w-full gap-4">
                {allLinks === null || allLinks.length === 0 ? (
                  <div className="bg-white flex justify-center rounded-xl py-8 px-4 w-full mx-auto">
                    <div className="max-w-lg text-center">
                      <h1 className="mb-8 text-6xl sm:text-8xl font-extrabold text-primary">
                        Oops!
                      </h1>
                      <p className="mb-8 px-4 text-lg font-medium">
                        You don&apos;t have any links to generate a QR Code yet!{' '}
                        <br /> Would you like to generate one by trimming a
                        link?
                      </p>
                      <Link to="/dashboard/new">
                        <Button>Trim new URL</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {allLinks?.map((link) => (
                      <QRCode key={link.id} shortUrl={link.shortUrl} longUrl={link.longUrl} />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QRCodes;

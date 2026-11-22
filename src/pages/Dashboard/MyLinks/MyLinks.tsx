import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircleLoader } from '../../../components';
import Layout from '../../../components/Layout/Layout';
import MyLink from './MyLink';
import { notify } from '../../../App';
import { api, ApiError } from '../../../utils/api/apiClient';

interface LinkData {
  id: string;
  code: string;
  shortUrl: string;
  longUrl: string;
  hasPassword: boolean;
  clickCount?: number;
}

const MyLinks: React.FC = () => {
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

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/links/${id}`);
      notify('Link deleted');
      setAllLinks((prev) => prev?.filter((link) => link.id !== id) ?? null);
    } catch (error) {
      notify(error instanceof ApiError ? error.message : 'Failed to delete link');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-200 h-full md:h-[calc(100vh_-_60px)] overflow-y-auto">
        {loading ? (
          <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
            <CircleLoader color="#005AE2" />
          </div>
        ) : (
          <div className="pt-4">
            <div className="text-[40px] mx-4 md:text-4xl text-center mb-4 md:mb-4 md:text-[40px] font-bold">
              {allLinks === null || allLinks.length === 0
                ? 'No Link(s) found'
                : 'These are your created links'}
            </div>
            <div className="flex flex-col w-full">
              {allLinks === null || allLinks.length === 0 ? (
                <div className="bg-white flex justify-center rounded-xl py-8 px-4 w-[90%] mx-auto">
                  <div className="max-w-lg text-center">
                    <h1 className="mb-8 text-8xl md:text-9xl font-extrabold text-primary">
                      Oops!
                    </h1>
                    <p className="mb-8 px-4 text-lg font-medium">
                      You haven't trimmed any link yet! <br /> Would you like
                      to trim one now?
                    </p>
                    <Link to="/dashboard/new">
                      <Button>Trim new URL</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {allLinks?.map((link) => (
                    <MyLink
                      key={link.id}
                      shortUrl={link.shortUrl}
                      longUrl={link.longUrl}
                      hasPassword={link.hasPassword}
                      clickCount={link.clickCount}
                      onDelete={() => handleDelete(link.id)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyLinks;

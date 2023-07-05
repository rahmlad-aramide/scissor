import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircleLoader } from '../../../components';
import Layout from '../../../components/Layout/Layout';
import QRCode from './QRCode';
import { notify } from '../../../App';
import { useAuth } from '../../../contexts/UserContext/UserContext';

const QRCodes = () => {
  const [allLinks, setAllLinks] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getAllLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://cutly.onrender.com/api/v1/url/list-all',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const linksData = await response.json();
        if (linksData === null) {
          notify('Unable to get your links, pls login and try again!');
          setLoading(false);
        }
        const myLinks = linksData.filter(
          (link) => link.user === user?.username
        );
        setAllLinks(myLinks);
      } else {
        console.log('Failed to fetch your links');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Failed to fetch currently logged-in user:', error);
    }
  };
  useEffect(() => {
    getAllLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(allLinks);

  // const myLinks = data.filter((link) => link.user === "abdrahmanoladimeji02@gmail.com");
  // useEffect(()=>{
  //   setAllLinks(myLinks);
  //   console.log(myLinks)
  // }, [])
  // console.log(allLinks);

  return (
    <Layout>
      <div className="bg-gray-200 h-full md:h-[calc(100vh_-_60px)] overflow-y-auto">
        <div>
          {loading ? (
            <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
              <CircleLoader color="#005AE2" />
            </div>
          ) : (
            <div className="pt-4">
              <div className="text-[40px] mx-4 md:text-4xl text-center mb-4 md:mb-4 md:text-[40px] font-bold">
                {allLinks === null || allLinks.length === 0
                  ? 'No QR Codes(s) found'
                  : 'These are your links QR Codes'}
              </div>
              <div className="flex flex-col w-full">
                {allLinks === null || allLinks.length === 0 ? (
                  <div className="bg-white flex justify-center rounded-xl py-8 px-4 w-[90%] mx-auto">
                    <div className="max-w-lg text-center">
                      <h1 className="mb-8 text-8xl md:text-9xl font-extrabold text-primary">
                        Oops!
                      </h1>
                      <p className="mb-8 px-4 text-lg font-medium">
                        You don&apos;t have any link to generate a QRCode yet!{' '}
                        <br /> Would you like to generate one by trimming a
                        link?
                      </p>
                      <Link to="/dashboard/new">
                        <Button>Trim new url</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {allLinks?.map((link, index) => (
                      <QRCode
                        key={index}
                        customUrl={link.custom_url}
                        shortUrl={link.short_url}
                        longUrl={link.long_url}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default QRCodes;

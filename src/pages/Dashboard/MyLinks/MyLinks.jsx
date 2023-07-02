import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import Layout from '../../../components/Layout/Layout';
import { UserContext } from '../../../contexts/UserContext/UserContext';
import MyLink from './MyLink';

// const data = [
//   {
//       "user": "timothyedibo@gmail.com",
//       "short_url": "string",
//       "long_url": "string",
//       "id": 1,
//       "custom_url": "string",
//       "qrcode": null
//   },
//   {
//       "user": "timothyedibo@gmail.com",
//       "short_url": "6ubIk5",
//       "long_url": "https://docs.google.com/document/d/1ohWaVxI465LxrxaER8lIbYy4-0DD38MgAJ_WXq8f5AM/edit",
//       "id": 2,
//       "custom_url": "string",
//       "qrcode": null
//   },
//   {
//       "user": "timothyedibo@gmail.com",
//       "short_url": "http://127.0.0.1:8080czqtYC",
//       "long_url": "https://docs.google.com/document/d/1ohWaVxI465LxrxaER8lIbYy4-0DD38MgAJ_WXq8fl5AM/edit",
//       "id": 3,
//       "custom_url": "string",
//       "qrcode": null
//   },
//   {
//       "user": "timothyedibo@gmail.com",
//       "short_url": "bluecounts.comHZV2dQ",
//       "long_url": "https://docs.google.com/document/d/1ohWaVxI465LxrxaER8lIbYy4d-0DD38MglAJ_WXq8fl5AM/edit",
//       "id": 5,
//       "custom_url": "string",
//       "qrcode": null
//   },
//   {
//       "user": "timothyedibo@gmail.com",
//       "short_url": "scissors-v0r0.onrender.com/rVbgGH",
//       "long_url": "https://docs.google.com/document/d/1ohWaVxI465LxrxaER8lIbYy4-0DD38MgAJ_WXq8f5AM/editc",
//       "id": 6,
//       "custom_url": "string",
//       "qrcode": null
//   },
//   {
//       "user": "timothyedibo@gmail.com",
//       "short_url": "EId5kC",
//       "long_url": "https://docs.google.com/document/d/1xdR_lwj0UwQ-7cNu51AOVkZJcPen0E0Cp3YS6n8BJ9w/edit",
//       "id": 7,
//       "custom_url": "project",
//       "qrcode": null
//   },
//   {
//       "user": "abdrahmanoladimeji02@gmail.com",
//       "short_url": "a7B5mU",
//       "long_url": "https://docs.google.com/me/rahmlad",
//       "id": 8,
//       "custom_url": "docme",
//       "qrcode": null
//   },
//   {
//       "user": "abdrahmanoladimeji02@gmail.com",
//       "short_url": "Ah7NxU",
//       "long_url": "docs.google.com",
//       "id": 9,
//       "custom_url": "googledoc",
//       "qrcode": null
//   },
//   {
//       "user": "abdrahmanoladimeji02@gmail.com",
//       "short_url": "QCQnJH",
//       "long_url": "reactjs.org",
//       "id": 10,
//       "custom_url": "ggle",
//       "qrcode": null
//   },
//   {
//       "user": "abdrahmanoladimeji02@gmail.com",
//       "short_url": "AHlVBO",
//       "long_url": "https://docs.google.com/men/rahmlad",
//       "id": 11,
//       "custom_url": "test",
//       "qrcode": null
//   }
// ]

const MyLinks = () => {
  const [allLinks, setAllLinks] = useState(null);
  const { user } = useContext(UserContext);

  const getAllLinks = async () => {
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
        }
        const myLinks = linksData.filter(
          (link) => link.user === user?.username
        );
        setAllLinks(myLinks);
      } else {
        console.log('Failed to fetch your links');
      }
    } catch (error) {
      console.log('Failed to fetch currently logged-in user:', error);
    }
  };
  useEffect(() => {
    getAllLinks();
  }, []);
  console.log(allLinks);

  // const myLinks = data.filter((link) => link.user === "abdrahmanoladimeji02@gmail.com");
  // useEffect(()=>{
  //   setAllLinks(myLinks);
  //   console.log(myLinks)
  // }, [])
  // console.log(allLinks);
  return (
    <Layout>
      <div className="bg-gray-200 h-full md:h-[calc(100vh_-_60px)] overflow-y-auto">
        <div className="pt-4">
          <div className="text-[40px] md:text-4xl text-center mb-4 md:mb-4 md:text-[40px] font-bold">
            {allLinks === null
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
                    You haven&apos;t trimmed any link yet! <br /> Would you like
                    to trim one now?
                  </p>
                  <Link to="/dashboard/new">
                    <Button>Trim new url</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {allLinks?.map((link) => (
                  <MyLink
                    customUrl={link.custom_url}
                    shortUrl={link.short_url}
                    longUrl={link.long_url}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default MyLinks;

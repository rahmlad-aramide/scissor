import copy from 'clipboard-copy';
import { notify } from '../../../App';

interface MyLinkProps {
  customUrl: string;
  shortUrl: string;
  longUrl: string;
}

const MyLink: React.FC<MyLinkProps> = ({
  customUrl,
  shortUrl,
  longUrl,
}) => {
  const handleCopy = (textToCopy: string) => {
    copy(textToCopy);
    notify('Copied URL to clipboard!');
  };

  const handleEdit = () => {
    notify('This is a work in progress...');
  };

  return (
    <div className="bg-white rounded-lg p-4 mx-auto my-4 w-[90%] flex flex-col md:flex-row justify-between">
      <div className="break-words">
        <div>
          <div>
            Custom link:{' '}
            <a
              className="text-primary"
              href={`https://cutly.onrender.com/${customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://cutly.onrender.com/{customUrl}
            </a>
          </div>
          <div>
            Short link:{' '}
            <a
              className="text-primary"
              href={`https://cutly.onrender.com/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://cutly.onrender.com/{shortUrl}
            </a>
          </div>
        </div>
        <div className="flex break-words">
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              role="graphics-document"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>redirect</title>
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path>
            </svg>
          </div>
          <div className="flex overflow-x-auto">
            <a href={longUrl} target="_blank" rel="noopener noreferrer">
              {longUrl}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex justify-evenly">
        <div
          onClick={() => handleCopy(`https://cutly.onrender.com/${shortUrl}`)}
          className="flex px-2 py-1 cursor-pointer rounded-lg hover:scale-90 active:scale-100 transition duration-300 border-2 border-gray-300 bg-gray-100 h-fit"
        >
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              role="graphics-document"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>copy</title>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>
          </div>
          <div className="mx-2">Copy</div>
        </div>
        <div
          onClick={handleEdit}
          className="ml-0 md:ml-4 flex px-2 py-1 cursor-pointer rounded-lg hover:scale-90 active:scale-100 transition duration-300 border-2 border-gray-300 bg-gray-100 h-fit"
        >
          <div className="flex">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              role="graphics-document"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Edit</title>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
          </div>
          <div className="mx-2">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default MyLink;

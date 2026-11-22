import copy from 'clipboard-copy';
import { notify } from '../../../App';

interface MyLinkProps {
  shortUrl: string;
  longUrl: string;
  hasPassword?: boolean;
  clickCount?: number;
  onDelete?: () => void;
}

const MyLink: React.FC<MyLinkProps> = ({ shortUrl, longUrl, hasPassword, clickCount, onDelete }) => {
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
            Short link:{' '}
            <a
              className="text-primary"
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
            {hasPassword && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">
                Password protected
              </span>
            )}
          </div>
        </div>
        <div className="flex break-words items-center">
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
          {clickCount !== undefined && (
            <div className="ml-4 text-xs text-gray-500 whitespace-nowrap">{clickCount} clicks</div>
          )}
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex justify-evenly">
        <div
          onClick={() => handleCopy(shortUrl)}
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
        <div
          onClick={onDelete}
          className="ml-0 md:ml-4 flex px-2 py-1 cursor-pointer rounded-lg hover:scale-90 active:scale-100 transition duration-300 border-2 border-red-200 bg-red-50 text-red-600 h-fit"
        >
          <div className="flex">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
          </div>
          <div className="mx-2">Delete</div>
        </div>
      </div>
    </div>
  );
};

export default MyLink;

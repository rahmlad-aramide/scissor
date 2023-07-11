import copy from 'clipboard-copy';
import { notify } from '../../../App';

interface QRCodeProps {
  customUrl?: string;
  shortUrl?: string;
  longUrl?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  customUrl = 'bit.ly/me',
  shortUrl = 'shorty',
  longUrl = 'longy',
}) => {
  const handleCopy = (textToCopy: string) => {
    copy(textToCopy);
    notify('Copied QR Code image link!');
  };

  return (
    <div className="bg-white rounded-lg p-4 mx-auto my-4 w-[90%] flex flex-col md:flex-row justify-between">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-3 p-4 border-2 border-gray-200 rounded-lg shadow">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=cutly.onrender.com/${customUrl}&amp;size=100x100`}
            alt={`cutly.onrender.com/${customUrl}`}
            className="mx-auto"
          />
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="p-4">
            <div className="">
              Custom link:{' '}
              <a
                className="text-primary text-lg md:text-xl font-semibold break-words"
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
                className="text-primary break-words"
                href={`https://cutly.onrender.com/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://cutly.onrender.com/{shortUrl}
              </a>
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
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex justify-evenly">
        <div
          onClick={() =>
            handleCopy(
              `https://api.qrserver.com/v1/create-qr-code/?data=cutly.onrender.com/${customUrl}&amp;size=100x100`
            )
          }
          className="flex px-2 py-1 cursor-pointer rounded-lg hover:scale-90 active:scale-100 transition duration-300 border-2 border-gray-300 bg-gray-100 h-fit"
        >
          <div className="flex items-center">
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
              <title>Icon</title>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"></path>
            </svg>
          </div>
          <div className="mx-2">Link</div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;

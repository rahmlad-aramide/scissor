import { useEffect, useState } from 'react';
import QRCodeLib from 'qrcode';
import copy from 'clipboard-copy';
import { notify } from '../../../App';

interface QRCodeProps {
  shortUrl: string;
  longUrl: string;
}

const QRCode: React.FC<QRCodeProps> = ({ shortUrl, longUrl }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCodeLib.toDataURL(shortUrl, { width: 160, margin: 1 })
      .then(setDataUrl)
      .catch(() => setDataUrl(null));
  }, [shortUrl]);

  const handleCopy = (textToCopy: string) => {
    copy(textToCopy);
    notify('Copied to clipboard!');
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${shortUrl.replace(/^https?:\/\//, '').replace(/[^a-z0-9]/gi, '-')}.png`;
    a.click();
  };

  return (
    <div className="bg-white rounded-lg p-4 mx-auto my-4 w-[90%] flex flex-col md:flex-row justify-between">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-3 p-4 border-2 border-gray-200 rounded-lg shadow flex items-center justify-center">
          {dataUrl ? (
            <img src={dataUrl} alt={shortUrl} className="mx-auto" />
          ) : (
            <div className="w-[160px] h-[160px] bg-gray-100 animate-pulse rounded" />
          )}
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="p-4">
            <div>
              Short link:{' '}
              <a
                className="text-primary text-lg md:text-xl font-semibold break-words"
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
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
          onClick={() => handleCopy(shortUrl)}
          className="flex px-2 py-1 cursor-pointer rounded-lg hover:scale-90 active:scale-100 transition duration-300 border-2 border-gray-300 bg-gray-100 h-fit"
        >
          <div className="mx-2">Copy link</div>
        </div>
        <div
          onClick={handleDownload}
          className="ml-0 md:ml-4 flex px-2 py-1 cursor-pointer rounded-lg hover:scale-90 active:scale-100 transition duration-300 border-2 border-gray-300 bg-gray-100 h-fit"
        >
          <div className="mx-2">Download QR</div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;

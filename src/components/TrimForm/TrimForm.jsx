import { useContext, useEffect, useState } from 'react';
import { Button, Input, Loader, LoginModal } from '../../components';
import { UserContext } from '../../contexts/UserContext/UserContext';
import copy from 'clipboard-copy';
import { notify, warn } from '../../App';

const defaultFormFields = {
  long_url: '',
  custom_url: '',
};

const TrimForm = () => {
  // const pathname = window.location.pathname;
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [copyMe, setCopyMe] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { long_url, custom_url } = formFields;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleOpenModal = () => {
    if (!user) setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleCopy = () => {
    copy(textToCopy);
    notify('Copied trimmed url to clipboard!');
    setTimeout(()=>{
      setCopyMe(false);
    }, 2500)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        'https://cutly.onrender.com/api/v1/url/shorten',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,

          },
          body: JSON.stringify({ long_url, custom_url }),
        }
      );
      console.log(response);
      if (response.ok) {
        notify('Success, your link has been trimmed!');
        const data = await response.json();
        console.log(data);
        setLoading(false);
        setCopyMe(true);
        setShortUrl(data.short_url);
        setTextToCopy(`cutly.onrender.com/${data.short_url}`);
      } else if (response.status === 403) {
        warn('Long URL has already been trimmed');
        setLoading(false);
        return;
      } else {
        warn('Failed to trim the link, pls try again');
        setLoading(false);
        return;
      }
      resetFormFields();
      setLoading(false);
    } catch (err) {
      console.error('An error occured:', err);
      warn('An error occured:', err);
      setLoading(false);
    }
  };

  return (
    <section
      id="analytics"
      className="bg-trim-texture min-h-[32.6875rem] flex justify-center"
    >
      <LoginModal isOpen={modalOpen} onClose={handleCloseModal} />
      <div className="flex">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl w-[90%] max-w-[476px] mx-auto my-auto">
          <div className="mb-4">
            <Input onChange={handleChange} name="long_url" py="18px" placeholder="Paste long Url here..." value={long_url} required />
          </div>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <select
              required
              className="col-span-12 md:col-span-7 border border-[#3284FF] outline-none text-[#3284ff] bg-transparent placeholder:text-[#3284ff]/70 rounded-lg px-6 text-xs font-medium w-full h-[55.5px] md:h-auto"
            >
              <option className="disabled" disabled>Choose Domain</option>
              <option className="" value="cutly" selected>
                cutly.onrender.com
              </option>
            </select>
            <div className="col-span-12 md:col-span-5">
              <Input onChange={handleChange} name="custom_url" py="18px" placeholder="Type Alias here..." value={custom_url} required />
            </div>
          </div>
          {copyMe && (
            <div className="font-medium text-lg">
              Trimmed url: cutly.onrender.com/{shortUrl}
            </div>
          )}
          {!copyMe ? (
            <Button
              disabled={loading}
              onClick={user===null && handleOpenModal}
              type={user ? `submit` : `button`}
              buttonWidth="full"
            >
              <div className="flex justify-center items-center">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <span className="text-sm pt-0.5">Trim URL</span>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition duration-300 -pt-0.5"
                    >
                      <path
                        d="M9.45887 8.31619C9.43991 8.5416 9.11191 8.59859 9.00642 8.39481L8.43834 7.29767C8.4016 7.22658 8.32675 7.17907 8.24209 7.17292L6.93485 7.07809C6.692 7.06049 6.63061 6.75601 6.85016 6.65807L8.03196 6.13074C8.10849 6.09658 8.15977 6.02715 8.16632 5.94854L8.26849 4.73494C8.28745 4.50953 8.61545 4.45254 8.72095 4.65632L9.28902 5.75346C9.32576 5.82455 9.40052 5.87207 9.48527 5.87821L10.7925 5.97303C11.0354 5.99064 11.0967 6.29511 10.8772 6.39306L9.6954 6.92039C9.61878 6.95457 9.56759 7.02397 9.56104 7.10259L9.45887 8.31619Z"
                        className="fill-white group-hover:fill-primary"
                      />
                      <path
                        d="M5.70593 9.1442C5.67428 9.25336 5.50743 9.25336 5.47578 9.1442L5.30531 8.55649C5.29429 8.51841 5.26221 8.48867 5.22122 8.47842L4.58815 8.32018C4.47054 8.29079 4.47054 8.13591 4.58815 8.10652L5.22122 7.94828C5.26221 7.93802 5.29429 7.90828 5.30531 7.87021L5.47578 7.28249C5.50743 7.17333 5.67428 7.17333 5.70593 7.28249L5.8764 7.87021C5.88741 7.90828 5.91945 7.93802 5.96049 7.94828L6.59356 8.10652C6.71116 8.13591 6.71116 8.29079 6.59356 8.32018L5.96049 8.47842C5.91945 8.48867 5.88741 8.51841 5.8764 8.55649L5.70593 9.1442Z"
                        className="fill-white group-hover:fill-primary"
                      />
                      <path
                        d="M7.88782 12.5199C7.85616 12.6291 7.68931 12.6291 7.65766 12.5199L7.48719 11.9322C7.47618 11.8941 7.4441 11.8644 7.4031 11.8541L6.77003 11.6959C6.65243 11.6665 6.65243 11.5116 6.77003 11.4822L7.4031 11.324C7.4441 11.3138 7.47618 11.284 7.48719 11.2459L7.65766 10.6582C7.68931 10.5491 7.85616 10.5491 7.88782 10.6582L8.05829 11.2459C8.0693 11.284 8.10133 11.3138 8.14238 11.324L8.77544 11.4822C8.89305 11.5116 8.89305 11.6665 8.77544 11.6959L8.14238 11.8541C8.10133 11.8644 8.0693 11.8941 8.05829 11.9322L7.88782 12.5199Z"
                        className="fill-white group-hover:fill-primary"
                      />
                      <path
                        d="M6.03121 11.1969C6.01011 11.2697 5.89887 11.2697 5.87777 11.1969L5.76412 10.8051C5.75678 10.7797 5.7354 10.7599 5.70806 10.753L5.28602 10.6475C5.20762 10.6279 5.20762 10.5247 5.28602 10.5051L5.70806 10.3996C5.7354 10.3928 5.75678 10.3729 5.76412 10.3476L5.87777 9.95574C5.89887 9.88297 6.01011 9.88297 6.03121 9.95574L6.14486 10.3476C6.1522 10.3729 6.17355 10.3928 6.20092 10.3996L6.62296 10.5051C6.70136 10.5247 6.70136 10.6279 6.62296 10.6475L6.20092 10.753C6.17355 10.7599 6.1522 10.7797 6.14486 10.8051L6.03121 11.1969Z"
                        className="fill-white group-hover:fill-primary"
                      />
                      <path
                        d="M11.1222 9.84654C11.101 9.91932 10.9898 9.91932 10.9687 9.84654L10.8551 9.45473C10.8477 9.42935 10.8263 9.40952 10.799 9.40268L10.377 9.29719C10.2986 9.2776 10.2986 9.17434 10.377 9.15475L10.799 9.04926C10.8263 9.04242 10.8477 9.0226 10.8551 8.99721L10.9687 8.6054C10.9898 8.53263 11.101 8.53263 11.1222 8.6054L11.2358 8.99721C11.2431 9.0226 11.2645 9.04242 11.2919 9.04926L11.7139 9.15475C11.7923 9.17434 11.7923 9.2776 11.7139 9.29719L11.2919 9.40268C11.2645 9.40952 11.2431 9.42935 11.2358 9.45473L11.1222 9.84654Z"
                        className="fill-white group-hover:fill-primary"
                      />
                      <path
                        d="M18.3182 18.0032L17.5909 18.6783M8.15777 9.0424L19.9624 19.0878C20.2555 19.3372 20.2654 19.7631 19.9843 20.024V20.024C19.7043 20.284 19.2496 20.2779 18.9805 20.0081C14.9047 15.9232 7.72842 8.70759 8.15777 9.0424Z"
                        className="stroke-white group-hover:stroke-primary"
                      />
                    </svg>
                  </>
                )}
              </div>
            </Button>
          ) : (
            <Button onClick={handleCopy} type={`button`} buttonWidth="full">
              <div className="flex justify-center items-center">
                <span className="text-sm pt-0.5 mr-2">Copy Url</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
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
            </Button>
          )}
          <div className="text-[#4991FF] text-sm pt-6">
            By clicking TrimURL, I agree to the{' '}
            <span className="font-medium text-[#3284FF]">
              {' '}
              Terms of Service, Privacy Policy
            </span>{' '}
            and Use of Cookies.
          </div>
        </form>
      </div>
    </section>
  );
};
export default TrimForm;

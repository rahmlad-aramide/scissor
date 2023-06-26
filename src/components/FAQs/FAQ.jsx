import { useState } from 'react';
import plus from '../../assets/icons/plus.svg';
import minus from '../../assets/icons/minus.svg';
const FAQ = ({ que, ans }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section id="faqs" className="">
      <div className="flex flex-col w-[90%] max-w-[792px] mx-auto mt-4 border-b border-[#d6d6d6]">
        <div
          onClick={handleOpen}
          className="flex justify-between items-center cursor-pointer"
        >
          <div className="font-medium text-xl pr-6 mb-4">{que}</div>
          <div className="flex w-full max-w-[24px] mb-4">
            <img
              src={isOpen ? minus : plus}
              alt={isOpen ? '-' : '+'}
              className="w-6"
            />
          </div>
        </div>
        {isOpen && <div className="font-medium pb-4">{ans}</div>}
      </div>
    </section>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;

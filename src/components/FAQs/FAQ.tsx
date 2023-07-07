import React from 'react';
import Plus from './../Plus/Plus';
import Minus from './../Minus/Minus';

interface FAQProps {
  que: string;
  ans: string;
}

const FAQ: React.FC<FAQProps> = ({ que, ans }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
            {isOpen ? <Minus /> : <Plus />}
          </div>
        </div>
        {isOpen && <div className="font-medium pb-4">{ans}</div>}
      </div>
    </section>
  );
};

export default FAQ;

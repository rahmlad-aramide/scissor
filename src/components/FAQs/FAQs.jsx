import FAQ from './FAQ';
import line from '../../assets/images/vertical-line.svg';
import { faqsData } from '../../utils/faqsData/faqsData';

const FAQs = () => {
  return (
    <section id="faqs" className="mb-[9.6875rem]">
      <div className="flex flex-col">
        <div className="flex mx-auto mt-[2.6875rem] mb-[4rem]">
          <img src={line} alt="Line" className="mt-2" />
          <span className="text-[2.5rem] font-bold ml-2">FAQs</span>
        </div>
        <div>
          <div>
            {faqsData.map((d, index) => (
              <FAQ que={d.que} ans={d.ans} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FAQs;

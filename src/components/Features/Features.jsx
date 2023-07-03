import featureData from '../../utils/featureData/featureData';
const Features = () => {
  return (
    <section id="features">
      <div className="bg-[#F9FBFD]">
        <div className="flex flex-col md:flex-row justify-between w-[90%] mx-auto pt-14 pb-16">
          <div className="font-bold text-[40px] leading-[48px] mb-8 md:mb-0">
            One Stop. <br /> Four{' '}
            <span className="text-primary">Possibilities</span>.
          </div>
          <div className="grid grid-cols-2 gap-4 md:flex w-full md:w-[60%]">
            {featureData.map((data, index) => (
              <div
                key={index}
                className="text-dark first:ml-0 ml-0 md:ml-[72px]"
              >
                <div className="text-[32px] font-semibold">{data.figure}</div>
                <div className="font-medium max-w-[14ch]">{data.item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
